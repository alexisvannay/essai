// script.js - version Firebase avec adresse complète

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQzjrfZ7iSHJtc3dISNelkMym0Dw6Iluk",
  authDomain: "site-tattoo-96c35.firebaseapp.com",
  projectId: "site-tattoo-96c35",
  storageBucket: "site-tattoo-96c35.firebasestorage.app",
  messagingSenderId: "758463604276",
  appId: "1:758463604276:web:1c8c2c67e874270d7f4c61"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === ÉLÉMENTS DU FORMULAIRE ===
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const adresseInput = document.getElementById("adresse");
const codePostalInput = document.getElementById("codePostal");
const lieuInput = document.getElementById("lieu");
const saveBtn = document.getElementById("save");
const message = document.getElementById("message");

// === SAUVEGARDE DANS FIRESTORE ===
if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const phone = phoneInput.value;
    const adresse = adresseInput.value;
    const codePostal = codePostalInput.value;
    const lieu = lieuInput.value;

    try {
      await setDoc(doc(db, "infos", "wFxq2hxKeZP8iDLvWHQ6"), {
        email,
        phone,
        adresse,
        codePostal,
        lieu
      });

      message.textContent = "Infos mises à jour ✅";
    } catch (error) {
      console.error("Erreur Firebase :", error);
      message.textContent = "Erreur lors de la mise à jour";
    }
  });
}

// === AFFICHAGE AUTOMATIQUE SUR LA PAGE CONTACT ===
async function chargerInfosContact() {
  const emailEl = document.getElementById("contact-email");
  const phoneEl = document.getElementById("contact-phone");
  const adresseEl = document.getElementById("contact-adresse");

  try {
    const docSnap = await getDoc(doc(db, "infos", "wFxq2hxKeZP8iDLvWHQ6"));
    if (docSnap.exists()) {
      const data = docSnap.data();

      if (emailEl) emailEl.textContent = data.email;
      if (phoneEl) phoneEl.textContent = data.phone;
      if (adresseEl) adresseEl.textContent = `${data.adresse}, ${data.codePostal} ${data.lieu}`;
    }
  } catch (err) {
    console.error("Erreur de chargement Firebase :", err);
  }
}

chargerInfosContact();
