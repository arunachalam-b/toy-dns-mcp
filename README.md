# Next Todo MCP

Showcasing Next.JS MCP Server support with a simple todo app. Works only locally to keep it simple (no real DB, no real auth provider).

## This project contains

1. **MCP Server Hosted In-App**

    - The Model Context Protocol (MCP) server is embedded directly in the app via [`route.ts`](src/app/api/llm/[transport]/route.ts).
    - Easily extend or experiment with MCP tools and endpoints.

2. **MCP Authentication via API-Key / Bearer Token**

    - Secure API endpoints using API-Key (Bearer token) authentication.
    - Example user management and key validation in `users.dal.ts`.

3. **Fake DB & User Management**

    - Fake database and user management for easy local development.
    - Swap in your favorite database and authentication provider.

4. **Bonus: Super Nice Theme Toggle**
    - Enjoy a beautiful, animated theme toggle (light/dark) using [`theme-toggle.tsx`](src/components/theme-toggle.tsx).
    - Respects user system preferences via [`prefers-reduced-motion.ts`](src/lib/prefers-reduced-motion.ts).

---

## Getting Started

1. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
2. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

4. **Configure the MCP Server:**
   Open your MCP Clients settings (e.g. Cursor) and add a new MCP Server like this:

    ```
    {
        "mcpServers": {
            "todo-mcp": {
                "url": "http://localhost:3000/api/llm/mcp",
                "headers": {
                    "Authorization": "Bearer apikey-1"
                }
            }
        }
    }
    ```

5. **Chat with your todo list**: Ask your MCP Client to add, list or remove tasks. To get your mind blown, add some random tasks and then ask to delete all of them. The MCP Client will still be able to do it even though there's no explicit endpoint to do so.

---

## Customization

-   Replace the fake DB and user logic in `todo.db.ts` and `users.dal.ts` with your own backend or authentication.
-   Extend MCP tools and authentication as needed for your use case.

---

## Learn More

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Next.js MCP Adapter](https://github.com/vercel/mcp-adapter)
-   [Model Context Protocol (MCP)](https://modelcontext.org/)
-   [MCP Typescript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

---
