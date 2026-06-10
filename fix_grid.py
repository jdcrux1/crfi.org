import os
import re

def fix_grid_columns(dir_path):
    # Matches: style={{ ... gridColumn: 'X / span Y', ... }}
    # We will just replace gridColumn: 'X / span Y' with nothing, and add className.
    # But wait, className might already exist!
    # Let's do a slightly manual approach: find gridColumn inline styles.
    
    # regex to find gridColumn: 'X / span Y'
    pattern = re.compile(r"gridColumn:\s*'(\d+)\s*/\s*span\s*(\d+)'")
    
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith(".tsx"):
                filepath = os.path.join(root, file)
                with open(filepath, "r") as f:
                    content = f.read()
                
                new_content = []
                changed = False
                for line in content.split('\n'):
                    match = pattern.search(line)
                    if match:
                        start = match.group(1)
                        span = match.group(2)
                        
                        # Generate classes
                        if start == '1' and span == '12':
                            cls = 'col-span-full'
                        else:
                            cls = f'col-span-full md-col-start-{start} md-col-span-{span}'
                            
                        # If there's an intentionally empty right column (gridColumn: '8 / span 4' or similar with 0 content or just a tension graphic), we should ideally add hidden-mobile.
                        # We'll just add hidden-mobile if it starts at 8 or 10
                        if start in ['8', '10']:
                            cls += ' hidden-mobile'
                        
                        # Check if className already exists on this line
                        if 'className="' in line:
                            # insert into existing className
                            line = re.sub(r'className="([^"]*)"', rf'className="\1 {cls}"', line)
                        else:
                            # add className
                            # Find where style={{ is and insert before it
                            line = re.sub(r'style=\{\{', rf'className="{cls}" style={{{{', line)
                        
                        # Now remove gridColumn from style
                        # Cases: 
                        # style={{ gridColumn: '...', other: '...' }}
                        # style={{ other: '...', gridColumn: '...' }}
                        # style={{ gridColumn: '...' }}
                        line = re.sub(r"gridColumn:\s*'[^']+',\s*", "", line)
                        line = re.sub(r",\s*gridColumn:\s*'[^']+'", "", line)
                        line = re.sub(r"gridColumn:\s*'[^']+'\s*", "", line)
                        
                        # Clean up empty style={{ }}
                        line = line.replace('style={{ }}', '')
                        line = line.replace('style={{}}', '')
                        
                        changed = True
                    new_content.append(line)
                
                if changed:
                    with open(filepath, "w") as f:
                        f.write('\n'.join(new_content))
                    print(f"Updated {filepath}")

fix_grid_columns('/Users/macbookair/Documents/CRFI WEBSITE/frontend/src/app')
