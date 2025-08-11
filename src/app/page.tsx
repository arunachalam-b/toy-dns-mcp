export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8">
            <div className="container max-w-2xl mx-auto px-4 py-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Greeting MCP Server</h1>
                <p className="text-muted-foreground mb-8">
                    A simple Model Context Protocol server that provides a greeting tool.
                </p>
                <div className="bg-card p-6 rounded-lg border border-border">
                    <h2 className="text-xl font-semibold mb-2">MCP Endpoint</h2>
                    <code className="text-sm bg-muted p-2 rounded">
                        http://localhost:3000/api/llm/mcp
                    </code>
                    <p className="text-sm text-muted-foreground mt-4">
                        Configure this endpoint in your MCP client to use the greeting tool.
                    </p>
                </div>
            </div>
        </main>
    );
}
