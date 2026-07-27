# Aya Core Studios — Website

A React + TypeScript + Tailwind CSS 4 site, built with Vite, Framer Motion,
and React Router. Five pages: Home, Work, About, Services, Contact, plus a
dynamic Work case-study page per project.

## 1. See it running on your own computer (no coding required)

You need **Node.js** installed once (this only takes a minute):

1. Go to https://nodejs.org and download the "LTS" version for your OS.
2. Install it like any normal app (keep clicking Next/Continue).
3. Restart your computer if it's your first time installing Node.

Then, every time you want to work on the site:

1. Unzip this project folder anywhere (e.g. your Desktop).
2. Open a terminal / command prompt **inside that folder**:
   - **Mac:** right-click the folder -> "New Terminal at Folder" (or open
     Terminal and type `cd ` then drag the folder in, then press Enter).
   - **Windows:** open the folder in File Explorer, click the address bar,
     type `cmd`, press Enter.
3. Run this once (downloads all the packages the site needs):
   ```
   npm install
   ```
4. Run this every time you want to preview:
   ```
   npm run dev
   ```
5. Your terminal will print a link like `http://localhost:5173`. Open that
   in your browser -- that's your live, editable site. Any code change you
   save will instantly refresh in the browser.

Press `Ctrl+C` in the terminal to stop the preview server when you're done.

## 2. See it right now, with zero setup

Open **aya-core-studios-preview-build.zip** (shared alongside this file).
Unzip it, then either:
- Drag the unzipped folder onto https://app.netlify.com/drop -- it gives you
  a live public URL in about 10 seconds, no account needed to start.
- Or, if you have Node installed: `cd` into the unzipped folder and run
  `npx serve .`, then open the link it prints.

This is a frozen snapshot of the build (won't reflect future edits) --
useful for a quick look or sharing with someone else right now.

## 3. Make the contact form actually send you emails

The form on `/contact` is wired up to use **Formspree** (a free service that
turns a plain HTML form into a working email — no backend server needed):

1. Go to https://formspree.io and make a free account.
2. Create a new form, and set the destination to your real email
   (e.g. `aya@ayacore.studio`).
3. Formspree gives you an endpoint URL that looks like
   `https://formspree.io/f/abcd1234`.
4. Open `src/pages/Contact.tsx`, find this line near the top:
   ```ts
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   and replace the placeholder with your real endpoint.

Until you do this, the form still works and shows a "message received"
confirmation (so it's demoable), but nothing actually gets sent anywhere —
there's a console warning to remind you.

## 4. Put real content in

- **Photos/screenshots:** drop image files into `src/assets/` (create the
  folder if it doesn't exist) and reference them in the page files, e.g.
  `import shot from '../assets/matatiele-hero.jpg'` then `<img src={shot} />`.
  The project hero placeholders live in `src/pages/ProjectDetail.tsx`.
- **Project data:** edit `src/data/projects.ts` -- every project's name,
  description, metrics, and live link lives there in one place.
- **Colors:** all brand colors are defined once in `src/index.css` under
  `@theme` -- change a hex there and it updates everywhere automatically.
- **Logo:** the source files are in `public/brand/`. `aya-core-logo.png` is
  the full lockup, `aya-core-symbol.png` is the circular mark used in the
  nav bar and footer, `favicon.png` is the browser-tab icon.

## 5. Publish it live on the internet (free)

The easiest route uses **Vercel**:

1. Create a free account at https://vercel.com (you can sign up with GitHub,
   Google, or email).
2. Put this project in its own GitHub repository (GitHub Desktop
   https://desktop.github.com is the easiest way to do this without command
   line -- create a repo, drag this folder in, commit, publish).
3. In Vercel, click "Add New Project", pick your GitHub repo, leave all the
   defaults (Vercel auto-detects Vite), click Deploy.
4. A couple minutes later you'll get a live `.vercel.app` URL. You can add
   your own domain (e.g. ayacore.studio) under Project -> Settings -> Domains.

Every time you push a change to GitHub after that, Vercel rebuilds and
redeploys automatically.

## 6. Project structure, if you're curious

```
src/
  components/    reusable pieces (nav, footer, project cards, etc.)
  data/          projects.ts -- all 5 project entries, one file
  pages/         one file per route: Home, Work, ProjectDetail, About, Services, Contact
  index.css      color tokens, fonts, and global styles
  App.tsx        page routing
public/
  brand/         logo files (see section 3 above)
```
