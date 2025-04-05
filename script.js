// script-client.js - version centralisée multi-clients

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// ✅ Configuration Firebase centrale
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

// 🔍 Lire le UID depuis une balise <meta name="client-uid" content="UID_Ici">
const metaUid = document.querySelector('meta[name="client-uid"]');
if (!metaUid) {
  console.error("⚠️ Aucun UID trouvé dans la balise <meta name='client-uid'>.");
} else {
  const uid = metaUid.content;

  // 🔄 Charger les données et les injecter dans la page
  async function chargerInfosClient() {
    try {
      const docRef = doc(db, "infos", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const emailEl = document.getElementById("contact-email");
        const phoneEl = document.getElementById("contact-phone");
        const adresseEl = document.getElementById("contact-adresse");

        if (emailEl) emailEl.textContent = data.email ?? "Non défini";
        if (phoneEl) phoneEl.textContent = data.phone ?? "Non défini";
        if (adresseEl)
          adresseEl.textContent = `${data.adresse ?? ""}, ${data.codePostal ?? ""} ${data.lieu ?? ""}`.trim();
      } else {
        console.log("Aucune donnée trouvée pour ce client.");
      }
    } catch (err) {
      console.error("Erreur lors du chargement des données client :", err);
    }
  }

  chargerInfosClient();
}
