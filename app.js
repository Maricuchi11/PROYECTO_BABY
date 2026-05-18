// IMPORTAR FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDVF_ptb50kA9VRCA0keVKtsW_YPQlxNXE",
  authDomain: "invitacionamadeo.firebaseapp.com",
  projectId: "invitacionamadeo",
  storageBucket: "invitacionamadeo.firebasestorage.app",
  messagingSenderId: "322684899078",
  appId: "1:322684899078:web:b480264e6165885a159373"
};


// INICIAR FIREBASE
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// REFERENCIA
const regalosRef = doc(db, "babyshower", "regalos");


// BOTON
const reserveBtn = document.getElementById("reserveBtn");


// RESERVAR VARIOS REGALOS
reserveBtn.addEventListener("click", async () => {

  const updates = {};

  document.querySelectorAll("input[type='checkbox']")
  .forEach(check => {

    if(check.checked && !check.disabled){

      const id = check.dataset.id;

      updates[id] = true;
    }

  });

  // GUARDAR EN FIREBASE
  await setDoc(regalosRef, updates, { merge:true });

  alert("💙 Regalos reservados correctamente");

});




// ESCUCHAR CAMBIOS EN TIEMPO REAL
onSnapshot(regalosRef, (docSnap) => {

  if(docSnap.exists()){

    const data = docSnap.data();

    document.querySelectorAll("input[type='checkbox']")
    .forEach(check => {

      const id = check.dataset.id;

      if(data[id] === true){

        check.checked = true;

        check.disabled = true;

        check.parentElement.classList.add("checked");



        // AGREGAR TEXTO RESERVADO
        if(!check.parentElement.querySelector(".reserved-text")){

          const reservado = document.createElement("span");

          reservado.classList.add("reserved-text");

          reservado.innerText = "RESERVADO";

          check.parentElement.appendChild(reservado);

        }

      }

    });

  }

});