import ftplib
import os
import sys

host = os.environ.get('FTP_HOST')
user = os.environ.get('FTP_USER')
password = os.environ.get('FTP_PASS')

def download_images():
    try:
        ftp = ftplib.FTP(host)
        ftp.login(user, password)
        print("Logged in successfully.")
        
        try:
            ftp.cwd("crfing.org/www/images")
            print("Successfully entered crfing.org/www/images/")
        except Exception as e:
            print("Could not enter crfing.org/www/images/:", e)
            try:
                ftp.cwd("images")
                print("Successfully entered images/ from root")
            except Exception as e2:
                print("Could not enter images/ from root:", e2)
                ftp.quit()
                return

        files = ftp.nlst()
        print("Files found:", files)

        os.makedirs("frontend/public/images", exist_ok=True)

        for f in files:
            if f.endswith('.jpg') or f.endswith('.png') or f.endswith('.jpeg'):
                print(f"Downloading {f}...")
                with open(f"frontend/public/images/{f}", "wb") as local_file:
                    ftp.retrbinary(f"RETR {f}", local_file.write)
                print(f"Downloaded {f}")
        
        ftp.quit()
    except Exception as e:
        print("FTP Error:", e)

download_images()
