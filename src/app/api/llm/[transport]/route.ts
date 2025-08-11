import { z } from "zod";
import { createMcpHandler } from "@vercel/mcp-adapter";

const handler = createMcpHandler(
    async (server) => {
        server.tool(
            "greet_user",
            "Greets the user with a friendly message",
            {
                name: z.string().optional().describe("The name of the user to greet (optional)"),
            },
            async ({ name }) => {
                const greeting = name 
                    ? `Hello, ${name}! Nice to meet you!` 
                    : "Hello! How are you doing today?";
                
                return {
                    content: [{ type: "text", text: greeting }],
                };
            }
        );
    },
    {},
    {
        basePath: "/api/llm",
    }
);

export { handler as GET, handler as POST, handler as DELETE };
