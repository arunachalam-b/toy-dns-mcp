import { z } from "zod";

import { TodoRepository } from "@/backend/todo/todo.db";

import {
    createMcpHandler,
    experimental_withMcpAuth,
} from "@vercel/mcp-adapter";
import { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { getUserByApiKey, User } from "@/app/auth/users.dal";

const handler = createMcpHandler(
    async (server) => {
        server.tool(
            "add_todo",
            "Adds a todo to the list",
            {
                text: z.string().min(3),
            },
            async ({ text }, { authInfo }) => {
                const user = (authInfo as MyAuthInfo).user;
                TodoRepository.addTodo(text, user.id);
                return {
                    content: [{ type: "text", text: `Todo added: ${text}` }],
                };
            }
        );

        server.tool(
            "remove_todo",
            "Removes a todo from the list",
            {
                id: z.string().describe("The ID of the todo to remove"),
            },
            async ({ id }, { authInfo }) => {
                const user = (authInfo as MyAuthInfo).user;
                TodoRepository.removeTodo(id, user.id);
                return {
                    content: [{ type: "text", text: `Todo removed: ${id}` }],
                };
            }
        );

        server.tool(
            "get_todos",
            "Gets the list of todos",
            {},
            async (_, { authInfo }) => {
                const user = (authInfo as MyAuthInfo).user;
                const todos = TodoRepository.getTodos(user.id);
                return {
                    content: [{ type: "text", text: JSON.stringify(todos) }],
                };
            }
        );
    },
    {},
    {
        basePath: "/api/llm",
    }
);

type MyAuthInfo = AuthInfo & {
    user: User;
};

const withMcpAuth = experimental_withMcpAuth(
    handler,
    (_, bearer) => {
        if (!bearer) {
            throw new Error("No API key provided.");
        }
        const user = getUserByApiKey(bearer);
        if (!user) {
            throw new Error("Invalid API key");
        }
        const authInfo: MyAuthInfo = {
            token: bearer,
            clientId: user.id,
            scopes: [],
            user,
        };
        return authInfo;
    },
    {
        required: true,
    }
);

export { withMcpAuth as GET, withMcpAuth as POST, withMcpAuth as DELETE };
