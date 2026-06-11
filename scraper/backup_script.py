import requests
from bs4 import BeautifulSoup
import json
import urllib.parse
from collections import deque
import time

def scrape_site(start_url, max_pages=50):
    visited = set()
    queue = deque([start_url])
    base_url = urllib.parse.urlparse(start_url).scheme + "://" + urllib.parse.urlparse(start_url).netloc
    
    site_data = {
        "pages": {},
        "global_images": []
    }
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    count = 0
    while queue and count < max_pages:
        url = queue.popleft()
        
        # normalize url to avoid duplicates
        url = url.split('#')[0]
        if url in visited:
            continue
            
        print(f"Scraping: {url}")
        visited.add(url)
        count += 1
        
        try:
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code != 200:
                print(f"Failed to fetch {url}: {response.status_code}")
                continue
                
            soup = BeautifulSoup(response.text, 'html.parser')
            
            page_data = {
                "title": soup.title.string.strip() if soup.title and soup.title.string else "",
                "headings": [],
                "paragraphs": [],
                "images": []
            }
            
            # Extract Headings
            for hn in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
                for tag in soup.find_all(hn):
                    text = tag.get_text(strip=True)
                    if text:
                        page_data["headings"].append(text)
                        
            # Extract Paragraphs
            for p in soup.find_all('p'):
                text = p.get_text(strip=True)
                if text:
                    page_data["paragraphs"].append(text)
                    
            # Extract Images
            for img in soup.find_all('img'):
                src = img.get('src')
                if src:
                    full_src = urllib.parse.urljoin(base_url, src)
                    page_data["images"].append(full_src)
                    if full_src not in site_data["global_images"]:
                        site_data["global_images"].append(full_src)
                        
            site_data["pages"][url] = page_data
            
            # Find more links
            for link in soup.find_all('a'):
                href = link.get('href')
                if href:
                    full_href = urllib.parse.urljoin(base_url, href)
                    parsed_href = urllib.parse.urlparse(full_href)
                    if parsed_href.netloc == urllib.parse.urlparse(base_url).netloc and full_href not in visited:
                        # only html pages
                        if any(full_href.endswith(ext) for ext in ['.pdf', '.jpg', '.png', '.zip']):
                            continue
                        queue.append(full_href)
            
            # Be nice to the server
            time.sleep(1)
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")

    with open('../content_backup.json', 'w', encoding='utf-8') as f:
        json.dump(site_data, f, indent=4, ensure_ascii=False)
        
    print(f"Scraped {count} pages. Data saved to content_backup.json")

if __name__ == "__main__":
    scrape_site("https://www.crfing.org/")
