import ftplib
import os
import json

host = os.environ.get('FTP_HOST')
user = os.environ.get('FTP_USER')
password = os.environ.get('FTP_PASS')

def scan_ftp(ftp, path, depth=0, max_depth=3):
    if depth > max_depth:
        return {"type": "directory", "truncated": True}
    
    result = {}
    try:
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
                result[name] = scan_ftp(ftp, full_path, depth + 1, max_depth)
            else:
                result[name] = {"type": "file", "size": parts[4]}
    except Exception as e:
        return {"error": str(e)}
    return result

def run_scan():
    try:
        ftp = ftplib.FTP(host)
        ftp.login(user, password)
        
        pwd = ftp.pwd()
        tree = {
            "pwd": pwd,
            "tree": scan_ftp(ftp, "", max_depth=2)
        }
        
        with open("ftp_scan_result.json", "w") as f:
            json.dump(tree, f, indent=2)
            
        ftp.quit()
    except Exception as e:
        with open("ftp_scan_result.json", "w") as f:
            json.dump({"error": str(e)}, f)

run_scan()
