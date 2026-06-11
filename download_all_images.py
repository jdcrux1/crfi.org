import ftplib
import os

host = os.environ.get('FTP_HOST')
user = os.environ.get('FTP_USER')
password = os.environ.get('FTP_PASS')

def download_recursive(ftp, remote_dir, local_dir):
    try:
        os.makedirs(local_dir, exist_ok=True)
        ftp.cwd(remote_dir)
        names = ftp.nlst()
        
        for name in names:
            if name in ('.', '..'):
                continue
            
            # Try to CWD to see if it's a directory
            is_dir = False
            try:
                ftp.cwd(name)
                is_dir = True
                ftp.cwd('..')
            except:
                is_dir = False
                
            if is_dir:
                print(f"Entering directory {name}")
                download_recursive(ftp, name, os.path.join(local_dir, name))
                ftp.cwd('..')
            else:
                if name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg')):
                    local_path = os.path.join(local_dir, name)
                    print(f"Downloading {local_path}...")
                    try:
                        with open(local_path, "wb") as f:
                            ftp.retrbinary(f"RETR {name}", f.write)
                    except Exception as e:
                        print(f"Error downloading {name}: {e}")
    except Exception as e:
        print(f"Error processing {remote_dir}: {e}")

try:
    print("Connecting to FTP...")
    ftp = ftplib.FTP(host)
    ftp.login(user, password)
    print("Logged in. Starting robust recursive download...")
    
    download_recursive(ftp, "/images", "frontend/out/images")
    
    ftp.quit()
    print("Download complete.")
except Exception as e:
    print(f"Fatal error: {e}")
