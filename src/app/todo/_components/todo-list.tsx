"use client";

import { Clock, PlusCircle, Trash2 } from "lucide-react";
import { use } from "react";

import { TodoInput } from "@/app/todo/_components/todo-input";
import { cn } from "@/lib/utils";
import { Todo } from "@/backend/todo/todo.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import { addTodo, completeTodo, removeTodo } from "@/backend/todo/todo.action";

interface TodoListProps {
    todosPromise: Promise<Todo[]>;
    userId: string;
}

export function TodoList({ todosPromise, userId }: TodoListProps) {
    const todos = use(todosPromise);

    const handleAdd = (text: string, userId: string) => {
        addTodo(text, userId);
    };

    const handleRemove = (id: string) => {
        removeTodo(id, userId);
    };

    const handleComplete = (id: string) => {
        completeTodo(id, userId);
    };

    return (
        <>
            <TodoInput onSubmit={handleAdd} userId={userId} />
            <ul className="space-y-3">
                {todos.map((todo) => (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        handleComplete={() => handleComplete(todo.id)}
                        handleRemove={() => handleRemove(todo.id)}
                    />
                ))}

                {todos.length > 0 && (
                    <div className="text-xs text-muted-foreground text-center pt-2">
                        {todos.filter((t) => t.completed).length} of{" "}
                        {todos.length} tasks completed
                    </div>
                )}

                {todos.length === 0 && (
                    <div className="text-center py-12">
                        <PlusCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                        <p className="mt-4 text-muted-foreground">
                            Add your first todo to get started
                        </p>
                    </div>
                )}
            </ul>
        </>
    );
}

interface TodoListItemProps {
    todo: Todo;
    handleComplete: () => void;
    handleRemove: () => void;
}

function TodoListItem({
    todo,
    handleComplete,
    handleRemove,
}: TodoListItemProps) {
    return (
        <li
            className={cn(
                "group relative flex items-center justify-between rounded-lg border p-4 transition-all duration-300",
                todo.completed
                    ? "bg-muted/50 border-muted"
                    : "bg-card border-border hover:border-primary/20 hover:shadow-sm",
                "[&:has(#delete:hover)]:border-destructive",
                "[&:has(#complete:hover)]:ring-2 [&:has(#complete:hover)]:ring-accent"
            )}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <Checkbox
                    checked={todo.completed}
                    className={cn(
                        "transition-all duration-300 hover:ring-2 hover:ring-accent",
                        todo.completed ? "opacity-70" : "opacity-100"
                    )}
                    onClick={handleComplete}
                    id="complete"
                />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p
                            className={cn(
                                "text-sm font-medium transition-all duration-300",
                                todo.completed &&
                                    "line-through text-muted-foreground"
                            )}
                        >
                            {todo.text}
                        </p>
                    </div>

                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <time
                            dateTime={new Date(todo.createdAt).toISOString()}
                            title={format(new Date(todo.createdAt), "PPpp")}
                        >
                            {formatDistanceToNow(new Date(todo.createdAt), {
                                addSuffix: true,
                            })}
                        </time>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    "transition-all duration-200 opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0",
                    todo.completed && "opacity-100 translate-x-0"
                )}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemove}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:dark:bg-destructive/10"
                    id="delete"
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </div>
        </li>
    );
}
