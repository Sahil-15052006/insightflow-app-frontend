# InsightFlow mobile app

Expo Router mobile client for InsightFlow.

## Run locally

```bash
npm install
npx expo start --clear
```

Set `EXPO_PUBLIC_API_URL` in `.env` to the reachable backend URL before running the app.

## Structure

- `app/` — routes and screens
- `components/` — reusable UI components
- `global.css` and `tailwind.config.js` — NativeWind styles

The `(tabs)` and `(analysis)` folders are Expo Router route groups. They keep the main and analysis tab navigators separate without changing route URLs.
