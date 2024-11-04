import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuLWPkTYDkqU9A2-cbzMVNDIVOCR7Ocdw",
  authDomain: "database-66dc4.firebaseapp.com",
  databaseURL: "https://database-66dc4-default-rtdb.firebaseio.com",
  projectId: "database-66dc4",
  storageBucket: "database-66dc4.firebasestorage.app",
  messagingSenderId: "527263732511",
  appId: "1:527263732511:web:0fc9e919c11138b42c962a",
  measurementId: "G-9VW4XNBZ1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function displayStudents(students) {
  const main = document.querySelector('.main');
  const oldList = document.querySelector('.students-list');
  if(oldList) oldList.remove();

  const studentsList = document.createElement('div');
  studentsList.classList.add('students-list');
  studentsList.style.marginTop = '20px';
  
  const studentsArray = students ? Object.values(students).reverse() : [];
  
  studentsArray.forEach((student, index) => {
    setTimeout(() => {
      const studentDiv = document.createElement('div');
      studentDiv.classList.add('student-card');
      studentDiv.setAttribute('data-aos', 'fade-up');
      studentDiv.setAttribute('data-aos-delay', '0');
      studentDiv.innerHTML = `
        <p>👤 ${student.name}</p>
        <p>🎂 Age: ${student.age || 'Not specified'}</p>
        <p>📧 Email: ${student.email}</p>
        <p>📱 Phone: ${student.phone}</p>
      `;
      studentsList.appendChild(studentDiv);
      AOS.refresh();
    }, index * 500);
  });

  main.appendChild(studentsList);
}

// Слушаем изменения в базе данных
function loadStudents() {
  const studentsRef = ref(db, 'students');
  onValue(studentsRef, (snapshot) => {
    const data = snapshot.val();
    displayStudents(data);
  });
}

function onClick(e) {
  if (!nameInput.value.trim()) {
    alert('Please enter a name');
    return;
  }

  const student = {
    id: Math.random().toString(36).substr(2, 4),
    name: nameInput.value.trim(),
    age: parseInt(ageInput.value) || null,
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    timestamp: Date.now()
  };

  // Добавляем студента в Firebase
  const studentsRef = ref(db, 'students');
  push(studentsRef, student)
    .then(() => {
      // Очищаем инпуты
      nameInput.value = "";
      ageInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
    })
    .catch((error) => {
      console.error("Error adding student: ", error);
      alert('Error adding student. Please try again.');
    });
}

// Получаем ссылки на все инпуты
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const button = document.getElementById("button");

button.addEventListener("click", onClick);

// Инициализация при загрузке страницы
loadStudents();
