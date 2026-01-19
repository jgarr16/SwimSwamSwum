import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("swim-form");
const status = document.getElementById("status");
const list = document.getElementById("swim-list");
const poolSelect = document.getElementById("pool");
const otherPoolWrapper = document.getElementById("other-pool-wrapper");
const otherPoolInput = document.getElementById("otherPool");

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

poolSelect.addEventListener("change", () => {
  if (poolSelect.value === "Other") {
    otherPoolWrapper.classList.remove("hidden");
  } else {
    otherPoolWrapper.classList.add("hidden");
    otherPoolInput.value = "";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const date = form.date.value;
  const weight = form.weight.value ? Number(form.weight.value) : null;
  const laps = form.laps.value ? Number(form.laps.value) : null;
  const pool =
    poolSelect.value === "Other" ? otherPoolInput.value.trim() : poolSelect.value;

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
  otherPoolWrapper.classList.add("hidden");
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
