import ftplib
import os
import sys

host = os.environ.get('FTP_HOST')
user = os.environ.get('FTP_USER')
password = os.environ.get('FTP_PASS')

def download_dir(ftp, remote_dir, local_dir):
    try:
        os.makedirs(local_dir, exist_ok=True)
        ftp.cwd(remote_dir)
        lines = []
        ftp.dir(lines.append)
        
        for line in lines:
            parts = line.split()
            name = " ".join(parts[8:])
            if name in ('.', '..'):
                continue
            
            # Check if directory
            if line.startswith('d'):
                print(f"Directory: {name}")
                download_dir(ftp, name, os.path.join(local_dir, name))
                ftp.cwd('..') # Go back up
            else:
                # Check if image
                if name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg')):
                    local_path = os.path.join(local_dir, name)
                    print(f"Downloading {local_path}...")
                    try:
                        with open(local_path, "wb") as f:
                            ftp.retrbinary(f"RETR {name}", f.write)
                    except Exception as e:
                        print(f"Error downloading {name}: {e}")
    except Exception as e:
        print(f"Error accessing {remote_dir}: {e}")

try:
    print("Connecting to FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Logged in. Starting recursive download...")
    
    # We want to download the /images folder from FTP to frontend/public/images
    download_dir(ftp, "/images", "frontend/public/images")
    
    ftp.quit()
    print("Download complete.")
except Exception as e:
    print(f"Fatal error: {e}")
