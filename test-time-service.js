const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function testTimeService(city) {
    try {
        console.log(`Testing time service for: ${city}`);
        
        // Sanitize city name
        const sanitizedCity = city.toLowerCase().replace(/\s+/g, '');
        
        // Use nslookup for Windows
        const command = `nslookup -type=txt ${sanitizedCity}.time dns.toys`;
        console.log(`Executing: ${command}`);
        
        const { stdout, stderr } = await execAsync(command);
        
        if (stderr) {
            console.log('Stderr:', stderr);
        }
        
        console.log('Raw output:');
        console.log(stdout);
        
        // Parse response
        const lines = stdout.split('\n').filter(line => line.trim());
        const txtRecords = [];
        
        for (const line of lines) {
            // Look for lines that are quoted TXT record content
            const quotedMatch = line.match(/^\s*"(.+)"\s*$/);
            if (quotedMatch) {
                txtRecords.push(quotedMatch[1]);
            }
        }
        
        console.log('Parsed TXT records:');
        console.log(txtRecords);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Test with Mumbai
testTimeService('mumbai').then(() => {
    console.log('\n--- Test completed ---');
}); 