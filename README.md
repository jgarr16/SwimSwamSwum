# SwimSwimSwum

Simple Firebase-backed swim log.

## Setup
1. Create a Firebase project.
2. Create a Firestore database.
3. Update `app.js` with your Firebase config values.
4. Make sure Firestore rules allow reads/writes for your use (for quick testing, you can allow read/write temporarily).

## Run locally
Use any static file server so the Firebase modules load correctly:

```sh
cd /Users/jrgarrigues/repo/SwimSwamSwum
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

Enjoy
