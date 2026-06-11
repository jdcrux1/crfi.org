const fs = require('fs');
const path = require('path');

const routes = [
  'about-us/mission-vision',
  'about-us/our-objects',
  'about-us/profile-of-the-visionary',
  'about-us/visionary-s-inaugural-speech-in-1990',
  'about-us/articles-of-faith',
  'about-us/articles-of-faith-2',
  'about-us/foundation-scripture',
  'event-gallery/crfu-outreach-2010',
  'event-gallery/crfu-outreach-2011',
  'event-gallery/crfu-outreach-2012',
  'event-gallery/crfu-outreach-2013',
  'event-gallery/crfu-outreach-2014',
  'event-gallery/crfu-outreach-2015',
  'event-gallery/crfu-outreach-2020'
];

const templatePath = path.join(__dirname, 'frontend', 'src', 'app', 'about', 'page.tsx');
const templateContent = fs.readFileSync(templatePath, 'utf8');

routes.forEach(route => {
  const dirPath = path.join(__dirname, 'frontend', 'src', 'app', route);
  fs.mkdirSync(dirPath, { recursive: true });
  
  const filePath = path.join(dirPath, 'page.tsx');
  
  // Replace the component name so Next.js doesn't complain about duplicates
  let content = templateContent.replace('export default function About()', `export default function Page_${route.replace(/[^a-zA-Z0-9]/g, '_')}()`);
  
  // Update the Title in the Hero to reflect the route
  const titleText = route.split('/').pop().replace(/-/g, ' ').toUpperCase();
  content = content.replace('<span className="stagger-text-in" style={{ display: \'block\', color: \'var(--color-text)\' }}>ABOUT</span>', `<span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)' }}>${titleText}</span>`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Created route: /${route}`);
});

console.log('Successfully generated all 14 pages based on the About template!');
