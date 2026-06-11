const ftp = require("basic-ftp")
const fs = require("fs")

async function run() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    
    try {
        console.log("Connecting to FTP...")
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            secure: false
        })
        
        console.log("Successfully connected! Starting recursive download of images folder...")
        fs.mkdirSync("out/images", { recursive: true })
        
        // Use basic-ftp's highly reliable native downloadToDir method
        await client.downloadToDir("out/images", "images")
        
        console.log("All images successfully downloaded!")
    }
    catch(err) {
        console.error("FATAL ERROR downloading images:", err)
    }
    client.close()
}

run()
