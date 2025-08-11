import { Todo } from "@/backend/todo/todo.type";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "todos");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getUserDbPath = (userId: string) => path.join(DATA_DIR, `${userId}.json`);

export const TodoRepository = {
    getTodos: (userId: string) => {
        const dbPath = getUserDbPath(userId);
        const todos = fs.existsSync(dbPath)
            ? JSON.parse(fs.readFileSync(dbPath, "utf-8"))
            : [];
        return (todos as Todo[]).sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
    },
    addTodo: (text: string, userId: string) => {
        const dbPath = getUserDbPath(userId);
        const todos = TodoRepository.getTodos(userId);
        todos.push({
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: new Date(),
            userId,
        });
        fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2));
    },
    removeTodo: (id: string, userId: string) => {
        const dbPath = getUserDbPath(userId);
        const todos = TodoRepository.getTodos(userId);
        const index = todos.findIndex((todo: Todo) => todo.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
        }
        fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2));
    },
    completeTodo: (id: string, userId: string) => {
        const dbPath = getUserDbPath(userId);
        const todos = TodoRepository.getTodos(userId);
        const todo = todos.find((todo: Todo) => todo.id === id);
        if (todo) {
            todo.completed = true;
        }
        fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2));
    },
};
