import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
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

const form = document.getElementById("swim-form");
const status = document.getElementById("status");
const list = document.getElementById("swim-list");
const poolSelect = document.getElementById("pool");

const swimsCollection = collection(db, "swims");

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }
  return Number.isFinite(value) ? value.toString() : "-";
};

const clearList = () => {
  list.innerHTML = "";
};

const renderSwims = (docs) => {
  clearList();

  if (docs.length === 0) {
    const empty = document.createElement("div");
    empty.className = "row";
    empty.innerHTML = "<span>No swims yet.</span><span></span><span></span><span></span>";
    list.appendChild(empty);
    return;
  }

  docs.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <span>${data.date ?? "-"}</span>
      <span>${formatNumber(data.weight)}</span>
      <span>${formatNumber(data.laps)}</span>
      <span>${data.pool || "-"}</span>
    `;
    list.appendChild(row);
  });
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const date = form.date.value;
  const weight = form.weight.value ? Number(form.weight.value) : null;
  const laps = form.laps.value ? Number(form.laps.value) : null;
  const pool = poolSelect.value;

  if (!date) {
    return;
  }

  await addDoc(swimsCollection, {
    date,
    weight,
    laps,
    pool: pool || null,
    createdAt: serverTimestamp(),
  });

  form.reset();
});

const swimsQuery = query(swimsCollection, orderBy("date", "desc"));

onSnapshot(
  swimsQuery,
  (snapshot) => {
    status.textContent = `${snapshot.size} entries`;
    renderSwims(snapshot.docs);
  },
  (error) => {
    status.textContent = "Unable to load data";
    console.error("Firestore error:", error);
  }
);
