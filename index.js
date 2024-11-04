function displayStudents(students) {
  const main = document.querySelector('.main');
  const studentsList = document.createElement('div');
  studentsList.classList.add('students-list');
  studentsList.style.marginTop = '20px';
  
  students.reverse().forEach((student, index) => {
    setTimeout(() => {
      const studentDiv = document.createElement('div');
      studentDiv.classList.add('student-card');
      studentDiv.setAttribute('data-aos', 'fade-up');
      studentDiv.setAttribute('data-aos-delay', '0');
      studentDiv.innerHTML = `
        <p>👤 ${student.name}</p>
        <p>🎂 Age: ${student.age}</p>
        <p>📧 Email: ${student.email}</p>
        <p>📱 Phone: ${student.phone}</p>
      `;
      studentsList.appendChild(studentDiv);
      AOS.refresh();
    }, index * 500);
  });

  main.appendChild(studentsList);
}

fetch("http://localhost:3000/students")
  .then((response) => response.json())
  .then((students) => {
    console.log(students);
    displayStudents(students);
  });

// Получаем ссылки на все инпуты
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const button = document.getElementById("button");

button.addEventListener("click", onClick);

function onClick(e) {
  // Создаем объект с данными из инпутов
  const student = {
    name: nameInput.value,
    age: parseInt(ageInput.value),
    email: emailInput.value,
    phone: phoneInput.value
  };

  // Отправляем POST запрос
  fetch("http://localhost:3000/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Success:", data);
    // Очищаем инпуты после успешной отправки
    nameInput.value = "";
    ageInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    // Обновляем список студентов после добавления нового
    fetch("http://localhost:3000/students")
      .then((response) => response.json())
      .then((students) => {
        const oldList = document.querySelector('.main div');
        if(oldList) oldList.remove();
        displayStudents(students);
      });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}
