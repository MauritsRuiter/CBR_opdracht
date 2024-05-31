// document.addEventListener("DOMContentLoaded", () => {
//   let currentQuestion = 1;
//   let currentQuestionIndex = 0;
//   let filteredQuestions = [];
//   let currentCategory = "";
//   let currentLanguage = "nl"; // Default language

//   document.getElementById("switch-to-en").addEventListener("click", () => {
//     switchLanguage("en");
//   });

//   document.getElementById("switch-to-nl").addEventListener("click", () => {
//     switchLanguage("nl");
//   });

//   // function switchLanguage(language) {
//   //     currentLanguage = language;
//   //     // Additionally, you may want to reload the questions for the current category
//   //     loadQuestions(currentCategory, currentLanguage);
//   // }

//   function switchLanguage(language) {
//     currentLanguage = language;
//     loadCategories(language);
//     if (currentCategory) {
//       loadQuestions(currentCategory, currentLanguage); // Pass currentLanguage
//     }
//   }

//   function loadCategories(language) {
//     const endpoint =
//       language === "en"
//         ? "http://localhost:3000/categories_en"
//         : "http://localhost:3000/categories_nl";

//     fetch(endpoint)
//       .then((response) => response.json())
//       .then((data) => {
//         const nav = document.getElementById("nav");
//         const chapterContainer = document.getElementById("chapter-container");
//         const categoryTitle = document.querySelector(".card-title");

//         // Clear existing content
//         nav.innerHTML = "";
//         chapterContainer.innerHTML = "";

//         data.forEach((category) => {
//           const linkElement = document.createElement("a");
//           linkElement.setAttribute("href", "#");
//           linkElement.textContent = category.category;

//           const chapterElement = document.createElement("div");
//           chapterElement.classList.add("chapter");
//           chapterElement.textContent = category.chapter;

//           nav.appendChild(linkElement);
//           chapterContainer.appendChild(chapterElement);

//           linkElement.addEventListener("mouseover", (event) => {
//             chapterElement.style.display = "block";
//             chapterElement.style.width = "max-content";
//             updateTooltipPosition(event, chapterElement);
//           });

//           linkElement.addEventListener("mouseout", () => {
//             chapterElement.style.display = "none";
//           });

//           linkElement.addEventListener("mousemove", (event) => {
//             updateTooltipPosition(event, chapterElement);
//           });

//           linkElement.addEventListener("click", (event) => {
//             event.preventDefault(); // Prevent the default link behavior
//             const clickedCategory = category.category; // Assuming you have access to the category value of the clicked question
//             categoryTitle.textContent = `Categorie: ${clickedCategory}`;
//             loadQuestions(clickedCategory, currentLanguage); // Pass the correct category value
//           });
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   }

//   const fetchQuestions = async (url, category) => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       // Filter questions with the specified category
//       return data.filter((question) => question.category === category);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Function to fetch questions for a specific category from both endpoints
//   const fetchQuestionsForCategory = async (category, language) => {
//     const questions = await fetchQuestions(
//       `http://localhost:3000/questions_${language}`,
//       category
//     );
//     return questions;
//   };

//   function loadQuestions(category, language) {
//     console.log("Selected language:", language);
//     console.log("Loading questions for category:", category);

//     fetchQuestionsForCategory(category, language)
//       .then((filteredQuestions) => {
//         console.log("Filtered questions:", filteredQuestions);

//         if (!filteredQuestions) {
//           console.error("Error: Filtered questions is undefined or null");
//           return;
//         }

//         currentQuestionIndex = 0; // Reset to the first question
//         displayQuestion(filteredQuestions); // Display the filtered questions
//       })
//       .catch((error) => {
//         console.error("Error fetching questions:", error);
//       });
//   }

//   function displayQuestion(filteredQuestions) {
//     const questionsContainer = document.getElementById("question-container");

//     // Clear existing questions
//     questionsContainer.innerHTML = "";

//     if (filteredQuestions.length === 0) {
//       const noQuestionsElement = document.createElement("div");
//       noQuestionsElement.classList.add("no-questions");
//       noQuestionsElement.textContent =
//         "No questions available for this category.";
//       questionsContainer.appendChild(noQuestionsElement);
//     } else {
//       const question = filteredQuestions[currentQuestionIndex];
//       const questionElement = document.createElement("div");
//       questionElement.classList.add("question");
//       questionElement.textContent = question.question;

//       questionsContainer.appendChild(questionElement);
//     }
//   }

//   function nextQuestion() {
//     if (currentQuestionIndex < filteredQuestions.length - 1) {
//       currentQuestionIndex++;
//       displayQuestion();
//     }
//   }

