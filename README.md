# Tribute for Mohammad Ashfaq — Teacher's Day, 5 October

Static site (no backend, no keys). Works on GitHub Pages, Netlify and Vercel. All paths are relative.

## Deploy on GitHub Pages
1. Create a new GitHub repository (public).
2. Upload everything inside this folder (index.html, styles.css, script.js, og.jpg, README.md and the assets folder) using "Add file > Upload files".
3. Open the repository Settings, then Pages.
4. Under Source, choose "Deploy from a branch", branch main, folder /(root).
5. Save and wait a minute or two.
6. Open the URL GitHub shows, check it on your phone, then send it on WhatsApp.

## Where images live (assets/)
teacher, teacher-bilal, students, project-water-cooling, islamic-calligraphy, teacher-photography, misc.
The full list with captions is in assets/manifest.json (and assets/manifest.js, which the site reads).

## Adding more images later
1. Put a .webp or .jpg file in the right assets folder.
2. Add a line to BOTH assets/manifest.json and assets/manifest.js: {"id":"my-photo","src":"assets/teacher-photography/my-photo.webp","w":1200,"h":800,"alt":"Short description","dir":"teacher-photography"}
3. New images with dir "teacher-photography" appear in the photography wall automatically.
4. To use an image elsewhere, add <img data-img="my-photo" alt=""> in index.html (or its id in the lists in script.js).

## Notes
- Sharing preview uses og.jpg. Replace it with another 1200x630 image if you like.
- Fonts load from Google Fonts; without internet the site falls back to system fonts.
- Urdu poems are in script.js (array P), exactly as supplied.
