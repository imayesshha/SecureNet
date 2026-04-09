# SecureNet Project Separation & Fixes TODO

## Status: 2/9 ✅ Backend Fixes Complete


### Backend Fixes (SECURENET)
- [x] 1. Edit server.js - Remove duplicate `app.use('/api', apiRoutes)`

- [ ] 2. Verify vercel.json is correct (already done)
- [ ] 3. Test backend: `npm start`
- [ ] 4. Git commit backend fixes

### Frontend Fixes (SECURENET-FRONTEND/client/)
- [x] 5. Create client/.env with VITE_API_URL placeholder

- [ ] 6. Verify vite.config.js base: '/' (already done)
- [ ] 7. Test frontend: `cd client && npm run dev`

### GitHub Repo Separation
- [ ] 8. Backend: `gh repo create securenet-backend --public --push` (owner: imayesshha)
- [ ] 9. Frontend: Copy client/ → securenet-frontend/, `git init`, `gh repo create securenet-frontend --public --push`

**Next:** Check off completed steps after each action.

