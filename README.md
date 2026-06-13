# Akennes Glow Workspace

This workspace contains two main folders:

- `client/akennes-glow` — Expo mobile app using plain JSX and Expo Router
- `server/` — Node.js + Express backend with MongoDB and Mongoose

## Client

- Uses Expo Router with `.jsx` page files
- No TypeScript configuration in the current app
- Key packages installed:
  - `axios`
  - `zustand`
  - `react-hook-form`
  - `@react-navigation/native`
  - `react-native-safe-area-context`
  - `react-native-screens`

## Server

- Express API server
- MongoDB connection via Mongoose
- JWT authentication support
- User, Product, Cart, Wishlist, and Order models

## Notes

- The client app is intentionally configured as a JSX-based Expo project.
- The old TypeScript setup has been removed from `client/akennes-glow`.
- If you want to run the mobile client, use `cd client/akennes-glow && npm start`.
- If you want to run the backend, use `cd server && npm run dev`.
