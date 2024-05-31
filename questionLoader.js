// questionLoader.js

let currentCategory = "A"; // Default category
let currentLanguage = "nl"; // Default language
let filteredQuestions = [];

async function fetchQuestionsForCategory(category, language) {
  try {
    const response = await fetch(`http://localhost:3000/questions_${language}`);
    const data = await response.json();
    return data.filter((question) => question.category === category);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

// Update the loadQuestions function to accept the category id as a parameter
async function loadQuestions(questionNumber) {
  try {
    filteredQuestions = await fetchQuestionsForCategory(currentCategory, currentLanguage);
    currentQuestionIndex = questionNumber;
    displayQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

function displayQuestion() {
  const questionsContainer = document.getElementById("question-container");
  const imageContainer = document.getElementById("image-container");
  const formButtonContainer = document.getElementById("form-button-container");

  questionsContainer.innerHTML = "";
  imageContainer.innerHTML = "";
  formButtonContainer.innerHTML = "";

  if (filteredQuestions.length === 0) {
    const noQuestionsElement = document.createElement("div");
    noQuestionsElement.classList.add("no-questions");
    noQuestionsElement.textContent =
      "No questions available for this category.";
    questionsContainer.appendChild(noQuestionsElement);
    return;
  }

  const question = filteredQuestions[currentQuestionIndex];
  

  if (!question || !question.options) {
    console.error("Invalid question format", question);
    return;
  }

  // console.log(question);

  const questionElement = document.createElement("div");
  questionElement.classList.add("question");
  questionElement.textContent = question.question;

  const imageElement = document.createElement("img");
  imageElement.src = './theorie-rijbewijs-b-raw-data/public/assets/img/' + question.image; // Use default image if not available
  imageElement.alt = "Question Image";
  imageElement.classList.add("img-fluid");

  question.options.forEach((answer, index) => {
    if (answer) {
      // Only create radio button if answer is not empty
      const answerWrapper = document.createElement("div");
      answerWrapper.classList.add("form-check");

      const answerInput = document.createElement("input");
      answerInput.classList.add("form-check-input");
      answerInput.type = "radio";
      answerInput.name = "answer";
      answerInput.id = `answer${index}`;
      answerInput.value = answer;

      const answerLabel = document.createElement("label");
      answerLabel.classList.add("form-check-label");
      answerLabel.htmlFor = `answer${index}`;
      answerLabel.textContent = answer;

      answerWrapper.appendChild(answerInput);
      answerWrapper.appendChild(answerLabel);
      formButtonContainer.appendChild(answerWrapper);
    }
  });

  questionsContainer.appendChild(questionElement);
  imageContainer.appendChild(imageElement);
}
