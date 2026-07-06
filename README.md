# lesceller.com

Personal website. Plain static HTML, CSS, and a little vanilla JS. No build step, no dependencies.

Served by GitHub Pages (`.nojekyll` disables the Jekyll pipeline).

## Structure

- `index.html`: home page
- `research/index.html`: talks and papers
- `assets/style.css`: the single stylesheet (light/dark via `prefers-color-scheme`)
- `assets/app.js`: scramble/typewriter animations and easter eggs
- `pgp.txt`, `keybase.txt`: keys and identity proofs

## Preview locally

```sh
python3 -m http.server 8000
```