//   function prevQuestion() {
//     if (currentQuestionIndex > 0) {
//       currentQuestionIndex--;
//       displayQuestion();
//     }
//   }

//   // Helper function to update tooltip position
//   function updateTooltipPosition(event, tooltip) {
//     const xOffset = 10;
//     const yOffset = 10;
//     tooltip.style.left = event.pageX + xOffset + "px";
//     tooltip.style.top = event.pageY + yOffset + "px";
//   }

//   // Event listeners for Next and Previous buttons
//   document.getElementById("next-btn").addEventListener("click", nextQuestion);
//   document.getElementById("prev-btn").addEventListener("click", prevQuestion);

//   // function navigateToNextQuestion() {
//   //   currentQuestion++;
//   //   loadQuestions(currentQuestion);
//   // }

//   // function navigateToPreviousQuestion() {
//   //   if (currentQuestion > 1) {
//   //     currentQuestion--;
//   //     loadQuestions(currentQuestion);
//   //   }
//   // }

//   // function toggleDiv() {
//   //   const myDiv = document.getElementById("form-button-container");
//   //   const toggleButton = document.getElementById("feedback-container");

//   //   if (myDiv.style.display === "none") {
//   //     myDiv.style.display = "block";
//   //     toggleButton.textContent = "ⓘ";
//   //   } else {
//   //     const endpoint =
//   //       currentLanguage === "en"
//   //         ? `http://localhost:3000/questions_en/${currentQuestion}`
//   //         : `http://localhost:3000/questions_nl/${currentQuestion}`;
//   //   }
//   // }

//   // function clearFeedback() {
//   //   const feedbackContainer = document.getElementById("feedback-container");
//   //   feedbackContainer.textContent = "ⓘ";
//   // }

//   const totalQuestions = 700;
//   const prevBtn = document.getElementById("prev-btn");
//   const nextBtn = document.getElementById("next-btn");
//   const pageButtonsContainer = document.getElementById("page-buttons");

//   function updatePagination() {
//     // Pagination logic here
//     pageButtonsContainer.innerHTML = "";

//     let start = Math.max(currentQuestion - 3, 1);
//     let end = Math.min(currentQuestion + 3, totalQuestions);

//     if (currentQuestion <= 4) {
//       end = Math.min(7, totalQuestions);
//     } else if (currentQuestion >= totalQuestions - 3) {
//       start = Math.max(totalQuestions - 6, 1);
//     }

//     for (let i = start; i <= end; i++) {
//       const button = document.createElement("button");
//       button.textContent = i;
//       button.classList.add("btn", "btn-secondary");
//       button.onclick = () => navigateToQuestion(i);

//       if (i === currentQuestion) {
//         button.classList.add("btn-primary");
//         button.classList.remove("btn-secondary");
//       }

//       pageButtonsContainer.appendChild(button);
//     }

//     prevBtn.disabled = currentQuestion === 1;
//     if (currentQuestion === totalQuestions) {
//       nextBtn.textContent = "Inleveren";
//       nextBtn.classList.remove("btn-primary");
//       nextBtn.classList.add("btn-danger");
//     } else {
//       nextBtn.textContent = "Volgende Vraag";
//       nextBtn.classList.remove("btn-danger");
//       nextBtn.classList.add("btn-primary");
//     }
//   }

//   function updateQuestionNumber() {
//     // Update question number logic here
//     const questionNumberElement = document.getElementById("question-number");
//     questionNumberElement.textContent = `Vraag ${currentQuestion} van ${totalQuestions}`;
//   }

//   prevBtn.addEventListener("click", navigateToPrev);
//   nextBtn.addEventListener("click", navigateToNext);

//   function navigateToPrev() {
//     // Navigate to previous question logic here
//     if (currentQuestion > 1) {
//       currentQuestion--;
//       updateQuestionNumber();
//       updatePagination();
//       loadQuestions(currentQuestion); // Load the previous question
//     }
//   }

//   function navigateToNext() {
//     // Navigate to next question logic here
//     if (currentQuestion < totalQuestions) {
//       currentQuestion++;
//       updateQuestionNumber();
//       updatePagination();
//       loadQuestions(currentQuestion); // Load the next question
//     } else {
//       // Logic for submitting the test goes here
//       console.log("Test submitted for grading");
//     }
//   }

//   function navigateToQuestion(question) {
//     // Navigate to specific question logic here
//     currentQuestion = question;
//     updateQuestionNumber();
//     updatePagination();
//     loadQuestions(currentQuestion); // Load the selected question
//   }

//   // Load categories for the default language (e.g., "nl" for Dutch)
//   loadCategories(currentLanguage);
//   updatePagination();
//   updateQuestionNumber();
// });
