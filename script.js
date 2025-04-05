// script.js - version Firebase propre avec séparation admin / public

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// 🧩 Nouvelle configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRIdIXj0IixLwASOgZsqka550gOAVr7_4",
  authDomain: "avwebcreation-admin.firebaseapp.com",
  projectId: "avwebcreation-admin",
  storageBucket: "avwebcreation-admin.firebasestorage.app",
  messagingSenderId: "293089525298",
  appId: "1:293089525298:web:68ff4408a175909699862b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔐 Identifiant utilisateur (UID) - à personnaliser si multi-client
const uid = "TON_UID_ICI"; // remplace par l'UID du client

// === ZONE ADMIN : Sauvegarde des données ===
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const adresseInput = document.getElementById("adresse");
const codePostalInput = document.getElementById("codePostal");
const lieuInput = document.getElementById("lieu");
const saveBtn = document.getElementById("save");
const message = document.getElementById("message");

if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const phone = phoneInput.value;
    const adresse = adresseInput.value;
    const codePostal = codePostalInput.value;
    const lieu = lieuInput.value;

    try {
      await setDoc(doc(db, "infos", uid), {
        email,
        phone,
        adresse,
        codePostal,
        lieu
      });

      message.textContent = "Infos mises à jour ✅";
      message.style.color = "green";
      setTimeout(() => (message.textContent = ""), 3000);
    } catch (error) {
      console.error("Erreur Firebase :", error);
      message.textContent = "Erreur lors de la mise à jour";
      message.style.color = "red";
    }
  });
}

// === ZONE PUBLIQUE : Chargement auto sur page Contact ===
async function chargerInfosContact() {
  const emailEl = document.getElementById("contact-email");
  const phoneEl = document.getElementById("contact-phone");
  const adresseEl = document.getElementById("contact-adresse");

  // Si aucun élément cible sur la page, on quitte
  if (!emailEl && !phoneEl && !adresseEl) return;

  try {
    const docSnap = await getDoc(doc(db, "infos", uid));
    if (docSnap.exists()) {
      const data = docSnap.data();

      if (emailEl) emailEl.textContent = data.email ?? "Non défini";
      if (phoneEl) phoneEl.textContent = data.phone ?? "Non défini";
      if (adresseEl)
        adresseEl.textContent = `${data.adresse ?? ""}, ${data.codePostal ?? ""} ${data.lieu ?? ""}`.trim();
    }
  } catch (err) {
    console.error("Erreur de chargement Firebase :", err);
  }
}

chargerInfosContact();
