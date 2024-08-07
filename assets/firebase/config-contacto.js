import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, Timestamp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHqfAiO2gsxFd_DwfrhE-gJdPJfcXcMV8",
  authDomain: "ikamultitiendas.firebaseapp.com",
  projectId: "ikamultitiendas",
  storageBucket: "ikamultitiendas.appspot.com",
  messagingSenderId: "844394495235",
  appId: "1:844394495235:web:d51369a4a4d38737487d36",
  measurementId: "G-ZZKEMZPZEK"
};

let app;
let db;


try {
  // Inicializar Firebase
  app = initializeApp(firebaseConfig);
  // Inicializar Firestore
  db = getFirestore(app);
  // console.log("Firebase conectado correctamente.");

} catch (error) {
  console.error("Error al conectar Firebase:", error);
}

soporte.addEventListener('click', validar);

function validar() {
  const elementos = [
    document.getElementById('supportName').value,
    document.getElementById('supportEmail').value,
    document.getElementById('supportAsunto').value,
    document.getElementById('supportMessage').value
  ]

  if (elementos.every(e => e.trim() !== '')) {
    return guardar(elementos);
  } else {
    showAlert('Es necesario llenar los campos', 'danger', 'alertContainer');
  }
}

function guardar(elementos) {
  // console.log(elementos);
  addDoc(collection(db, "soporte"), {
    nombre: elementos[0],
    correo: elementos[1],
    asunto: elementos[2],
    mensaje: elementos[3],
    created_time: Timestamp.now()
  })

  showAlert('Ikam Multitiendas se pondra en contacto, gracias.', 'success', 'alertContainer');
  document.getElementById('supportName').value = "",
  document.getElementById('supportEmail').value = "",
  document.getElementById('supportAsunto').value = "",
  document.getElementById('supportMessage').value = ""
}

function showAlert(message, type, id) {
  const alertContainer = document.getElementById(id);
  const alertElement = document.createElement('div');
  alertElement.className = `alert alert-${type} alert-dismissible fade show`;
  alertElement.role = 'alert';
  alertElement.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  alertContainer.appendChild(alertElement);

  // Remover la alerta después de 5 segundos
  setTimeout(() => {
    alertElement.remove();
  }, 3000);
}

