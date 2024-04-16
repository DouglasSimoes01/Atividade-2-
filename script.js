// Definição das perguntas para cada quiz
const databaseQuestions = [
  {
    id: 1,
    question: "Qual é o principal objetivo do banco de dados?",
    options: ["Armazenar dados", "Executar código", "Exibir páginas da web"],
    answer: ["Armazenar dados"]
  },
  {
    id: 2,
    question: "O que é SQL?",
    options: ["Linguagem de programação", "Linguagem de consulta estruturada", "Sistema operacional"],
    answer: ["Linguagem de consulta estruturada"]
  },
  {
    id: 3,
    question: "O que é uma chave primária em um banco de dados?",
    options: ["Um campo que identifica unicamente uma linha em uma tabela", "Um tipo de tabela especial", "Um comando SQL"],
    answer: ["Um campo que identifica unicamente uma linha em uma tabela"]
  }
];

const oopQuestions = [
  {
    id: 1,
    question: "O que é encapsulamento?",
    options: ["Processo de ocultar os detalhes de implementação de um objeto", "Processo de tornar um objeto público", "Processo de herança de objetos"],
    answer: ["Processo de ocultar os detalhes de implementação de um objeto"]
  },
  {
    id: 2,
    question: "O que é herança em programação orientada a objetos?",
    options: ["Capacidade de um objeto de adquirir propriedades e comportamentos de outro objeto", "Capacidade de um objeto de ser privado", "Capacidade de um objeto de ser estático"],
    answer: ["Capacidade de um objeto de adquirir propriedades e comportamentos de outro objeto"]
  },
  {
    id: 3,
    question: "O que é polimorfismo?",
    options: ["Capacidade de um objeto de assumir várias formas", "Capacidade de um objeto de herdar de múltiplas classes", "Capacidade de um objeto de ser imutável"],
    answer: ["Capacidade de um objeto de assumir várias formas"]
  }
];

const htmlCssJsQuestions = [
  {
    id: 1,
    question: "O que significa HTML?",
    options: ["Hyper Text Markup Language", "High Technology Markup Language", "Hyperlinks and Text Markup Language"],
    answer: ["Hyper Text Markup Language"]
  },
  {
    id: 2,
    question: "Qual é a função do CSS?",
    options: ["Estilizar páginas da web", "Manipular dados em um banco de dados", "Controlar a lógica do lado do servidor"],
    answer: ["Estilizar páginas da web"]
  },
  {
    id: 3,
    question: "Qual é a linguagem de programação usada principalmente para interatividade em páginas da web?",
    options: ["JavaScript", "Python", "C++"],
    answer: ["JavaScript"]
  }
];

// Função para exibir uma pergunta e suas opções
function displayQuestion(quizName, question) {
  const quizElement = document.getElementById(quizName + "-quiz");
  const questionElement = document.createElement("h3");
  questionElement.textContent = question.question;
  quizElement.appendChild(questionElement);

  const optionsList = document.createElement("ul");
  question.options.forEach((option, index) => {
    const optionItem = document.createElement("li");
    const optionInput = document.createElement("input");
    optionInput.type = "checkbox"; // Alterado para checkbox para permitir múltiplas opções
    optionInput.name = quizName + "-option-" + question.id; // Adicionando identificador único para cada pergunta
    optionInput.value = option; // Adicionando valor da opção
    const optionLabel = document.createElement("label");
    optionLabel.textContent = option;
    optionItem.appendChild(optionInput);
    optionItem.appendChild(optionLabel);
    optionsList.appendChild(optionItem);
  });
  quizElement.appendChild(optionsList);
}

// Função para exibir todas as perguntas de um quiz
function displayAllQuestions(quizName, questions) {
  const quizElement = document.getElementById(quizName + "-quiz");
  quizElement.innerHTML = ""; // Limpa o conteúdo anterior do quiz

  questions.forEach(question => {
    displayQuestion(quizName, question);
  });
}

// Função para verificar as respostas
function checkAnswers() {
  const quizResults = document.getElementById("quiz-results");
  quizResults.innerHTML = ""; // Limpa os resultados anteriores

  [databaseQuestions, oopQuestions, htmlCssJsQuestions].forEach((questions, quizIndex) => {
    const quizName = ["Database", "OOP", "HTML, CSS, JS"][quizIndex];
    const quizResult = document.createElement("div");
    quizResult.classList.add("quiz-result");
    quizResult.innerHTML = `<h2>${quizName} Quiz</h2>`;

    let correctAnswers = [];
    let incorrectAnswers = [];

    questions.forEach(question => {
      const selectedOptions = document.querySelectorAll(`input[name=${quizName}-option-${question.id}]:checked`);
      const selectedValues = Array.from(selectedOptions).map(option => option.value);

      if (selectedValues.length === 0) {
        incorrectAnswers.push({ question: question.question, answer: question.answer });
      } else if (selectedValues.sort().toString() === question.answer.sort().toString()) {
        correctAnswers.push(question.question);
      } else {
        incorrectAnswers.push({ question: question.question, answer: question.answer });
      }
    });

    if (correctAnswers.length > 0) {
      const correctHeader = document.createElement("h3");
      correctHeader.textContent = "Respostas corretas:";
      quizResult.appendChild(correctHeader);
      correctAnswers.forEach(answer => {
        const correctItem = document.createElement("p");
        correctItem.textContent = answer;
        quizResult.appendChild(correctItem);
      });
    }

    if (incorrectAnswers.length > 0) {
      const incorrectHeader = document.createElement("h3");
      incorrectHeader.textContent = "Respostas incorretas:";
      quizResult.appendChild(incorrectHeader);
      incorrectAnswers.forEach(answer => {
        const incorrectItem = document.createElement("p");
        incorrectItem.textContent = `${answer.question} - A resposta correta é: ${answer.answer}`;
        quizResult.appendChild(incorrectItem);
      });
    }

    quizResults.appendChild(quizResult);
  });
}

// Exibindo as perguntas de cada quiz
displayAllQuestions("database", databaseQuestions);
displayAllQuestions("oop", oopQuestions);
displayAllQuestions("html-css-js", htmlCssJsQuestions);

// Adicionando evento de clique para verificar respostas
document.getElementById("btn-check-answers").addEventListener('click', checkAnswers);
