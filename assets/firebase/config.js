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

// Preguntas y Respuestas
const respuestas = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "preguntas"));
    querySnapshot.docs.map((doc) => {
      const item = doc.data();
      if (item.respuesta != null) {
        const formattedDate = item.created_time.toDate().toLocaleDateString("es-ES");
        const content = document.getElementById('questionsContainer');
        const div = document.createElement('div');
        div.className = "card mb-3";
        div.innerHTML = `                  
              <div class="card-header">
                  <strong>Pregunta:</strong> ${item.pregunta}
                  <span class="text-muted float-end">Fecha: ${formattedDate}</span>
              </div>
              <div class="card-body">                  
                  <strong>Ikam Multitiendas:</strong>
                  <p class="card-text">${item.respuesta}</p>
              </div>
      `;
        content.appendChild(div);
      }
    })
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
};

try {
  // Inicializar Firebase
  app = initializeApp(firebaseConfig);
  // Inicializar Firestore
  db = getFirestore(app);
  // console.log("Firebase conectado correctamente.");
  respuestas();
} catch (error) {
  console.error("Error al conectar Firebase:", error);
}

pregunta.addEventListener('click', validar2);

function validar2() {
  const elementos = [
    document.getElementById('questionCorreo').value,
    document.getElementById('questionBody').value
  ]

  if (elementos.every(e => e.trim() !== '')) {    
    // Cerrar el modal
    const closeButton = document.getElementById('closeModalButton');
    closeButton.click();
    return guardar2(elementos);
  }
}

function guardar2(elementos) {  
  addDoc(collection(db, "preguntas"), {
    correo: elementos[0],
    pregunta: elementos[1],
    created_time: Timestamp.now()
  })
  showAlert('Ikam Multitiendas contestara en breve tu pregunta.', 'success', 'alertContainerPre');
  document.getElementById('questionCorreo').value = "",
    document.getElementById('questionBody').value = ""
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

