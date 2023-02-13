const bookFormWrapper = document.querySelector("[data-form-wrapper]");
const bookForm = document.querySelector("[data-form]");
const addButton = document.querySelector("[data-add-button]");
const closeButton = document.querySelector("[data-close-button]");
const bookFormOverlay = document.querySelector("[data-form-overlay]");
const bookFormName = document.querySelector("[data-form-name]");
const bookFormAuthor = document.querySelector("[data-form-author]");
const bookFormSummary = document.querySelector("[data-form-summary]");
const bookFormPoints = document.querySelector("[data-form-points]");
const table = document.querySelector("[data-table]");
const stars = document.querySelectorAll("[data-star]");
let expandButtons = document.querySelectorAll("[data-expand]");
let deleteButtons = document.querySelectorAll("[data-delete]");
const allBooks = [];

class Book {
  constructor(bookName, authorName, summary, points, rating) {
    this.bookName = bookName;
    this.authorName = authorName;
    this.summary = summary;
    this.points = points;
    this.rating = rating;
  }
}

function classToggle(bookFormName, bookFormAuthor, bookFormSummary, bookFormPoints, stars = null) {
  bookFormOverlay.classList.toggle("active");
  bookFormWrapper.classList.toggle("active");
  bookFormName.value = "";
  bookFormAuthor.value = "";
  bookFormSummary.value = "";
  bookFormPoints.value = "";
  if (stars === null) return;
  for (let star of stars) {
    star.innerHTML = "&#9734;";
  }
}

function deleteBook() {
  let title = this.parentElement.parentElement.querySelector(".title-name").innerText;
  let book = allBooks.find((a) => a.bookName === title);
  let bookIndex = allBooks.indexOf(book);
  allBooks.splice(bookIndex, bookIndex + 1);
  this.parentElement.parentElement.remove();
}

function expandBook() {
  console.log(this);
  let title = this.parentElement.parentElement.querySelector(".title-name").innerText;
  let book = allBooks.find((a) => a.bookName === title);
  bookFormName.value = book.bookName;
  bookFormAuthor.value = book.authorName;
  bookFormSummary.value = book.summary;
  bookFormPoints.value = book.points;
  if (stars === null) return;
  for (let star of stars) {
    star.innerHTML = "&#9734;";
  }
  bookFormOverlay.classList.toggle("active");
  bookFormWrapper.classList.toggle("active");
}

function addBook(bookName, authorName, rating) {
  let newBook = `<div class="table-row">
    <div class="table-cell title-name">${bookName}</div>
    <div class="table-cell author-name">${authorName}</div>
    <div class="table-cell rating-stars">
        <span class="star">${rating[0]}</button>
        <span class="star">${rating[1]}</button>
        <span class="star">${rating[2]}</button>
        <span class="star">${rating[3]}</button>
        <span class="star">${rating[4]}</button>
    </div>
    <div class="table-cell buttons">
        <button id="delete" data-delete><i class="fa-solid fa-trash"></i></button>
    </div>
</div>`;
  table.innerHTML += newBook;
}

stars.forEach((star, i) => {
  star.addEventListener("click", (e) => {
    e.preventDefault();
    let starIndex = i + 1;
    stars.forEach((star, j) => {
      if (starIndex >= j + 1) {
        star.innerHTML = "&#9733;";
      } else {
        star.innerHTML = "&#9734;";
      }
    });
  });
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  classToggle(bookFormName, bookFormAuthor, bookFormSummary, bookFormPoints, stars);
});

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  classToggle(bookFormName, bookFormAuthor, bookFormSummary, bookFormPoints);
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let bookName = bookFormName.value.toString();
  let authorName = bookFormAuthor.value.toString();
  let summary = bookFormSummary.value.toString();
  let points = bookFormPoints.value.toString();
  let rating = "";
  for (let star of stars) {
    if (star.innerText === "★") {
      rating += "&#9733;";
    } else {
      rating += "&#9734;";
    }
  }
  rating = rating.split(";").slice(0, -1);
  allBooks.push(new Book(bookName, authorName, summary, points, rating));
  addBook(bookName, authorName, rating);
  classToggle(bookFormName, bookFormAuthor, bookFormSummary, bookFormPoints, stars);
  deleteButtons = document.querySelectorAll("[data-delete]");
  for (deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", deleteBook);
  }
});
