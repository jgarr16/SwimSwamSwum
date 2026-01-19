import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCn5ghjB7z6xo-qJ-74U0oI6BRy5WTttKY",
  authDomain: "swimswamswum-9796e.firebaseapp.com",
  projectId: "swimswamswum-9796e",
  storageBucket: "swimswamswum-9796e.firebasestorage.app",
  messagingSenderId: "984376275522",
  appId: "1:984376275522:web:d6139c86f663595324f3db",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const swimSeed = [
  { date: "2025-09-20", weight: 205.3, laps: 8 },
  { date: "2025-09-22", weight: 206.4, laps: 12 },
  { date: "2025-09-23", weight: 205.5, laps: 14 },
  { date: "2025-09-24", weight: 204.5, laps: 16 },
  { date: "2025-09-25", weight: 205.3, laps: 18 },
  { date: "2025-09-27", weight: 204.4, laps: 20 },
  { date: "2025-09-29", weight: 204.7, laps: 20 },
  { date: "2025-09-30", weight: 204.6, laps: 20 },
  { date: "2025-10-01", weight: 204.8, laps: 22 },
  { date: "2025-10-02", weight: 205.2, laps: 24 },
  { date: "2025-10-03", weight: 205.1, laps: 32 },
  { date: "2025-10-04", weight: 204.9, laps: 44 },
  { date: "2025-10-05", weight: 206.1, laps: 60 },
  { date: "2025-10-06", weight: 207.0, laps: 60 },
  { date: "2025-10-07", weight: 209.2, laps: 64 },
  { date: "2025-10-08", weight: 205.2, laps: 64 },
  { date: "2025-10-09", weight: 204.3, laps: 80 },
  { date: "2025-10-10", weight: 203.4, laps: 80 },
  { date: "2025-10-13", weight: 205.3, laps: 60 },
  { date: "2025-10-14", weight: 204.4, laps: 80 },
  { date: "2025-10-15", weight: 205.2, laps: 90 },
  { date: "2025-10-16", weight: 205.7, laps: 100 },
  { date: "2025-10-17", weight: 204.0, laps: 100 },
  { date: "2025-10-18", weight: 203.3, laps: 78 },
  { date: "2025-10-19", weight: 202.3, laps: 100 },
  { date: "2025-10-20", weight: 202.0, laps: 100 },
  { date: "2025-10-21", weight: 200.2, laps: 100 },
  { date: "2025-10-22", weight: 200.3, laps: 100 },
  { date: "2025-10-23", weight: 200.0, laps: 100 },
  { date: "2025-10-26", weight: 200.3, laps: 100 },
  { date: "2025-10-27", weight: 200.5, laps: 100 },
  { date: "2025-10-28", weight: 200.8, laps: 100 },
  { date: "2025-10-29", weight: 200.8, laps: 100 },
  { date: "2025-10-30", weight: 200.7, laps: 100 },
  { date: "2025-11-01", weight: 199.8, laps: 100 },
  { date: "2025-11-02", weight: 200.0, laps: 100 },
  { date: "2025-11-03", weight: 201.2, laps: 52 },
  { date: "2025-11-04", weight: 200.7, laps: 100 },
  { date: "2025-11-05", weight: 200.4, laps: 100 },
  { date: "2025-11-06", weight: 199.4, laps: 100 },
  { date: "2025-11-07", weight: 198.6, laps: 100 },
  { date: "2025-11-08", weight: 200.3, laps: 54 },
  { date: "2025-11-10", weight: 201.1, laps: 100 },
  { date: "2025-11-11", weight: 200.4, laps: 100 },
  { date: "2025-11-12", weight: 199.5, laps: 100 },
  { date: "2025-11-13", weight: 198.4, laps: 100 },
  { date: "2025-11-14", weight: 199.1, laps: 100 },
  { date: "2025-11-15", weight: 198.8, laps: 100 },
  { date: "2025-11-16", weight: 200.2, laps: 100 },
  { date: "2025-11-17", weight: 200.0, laps: 100 },
  { date: "2025-11-18", weight: 201.4, laps: 100 },
  { date: "2025-11-19", weight: 200.6, laps: 100 },
  { date: "2025-11-20", weight: 200.4, laps: 100 },
  { date: "2025-11-21", weight: 199.5, laps: 100 },
  { date: "2025-11-22", weight: 198.9, laps: 100 },
  { date: "2025-11-24", weight: 199.9, laps: 100 },
  { date: "2025-11-25", weight: 199.7, laps: 100 },
  { date: "2025-11-26", weight: 199.9, laps: 100 },
  { date: "2025-11-29", weight: 200.0, laps: 100 },
  { date: "2025-11-30", weight: 198.8, laps: 100 },
  { date: "2025-12-01", weight: 200.0, laps: 100 },
  { date: "2025-12-02", weight: 201.0, laps: 100 },
  { date: "2025-12-03", weight: 200.5, laps: 100 },
  { date: "2025-12-04", weight: 199.5, laps: 100 },
  { date: "2025-12-05", weight: 197.9, laps: 100 },
  { date: "2025-12-06", weight: 197.5, laps: 100 },
  { date: "2025-12-07", weight: 198.4, laps: 100 },
  { date: "2025-12-08", weight: 199.6, laps: 100 },
  { date: "2025-12-09", weight: 199.4, laps: 100 },
  { date: "2025-12-10", weight: 196.8, laps: 100 },
  { date: "2025-12-11", weight: 198.6, laps: 100 },
  { date: "2025-12-12", weight: 197.7, laps: 100 },
  { date: "2025-12-14", weight: 197.3, laps: 100 },
  { date: "2025-12-15", weight: 199.0, laps: 100 },
  { date: "2025-12-16", weight: 197.4, laps: 100 },
  { date: "2025-12-17", weight: 198.4, laps: 100 },
  { date: "2025-12-18", weight: 197.1, laps: 100 },
  { date: "2025-12-19", weight: 199.4, laps: 50 },
  { date: "2025-12-21", weight: 200.6, laps: 100 },
  { date: "2025-12-22", weight: 202.6, laps: 100 },
  { date: "2025-12-23", weight: 198.5, laps: 100 },
  { date: "2025-12-24", weight: 199.1, laps: 100 },
  { date: "2025-12-26", weight: 198.1, laps: 100 },
  { date: "2025-12-27", weight: 199.3, laps: 100 },
  { date: "2025-12-29", weight: 199.5, laps: 100 },
  { date: "2025-12-30", weight: 197.5, laps: 100 },
  { date: "2025-12-31", weight: 196.7, laps: 100 },
  { date: "2026-01-02", weight: 199.5, laps: 100 },
  { date: "2026-01-03", weight: 200.5, laps: 100 },
  { date: "2026-01-04", weight: 198.6, laps: 100 },
  { date: "2026-01-05", weight: 199.0, laps: 100 },
  { date: "2026-01-06", weight: 199.5, laps: 100 },
  { date: "2026-01-09", weight: 198.5, laps: 100 },
  { date: "2026-01-10", weight: 196.4, laps: 100 },
  { date: "2026-01-11", weight: 198.6, laps: 100 },
  { date: "2026-01-12", weight: 199.5, laps: 100 },
  { date: "2026-01-13", weight: 199.5, laps: 100 },
  { date: "2026-01-14", weight: 198.7, laps: 100 },
  { date: "2026-01-15", weight: 199.3, laps: 100 },
  { date: "2026-01-16", weight: 198.0, laps: 100 },
  { date: "2026-01-18", weight: 196.9, laps: 20 },
];

const button = document.getElementById("seed-button");
const status = document.getElementById("seed-status");

const seedData = async () => {
  button.disabled = true;
  status.textContent = "Seeding...";

  try {
    for (const entry of swimSeed) {
      const ref = doc(db, "swims", entry.date);
      await setDoc(ref, {
        ...entry,
        pool: null,
        createdAt: serverTimestamp(),
      });
    }
    status.textContent = `Seeded ${swimSeed.length} entries.`;
  } catch (error) {
    console.error("Seed failed:", error);
    status.textContent = "Seed failed. Check console for details.";
  } finally {
    button.disabled = false;
  }
};

button.addEventListener("click", seedData);
