import ftplib
import os

host = os.environ.get('FTP_HOST')
user = os.environ.get('FTP_USER')
password = os.environ.get('FTP_PASS')

def download_recursive(ftp, current_local_dir):
    try:
        os.makedirs(current_local_dir, exist_ok=True)
        lines = []
        ftp.dir("", lines.append) # List current directory securely
        
        for line in lines:
            parts = line.split()
            if len(parts) < 9:
                continue
            name = " ".join(parts[8:])
            if name in ('.', '..'):
                continue
            
            is_dir = line.startswith('d')
            
            if is_dir:
                print(f"Entering directory {name}")
                try:
                    ftp.cwd(name)
                    download_recursive(ftp, os.path.join(current_local_dir, name))
                    ftp.cwd('..')
                except Exception as e:
                    print(f"Failed to enter directory {name}: {e}")
            else:
                if name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg')):
                    local_file_path = os.path.join(current_local_dir, name)
                    print(f"Downloading {name} to {local_file_path}...")
                    try:
                        with open(local_file_path, "wb") as f:
                            ftp.retrbinary(f"RETR {name}", f.write)
                    except Exception as e:
                        print(f"Error downloading {name}: {e}")
    except Exception as e:
        print(f"Error reading directory contents: {e}")

def run_download():
    try:
        print("Connecting to FTP...")
        ftp = ftplib.FTP(host)
        ftp.login(user, password)
        print("Logged in successfully.")
        
        # We must physically move to /images first
        ftp.cwd("/images")
        print("Moved to /images. Starting perfect relative recursive download...")
        
        # Start recursion
        download_recursive(ftp, "frontend/out/images")
        
        ftp.quit()
        print("Download complete.")
    except Exception as e:
        print(f"Fatal error: {e}")

run_download()
