# Push OceanBrown to GitHub

Extract this ZIP, open PowerShell inside the extracted folder, then run:

```powershell
git init
git branch -M main
git remote add origin https://github.com/Ous39/oceanbrown-site.git
git add .
git commit -m "Add complete OceanBrown website and admin"
git push -u origin main
```

If Git reports that `origin` already exists, use:

```powershell
git remote set-url origin https://github.com/Ous39/oceanbrown-site.git
```

If GitHub rejects the push because the repository already contains its initialization commit, run:

```powershell
git pull origin main --allow-unrelated-histories
git add .
git commit -m "Merge complete OceanBrown website and admin"
git push -u origin main
```

## Run locally

```powershell
pnpm install
pnpm dev
```

The public website is at `/` and the protected administration dashboard is at `/admin`.
