# connormartini.com

Source for Connor Martini's personal site — built with [Astro](https://astro.build), a static-site generator. Every page is plain HTML/CSS at deploy time; there's no server, database, or CMS login required to keep it running.

## How the content is organized

All of the site's editable text lives in `src/content/`, as plain markdown files. Everything else (`src/pages/`, `src/components/`, `src/layouts/`) is the template code that lays that content out — you shouldn't need to touch those files for routine edits.

Each subfolder of `src/content/` is one kind of content:


| Folder | What it is | How to edit |
|---|---|---|
| `home/index.md` | Homepage hero kicker, name, and bio paragraph | Edit the file directly |
| `homeCurrently/index.md` | The "Currently" note on the homepage | Edit the file directly |
| `homePillars/*.md` | The four homepage cards (Academic/Teaching/Editorial/Fiction) | Edit a file, or copy one to add a fifth |
| `about/index.md` | About page bio (photo + four paragraphs) | Edit the file directly |
| `teaching/index.md` | Teaching page philosophy paragraphs | Edit the file directly |
| `teachingCourses/*.md` | Courses listed under "Courses Designed" | Edit a file, or add a new file for a new course |
| `academicHub/*.md` | The four cards on the Academic page | Edit a file, or add a new file for a new project |
| `academicPages/dissertation.md` | The full dissertation/book subpage | Edit the file directly |
| `publicScholarship/*.md` | Entries on the Public Scholarship page | Edit a file, or add a new file for a new piece |
| `editorial/*.md` | The two cards on the Editorial page | Edit a file, or add a new file for a new outlet |
| `fiction/*.md` | Each file is both a card on /fiction AND its own full page | Edit a file, or add a new file for a new book |
| `site/contact.md` | Footer email, phone, and social link | Edit the file directly |

### Adding a new entry (e.g. a new Public Scholarship piece, a new novel, a new editorial outlet)

Copy an existing file in that folder, rename it, and change the front matter (the `---`-fenced block at the top) and body text. The site picks it up automatically on the next deploy — no other files need to change. This is the most common edit you'll make.

### Adding a new novel (Fiction)

Copy `src/content/fiction/pale-red-dot.md` to a new file, e.g. `my-new-book.md`, and fill in `title`, `cardDescription` (shown on the Fiction hub), `dek` (subtitle on the book's own page), `pullQuote`, `status`, and `order`. The body text becomes the synopsis paragraphs. A page at `/fiction/my-new-book` is generated automatically.

### Filling in the "Ghosts of the Future" placeholders

`src/content/fiction/ghosts-of-the-future.md` has bracketed placeholder text (e.g. `[Add a synopsis paragraph...]`) and `placeholder: true` in its front matter, which is what makes that text render in italic grey. Once you replace the placeholder text with real copy, change `placeholder: true` to `placeholder: false` so it renders like a finished page (see `pale-red-dot.md` for the finished version).

### Linking a syllabus PDF

In `src/content/teachingCourses/*.md`, set `syllabusUrl` to the PDF's URL (once it's hosted somewhere — see below) and the course title becomes a clickable link automatically. Leave it blank (`syllabusUrl: ""`) and the title stays plain text, as it is now.

Hosting the PDFs themselves: the simplest option is dropping them into `public/syllabi/` in this project (create the folder) and setting `syllabusUrl: "/syllabi/your-file.pdf"` — they'll deploy along with the rest of the site.

### Things that require a small code change, not just a content edit

- Adding/renaming/reordering the navigation bar (`src/components/Nav.astro`)
- Adding a brand-new *kind* of page (not just a new entry in an existing list) — for example, a blog
- Changing fonts, colors, or layout

I'm always happy to help with these — just ask.

## Running it locally

```
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:4321`). The site reloads automatically as you edit content files.

To check the whole site builds without errors before deploying:

```
npm run build
```

## Deployment

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys to GitHub Pages automatically every time you push to `main`. One-time setup, in the GitHub repo's settings:

1. **Settings → Pages → Build and deployment → Source**: choose "GitHub Actions" (not "Deploy from a branch").
2. Push this project to the repo's `main` branch. The "Deploy site to GitHub Pages" action will run automatically and publish the site.
3. **Settings → Pages → Custom domain**: enter `connormartini.com`. This repo already includes a `public/CNAME` file with that domain, which GitHub Pages uses to keep the custom domain set on every deploy.
4. At your domain registrar (wherever connormartini.com is currently pointed — likely wherever the WordPress hosting is), update the DNS records to point at GitHub Pages:
   - Four `A` records for the root domain (`connormartini.com`) pointing to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` pointing to `<your-github-username>.github.io`
   - (Exact steps vary by registrar — GitHub's own docs at https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site have registrar-specific instructions.)
5. Once DNS propagates (can take up to a day, often much faster), check "Enforce HTTPS" back in the Pages settings.

After that first setup, every future push to `main` — including a content-only edit — redeploys the live site within a couple of minutes automatically.
