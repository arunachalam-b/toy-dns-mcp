# Greeting MCP Server

A simple Model Context Protocol (MCP) server built with Next.js that provides a greeting tool. This project serves as a clean foundation for building custom MCP servers.

## Features

- **Simple Greeting Tool**: Provides a `greet_user` tool that responds with friendly greetings
- **MCP Server Integration**: Built using the Vercel MCP adapter for seamless integration
- **No Authentication Required**: Simple setup without API keys or user management
- **TypeScript Support**: Fully typed with TypeScript for better development experience

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to see the server info page

4. **Configure your MCP Client:**
   Add this server to your MCP client configuration:

   ```json
   {
       "mcpServers": {
           "greeting-server": {
               "url": "http://localhost:3000/api/llm/mcp"
           }
       }
   }
   ```

5. **Test the greeting tool:**
   In your MCP client, you can now use the `greet_user` tool:
   - `greet_user()` - Get a general greeting
   - `greet_user(name: "Alice")` - Get a personalized greeting

## MCP Tool Reference

### greet_user

Greets the user with a friendly message.

**Parameters:**
- `name` (optional): The name of the user to greet

**Examples:**
- Without name: Returns "Hello! How are you doing today?"
- With name: Returns "Hello, [name]! Nice to meet you!"

## Project Structure

```
src/
├── app/
│   ├── api/llm/[transport]/route.ts  # MCP server endpoint
│   ├── layout.tsx                    # App layout
│   └── page.tsx                      # Info page
├── components/ui/                    # Basic UI components
└── lib/utils.ts                      # Utility functions
```

## Customization

This project is designed to be a clean starting point for your own MCP server. To customize:

1. **Modify the greeting tool** in `src/app/api/llm/[transport]/route.ts`
2. **Add new tools** by adding more `server.tool()` calls
3. **Add authentication** if needed using the `experimental_withMcpAuth` wrapper
4. **Update the UI** in `src/app/page.tsx` to reflect your server's purpose

## Learn More

- [Model Context Protocol (MCP)](https://modelcontext.org/)
- [Vercel MCP Adapter](https://github.com/vercel/mcp-adapter)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Next.js Documentation](https://nextjs.org/docs)
