// script.js - version Firebase

// === CONFIG FIREBASE ===
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

// === ÉLÉMENTS DU DOM ===
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const saveBtn = document.getElementById("save");
const message = document.getElementById("message");

// === SAUVEGARDE DANS FIRESTORE ===
if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const phone = phoneInput.value;

    try {
      await setDoc(doc(db, "infos", "wFxq2hxKeZP8iDLvWHQ6"), {
        email: email,
        phone: phone
      });

      message.textContent = "Infos mises à jour ✅";
    } catch (error) {
      console.error("Erreur Firebase :", error);
      message.textContent = "Erreur lors de la mise à jour";
    }
  });
}

// === LECTURE POUR PAGE CONTACT ===
async function chargerInfosContact() {
  const emailElement = document.getElementById("contact-email");
  const phoneElement = document.getElementById("contact-phone");

  if (!emailElement || !phoneElement) return;

  try {
    const docSnap = await getDoc(doc(db, "infos", "wFxq2hxKeZP8iDLvWHQ6"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      emailElement.textContent = data.email;
      phoneElement.textContent = data.phone;
    }
  } catch (err) {
    console.error("Erreur de chargement des infos :", err);
  }
}

chargerInfosContact();
