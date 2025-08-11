import { TodoList } from "@/app/todo/_components/todo-list";
import { getTodos } from "@/backend/todo/todo.dal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ userId: string }>;
}

export default async function UserTodoPage({ params }: PageProps) {
    const { userId } = await params;
    if (!userId) return notFound();
    const todos = getTodos(userId);

    const otherUsersId = userId === "1" ? "2" : "1";
    return (
        <main className="min-h-screen">
            <div className="container max-w-3xl mx-auto px-4 py-12">
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold">
                            Todos for User {userId}
                        </h1>
                        <p className="text-muted-foreground">
                            Only you can see and manage your todos
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <ThemeToggle />
                        <Button variant="outline" asChild>
                            <Link href={`/todo/${otherUsersId}`}>
                                Todos for User {otherUsersId}
                            </Link>
                        </Button>
                    </div>
                    <TodoList todosPromise={todos} userId={userId} />
                </div>
            </div>
        </main>
    );
}
