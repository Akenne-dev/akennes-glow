# Akennes Glow Server

Backend for the Akennes Glow mobile app.

## Setup

1. Rename `.env.example` to `.env`.
2. Update `MONGODB_URI` with your MongoDB connection string.
3. Run `npm install`.
4. Start the server in development mode:

```bash
npm run dev
```

## API Endpoints

- `GET /` - server status
- `GET /api/health` - health check
- `GET /api/users` - list users
- `POST /api/users` - create a user


<!-- // Add this in your component
// GoogleSignin.configure({
//   webClientId:
//     "904276709234-72a7pitauf4lah9rbrspp6lmr6h7d7eb.apps.googleusercontent.com", // Found in Firebase Console
// }); -->
