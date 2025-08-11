"use client";

import { Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface TodoInputProps {
    onSubmit: (text: string, userId: string) => void;
    userId: string;
}

export function TodoInput({ onSubmit, userId }: TodoInputProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const isFocused = formRef.current?.isFocused ?? false;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const text = formData.get("text") as string;
        formRef.current?.reset();
        onSubmit(text, userId);
    };

    return (
        <form className="relative" ref={formRef} onSubmit={handleSubmit}>
            <div className="relative group">
                {formRef.current?.isFocused && (
                    <div className="-z-10 absolute -inset-0.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-70 blur-sm transition-all duration-300 animate-in fade-in scale-in-95" />
                )}

                <div
                    className={cn(
                        "relative flex items-center rounded-lg overflow-hidden transition-all duration-300 shadow-md z-10 bg-background",
                        isFocused ? "shadow-lg" : "shadow-sm"
                    )}
                >
                    {isFocused && (
                        <div className="absolute left-3 text-purple-500 animate-in fade-in slide-in-from-left duration-300">
                            <Sparkles className="h-5 w-5" />
                        </div>
                    )}

                    <Label htmlFor="text" className="sr-only">
                        Todo text
                    </Label>
                    <Input
                        id="text"
                        name="text"
                        type="text"
                        placeholder="What needs to be done?"
                        className={cn(
                            "flex-1 border-none shadow-none focus-visible:ring-0 text-base py-6 transition-all duration-300 bg-background",
                            isFocused ? "pl-12" : "pl-4"
                        )}
                    />

                    <Button
                        type="submit"
                        size="icon"
                        className={cn(
                            "absolute right-1 rounded-md transition-all duration-300 bg-primary hover:bg-primary/90"
                        )}
                        aria-label="Add Todo"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex justify-end text-xs mt-2 px-2 text-muted-foreground">
                <span className="text-muted-foreground/70">
                    Press <kbd className="font-mono">Enter</kbd> to add Todo
                </span>
            </div>
        </form>
    );
}
