<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CBR_opdracht!</title>
  <!-- Bootstrap CSS -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div id="button-container-en-nl" class="position-absolute top-0 start-0 translate-middle m-2">
    <button id="switch-to-en" class="btn btn-light">English</button>
    <button id="switch-to-nl" class="btn btn-light mx-1">Dutch</button>
  </div>
  <!-- Header -->
  <header class="bg-primary text-white text-center py-4">
    <h1>CBR_opdracht</h1>
  </header>
  <!-- Main Content -->
  <div id="nav" class="w-100 d-flex justify-content-between px-1"></div>
    <div id="chapter-container" class="position-absolute top-0 start-0 translate-middle ml-1"></div>
    <main class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header bg-success text-white d-flex justify-content-between">
                        <h2 class="card-title">Categorie: <span id="category-title">A</span></h2>
                        <h2 id="question-number" class="card-title2">Vraag 1 van 20</h2>
                    </div>
                    <div class="card-body">
                        <form id="form-container">
                            <div class="d-flex justify-content-end">
                                <div id="image-container" class="mr-3"></div>
                                <div id="question" class="ml-3 w-50 h-auto d-flex flex-wrap align-content-between">
                                    <label for="question">
                                        <h3 id="question-container"></h3>
                                    </label>
                                    <div id="form-button-container" class="d-flex flex-column justify-content-start w-100">
                                    </div>
                                    <div id="feedback-container" class="btn btn-info d-flex justify-content-end" onclick="toggleDiv(currentQuestion)">
                                        <span class="mb-0">ⓘ</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
  <!-- Footer -->
  <footer class="bg-dark text-white text-center py-4 fixed-bottom">
    <div id="subfooter" class="bg-dark text-white pb-3 d-flex justify-content-between px-3">
      <button id="prev-btn" class="btn btn-secondary">Vorige vraag</button>
      <div id="page-buttons" class="w-50 d-flex justify-content-between"></div><!-- Buttons 1 through 20 will be dynamically managed by JavaScript -->
      <button id="next-btn" class="btn btn-primary">Volgende Vraag</button>
    </div>
    <p class="mb-0">&copy; 2024 CBR_opdracht</p>
  </footer>

  <!-- Bootstrap JS and dependencies -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  
  <script src="main.js"></script>
  <script src="questionLoader.js"></script>
  <script src="pagination.js"></script>

</body>

</html>