"use server";

import { TodoRepository } from "@/backend/todo/todo.db";
import { revalidatePath } from "next/cache";

export const addTodo = async (text: string, userId: string) => {
    TodoRepository.addTodo(text, userId);
    revalidatePath(`/todo/${userId}`);
};

export const removeTodo = async (id: string, userId: string) => {
    TodoRepository.removeTodo(id, userId);
    revalidatePath(`/todo/${userId}`);
};

export const completeTodo = async (id: string, userId: string) => {
    TodoRepository.completeTodo(id, userId);
    revalidatePath(`/todo/${userId}`);
};
