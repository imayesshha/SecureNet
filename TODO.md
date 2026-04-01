# Vercel Fix Progress

## Steps from Plan:
- [x] Create `vercel.json` for static SPA config (rewrites, no functions)
- [x] Local test: `npm run build` ✓ (dist/ generated successfully)
- [x] `npm run preview` running at http://localhost:4173/ (test routes manually: /login, /dashboard, etc.)
- [ ] **Commit/push** (use NEW terminal): 
  ```
  git add .
  git commit -m "fix: vercel.json static SPA config to fix 500 error"
  git push
  ```
- [ ] Monitor Vercel redeploy → test https://secure-net-ashy.vercel.app/
- [ ] Backend: src/api.js uses localhost:5000 → Update to VITE_API_URL env var post-deploy

**Preview Status**: Test /login, /dashboard refresh. Ctrl+C when done.
