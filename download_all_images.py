import ftplib
import os

host = os.environ.get('FTP_HOST')
user = os.environ.get('FTP_USER')
password = os.environ.get('FTP_PASS')

def download_ftp(ftp, path, local_dir):
    try:
        os.makedirs(local_dir, exist_ok=True)
        lines = []
        ftp.dir(path, lines.append)
        for line in lines:
            parts = line.split()
            if len(parts) < 9:
                continue
            name = " ".join(parts[8:])
            if name in ('.', '..'):
                continue
            is_dir = line.startswith('d')
            full_path = f"{path}/{name}" if path else name
            
            if is_dir:
                print(f"Directory: {full_path}")
                download_ftp(ftp, full_path, os.path.join(local_dir, name))
            else:
                if name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg')):
                    local_file_path = os.path.join(local_dir, name)
                    print(f"Downloading {full_path} to {local_file_path}...")
                    try:
                        with open(local_file_path, "wb") as f:
                            ftp.retrbinary(f"RETR {full_path}", f.write)
                    except Exception as e:
                        print(f"Error downloading {full_path}: {e}")
    except Exception as e:
        print(f"Error reading {path}: {e}")

def run_download():
    try:
        print("Connecting to FTP...")
        ftp = ftplib.FTP(host)
        ftp.login(user, password)
        print("Logged in successfully. Starting robust recursive download...")
        
        # Download from /images to frontend/out/images
        download_ftp(ftp, "/images", "frontend/out/images")
        
        ftp.quit()
        print("Download complete.")
    except Exception as e:
        print(f"Fatal error: {e}")

run_download()
