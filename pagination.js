// pagination.js

document.addEventListener("DOMContentLoaded", () => {
  let totalQuestions = 0; // Initialize totalQuestions to 0

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageButtonsContainer = document.getElementById("page-buttons");

  let currentQuestion = 1;

  // Function to fetch questions for the current category and language
  async function fetchAndSetTotalQuestions() {
    try {
      const questions = await fetchQuestionsForCategory(currentCategory, currentLanguage);
      totalQuestions = questions.length; // Set totalQuestions based on the length of the fetched array
      console.log('QL',questions.length);
      updatePagination(); // Update pagination based on the new totalQuestions
      updateQuestionNumber(); // Update question number immediately after setting totalQuestions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  // Call the function to fetch and set totalQuestions when DOM content is loaded
  fetchAndSetTotalQuestions();

  function updatePagination() {
      pageButtonsContainer.innerHTML = "";

      let start = Math.max(currentQuestion - 3, 1);
      let end = Math.min(currentQuestion + 3, totalQuestions);

      if (currentQuestion <= 4) {
          end = Math.min(7, totalQuestions);
      } else if (currentQuestion >= totalQuestions - 3) {
          start = Math.max(totalQuestions - 6, 1);
      }

      for (let i = start; i <= end; i++) {
          const button = document.createElement("button");
          button.textContent = i;
          button.classList.add("btn", "btn-secondary");
          button.onclick = () => navigateToQuestion(i);

          if (i === currentQuestion) {
              button.classList.add("btn-primary");
              button.classList.remove("btn-secondary");
          }

          pageButtonsContainer.appendChild(button);
      }

      prevBtn.disabled = currentQuestion === 1;
      if (currentQuestion === totalQuestions) {
          nextBtn.textContent = "Inleveren";
          nextBtn.classList.remove("btn-primary");
          nextBtn.classList.add("btn-danger");
      } else {
          nextBtn.textContent = "Volgende Vraag";
          nextBtn.classList.remove("btn-danger");
          nextBtn.classList.add("btn-primary");
      }
  }

  function updateQuestionNumber() {
      const questionNumberElement = document.getElementById("question-number");
      questionNumberElement.textContent = `Vraag ${currentQuestion} van ${totalQuestions}`;
  }

  function navigateToPrev() {
      if (currentQuestion > 1) {
          currentQuestion--;
          updateQuestionNumber();
          updatePagination();
          loadQuestions(currentQuestion); // Load the previous question
      }
  }

  function navigateToNext() {
      if (currentQuestion < totalQuestions) {
          currentQuestion++;
          updateQuestionNumber();
          updatePagination();
          loadQuestions(currentQuestion); // Load the next question
      } else {
          console.log("Test submitted for grading");
      }
  }

  function navigateToQuestion(question) {
      currentQuestion = question;
      updateQuestionNumber();
      updatePagination();
      loadQuestions(currentQuestion); // Load the selected question
  }

  prevBtn.addEventListener("click", navigateToPrev);
  nextBtn.addEventListener("click", navigateToNext);

  updatePagination();
  updateQuestionNumber();
  loadQuestions(currentQuestion);
});
