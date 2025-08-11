import { getUsers } from "@/app/auth/users.dal";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
    const users = getUsers();
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8">
            <div className="container max-w-2xl mx-auto px-4 py-12">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-4xl font-bold">Select a User</h1>
                    <p className="text-muted-foreground">
                        Choose a user to view their todos
                    </p>
                </div>
                <ThemeToggle />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                    {users.map((user) => (
                        <Link
                            key={user.id}
                            href={`/todo/${user.id}`}
                            className="block p-6 rounded-lg shadow-md bg-card hover:bg-primary/10 transition border border-border text-center cursor-pointer"
                        >
                            <div className="text-xl font-semibold mb-2">
                                {user.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                User ID: {user.id}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
