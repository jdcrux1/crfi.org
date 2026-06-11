import ftplib
import os
import sys

host = os.environ.get('FTP_HOST')
user = os.environ.get('FTP_USER')
password = os.environ.get('FTP_PASS')

def test_upload():
    try:
        ftp = ftplib.FTP(host)
        ftp.login(user, password)
        print("Logged in successfully.")
        print("Current directory:", ftp.pwd())
        
        # Try to upload to crfing.org/www
        content = b"FTP TEST UPLOAD SUCCESS"
        try:
            ftp.cwd("crfing.org/www")
            print("Changed directory to crfing.org/www")
        except Exception as e:
            print("Could not cwd to crfing.org/www:", e)
            try:
                ftp.cwd("public_html")
                print("Changed directory to public_html")
            except Exception as e2:
                print("Could not cwd to public_html:", e2)

        with open("local_test.txt", "wb") as f:
            f.write(content)

        with open("local_test.txt", "rb") as f:
            ftp.storbinary("STOR manual-ftp-test.txt", f)
            print("Uploaded manual-ftp-test.txt successfully.")
        
        ftp.quit()
    except Exception as e:
        print("FTP Error:", e)

test_upload()
