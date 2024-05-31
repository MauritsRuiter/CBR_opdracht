// main.js

// Call loadCategories function with default language on page load
document.addEventListener("DOMContentLoaded", () => {
  const defaultLanguage = "nl"; // Default language
  loadCategories(defaultLanguage).then(() => {
    // After loading categories, load the first question for the default category
    loadQuestions(1);
  });
});

document.getElementById("switch-to-en").addEventListener("click", () => {
  switchLanguage("en");
});

document.getElementById("switch-to-nl").addEventListener("click", () => {
  switchLanguage("nl");
});

function switchLanguage(language) {
  currentLanguage = language;
  loadCategories(language);
  currentQuestion = 1; // Reset to the first question when language is switched
  currentQuestionIndex = 0; // Reset currentQuestionIndex when switching languages
  if (currentCategory) {
    loadQuestions(1); // Pass 1 as the question number to load the first question
  }
}

async function loadCategories(language) {
  const endpoint =
    language === "en"
      ? "http://localhost:3000/categories_en"
      : "http://localhost:3000/categories_nl";

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const nav = document.getElementById("nav");
      const chapterContainer = document.getElementById("chapter-container");
      const categoryTitle = document.querySelector(".card-title");

      // Clear existing content
      nav.innerHTML = "";
      chapterContainer.innerHTML = "";

      data.forEach((category) => {
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        linkElement.textContent = category.category;

        const chapterElement = document.createElement("div");
        chapterElement.classList.add("chapter");
        chapterElement.textContent = category.chapter;

        nav.appendChild(linkElement);
        chapterContainer.appendChild(chapterElement);

        linkElement.addEventListener("mouseover", (event) => {
          chapterElement.style.display = "block";
          chapterElement.style.width = "max-content";
          updateTooltipPosition(event, chapterElement);
        });

        linkElement.addEventListener("mouseout", () => {
          chapterElement.style.display = "none";
        });

        linkElement.addEventListener("mousemove", (event) => {
          updateTooltipPosition(event, chapterElement);
        });

        linkElement.addEventListener("click", (event) => {
          event.preventDefault(); // Prevent the default link behavior
          const clickedCategory = category.category; // Assuming you have access to the category value of the clicked question
          currentCategory = clickedCategory; // Update currentCategory
          categoryTitle.textContent = `Categorie: ${clickedCategory}`;
          loadQuestions(1); // Load the first question for the new category
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
  function updateTooltipPosition(event, element) {
    const viewportWidth = window.innerWidth;
    const tooltipWidth = element.offsetWidth;
    const mouseX = event.pageX;

    if (mouseX > viewportWidth / 2) {
      element.style.left = `${mouseX - tooltipWidth - 10}px`; // Show to the left of the cursor
    } else {
      element.style.left = `${mouseX + 10}px`; // Show to the right of the cursor
    }
  }
}