import urllib.request
import re
import json

urls = {
    "2020": "https://www.crfing.org/event-gallery/crfu-outreach-2020",
    "2015": "https://www.crfing.org/event-gallery/crfu-outreach-2015",
    "2014": "https://www.crfing.org/event-gallery/crfu-outreach-2014",
    "2013": "https://www.crfing.org/event-gallery/crfu-outreach-2013",
    "2012": "https://www.crfing.org/event-gallery/crfu-outreach-2012",
    "2011": "https://www.crfing.org/event-gallery/crfu-outreach-2011",
    "2010": "https://www.crfing.org/event-gallery/crfu-outreach-2010"
}

results = []
for year, url in urls.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
        # Find all gallery images
        links = re.findall(r'(/images/com_osgallery/[^"\'\s>]+)', html)
        img_urls = set()
        for link in links:
            link = link.replace('/thumbnail/', '/original/')
            full_url = 'https://www.crfing.org' + link
            if full_url.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                img_urls.add(full_url)
        
        sorted_imgs = sorted(list(img_urls))
        
        results.append({
            "year": year,
            "title": f"CRFU Outreach {year}",
            "images": sorted_imgs
        })
    except Exception as e:
        print(f"Error on {year}: {e}")

# Output formatted JS array literal
js_code = "const galleries = [\n"
for r in results:
    js_code += "  {\n"
    js_code += f'    year: "{r["year"]}",\n'
    js_code += f'    title: "{r["title"]}",\n'
    js_code += '    images: [\n'
    for img in r["images"]:
        js_code += f'      "{img}",\n'
    js_code += '    ]\n'
    js_code += "  },\n"
js_code += "];"

with open("gallery_data.txt", "w") as f:
    f.write(js_code)
print("Saved to gallery_data.txt")
