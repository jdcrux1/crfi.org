import ftplib
import os

host = os.environ.get('FTP_HOST')
user = os.environ.get('FTP_USER')
password = os.environ.get('FTP_PASS')

def prepare():
    try:
        print("Connecting to FTP...")
        ftp = ftplib.FTP(host)
        ftp.login(user, password)
        print("Logged in successfully.")
        
        # 1. Delete sync state to force full upload
        try:
            ftp.delete("crfing.org/www/.ftp-deploy-sync-state.json")
            print("Deleted old sync state.")
        except Exception as e:
            print("Could not delete sync state (might not exist):", e)
            
        # 2. Download images from root
        try:
            ftp.cwd("/images")
            files = ftp.nlst()
            os.makedirs("frontend/out/images", exist_ok=True)
            for f in files:
                if f.endswith(('.jpg', '.png', '.jpeg', '.gif')):
                    print(f"Downloading {f}...")
                    with open(f"frontend/out/images/{f}", "wb") as local_file:
                        ftp.retrbinary(f"RETR {f}", local_file.write)
            print("Downloaded all images.")
        except Exception as e:
            print("Could not download images:", e)

        ftp.quit()
    except Exception as e:
        print("FTP Error:", e)

prepare()
