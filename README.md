# Consumer Reports Activism Hub Prototype

Static proof-of-concept site for a Consumer Reports-style Activism Hub.

## GitHub Pages deployment

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that deploys the static site to GitHub Pages whenever code is pushed to the `main` branch.

### One-time setup in GitHub

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).

After deployment completes, the site will be available at the Pages URL shown in the workflow run summary.
