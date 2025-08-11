import "server-only";

import { TodoRepository } from "@/backend/todo/todo.db";

export const getTodos = async (userId: string) => {
    return TodoRepository.getTodos(userId).sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });
};
