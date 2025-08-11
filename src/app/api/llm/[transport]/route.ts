import { z } from "zod";
import { createMcpHandler } from "@vercel/mcp-adapter";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const handler = createMcpHandler(
    async (server) => {
        server.tool(
            "get_city_time",
            "Get the current time for a specific city using dns.toys service",
            {
                city: z.string().describe("The name of the city to get the time for (e.g., 'mumbai', 'london', 'tokyo')"),
            },
            async ({ city }) => {
                try {
                    // Sanitize city name - remove spaces, convert to lowercase
                    const sanitizedCity = city.toLowerCase().replace(/\s+/g, '');
                    
                    // Execute DNS query against dns.toys
                    // Try different commands based on platform
                    let command: string;
                    const isWindows = process.platform === 'win32';
                    
                    if (isWindows) {
                        command = `nslookup -type=txt ${sanitizedCity}.time dns.toys`;
                    } else {
                        command = `dig ${sanitizedCity}.time @dns.toys +short`;
                    }
                    
                    const { stdout, stderr } = await execAsync(command);
                    
                    if (stderr) {
                        throw new Error(`Dig command error: ${stderr}`);
                    }
                    
                    if (!stdout.trim()) {
                        return {
                            content: [{ 
                                type: "text", 
                                text: `No time information found for "${city}". Please check if the city name is correct or try a major city name.` 
                            }],
                        };
                    }
                    
                    // Parse the response - dns.toys returns time in TXT records
                    const rawResponse = stdout.trim();
                    const timeInfo = parseTimeResponse(rawResponse, city, isWindows);
                    
                    return {
                        content: [{ type: "text", text: timeInfo }],
                    };
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
                    return {
                        content: [{ 
                            type: "text", 
                            text: `Error getting time for "${city}": ${errorMessage}` 
                        }],
                    };
                }
            }
        );
    },
    {},
    {
        basePath: "/api/llm",
    }
);

function parseTimeResponse(rawResponse: string, cityName: string, isWindows: boolean = false): string {
    try {
        // dns.toys returns time information in TXT records
        // The response format differs between dig and nslookup
        const lines = rawResponse.split('\n').filter(line => line.trim());
        
        if (lines.length === 0) {
            return `No time information available for ${cityName}`;
        }
        
        // Extract TXT records based on command type
        let txtRecords: string[] = [];
        
        if (isWindows) {
            // nslookup output format - look for quoted lines containing TXT record content
            for (const line of lines) {
                const quotedMatch = line.match(/^\s*"(.+)"\s*$/);
                if (quotedMatch) {
                    txtRecords.push(quotedMatch[1]);
                }
            }
        } else {
            // dig output format - each line is a TXT record
            txtRecords = lines.map(line => line.replace(/^"(.*)"$/, '$1'));
        }
        
        // If no TXT records found, show raw response
        if (txtRecords.length === 0) {
            return `🕐 Time information for ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}:\n\n${rawResponse}`;
        }
        
        // Parse the time information from TXT records
        let timezone = '';
        let currentTime = '';
        let additionalInfo = '';
        
        for (const record of txtRecords) {
            if (record.includes('timezone') || record.includes('tz')) {
                timezone = record;
            } else if (record.includes(':') && (record.includes('AM') || record.includes('PM') || /\d{2}:\d{2}/.test(record))) {
                currentTime = record;
            } else {
                additionalInfo += record + '\n';
            }
        }
        
        // Format the response nicely
        let result = `🕐 Time information for ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}:\n\n`;
        
        if (currentTime) {
            result += `Current Time: ${currentTime}\n`;
        }
        if (timezone) {
            result += `Timezone: ${timezone}\n`;
        }
        if (additionalInfo.trim()) {
            result += `Additional Info: ${additionalInfo.trim()}\n`;
        }
        
        // If we couldn't parse anything meaningful, show the TXT records
        if (!currentTime && !timezone && !additionalInfo.trim()) {
            result += txtRecords.join('\n');
        }
        
        return result.trim();
    } catch {
        // If parsing fails, return the raw response
        return `🕐 Time information for ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}:\n\n${rawResponse}`;
    }
}

export { handler as GET, handler as POST, handler as DELETE };
