## Nextlog #01 - Fri, May 27, 2022

- Build a login page
- Use **`next-auth`** to integrate Google OAuth Sign-in/Sign-out
  - Set up environment variable `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (retrieved from the Google Cloud Console). Also set `NEXTAUTH_URL=http://localhost:3000`
  - Google Provider setup: [next-auth/google](https://next-auth.js.org/providers/google)
  - Use `useSession()` to access user data on client side
  - Use `getSession()` to access user data on server side
  - Fetch user data in `getServerSideProps` by passing `context` to `getSession()`
  - **Redirect to homepage** if the user is logged in on server side:
  ```typescript
  if (user) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }
  ```
  ### Update #1
  - For production, set `NEXTAUTH_URL=https://zcal.vercel.app/` (or any production url) to prevent not redirecting after logging in. **(WRONG URL WILL NOT RESULT IN REDIRECTION)**
