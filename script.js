"use strict";
const addBtn = document.querySelector(".btn-add");
const popup = document.querySelector(".popup");
const popupContent = document.querySelector(".popup-content");
const bookContainer = document.querySelector(".book-section");
const books = document.querySelector(".books");
const bookTitle = document.querySelector("#title");
const authorName = document.querySelector("#author");
const pages = document.querySelector("#pages");
const submit = document.querySelector("#submit");
const formStatus = document.querySelector("#status-option");
const readStatus = document.querySelectorAll(".read");
let myLibrary = [];
let addBtnClick = false;
//Constructor Function
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}
let btns = []; //to push book buttons to style z-index
//Adding book into library Array
function addToLibrary() {
  let newBook = new Book(
    bookTitle.value,
    authorName.value,
    pages.value,
    formStatus.value
  );
  myLibrary.push(newBook);
  click++;
}
let click = 1; // this variable was made to change the textContent of button to add book or cancel the form

//Add book
addBtn.addEventListener("click", function () {
  addBtn.textContent = "Cancel";
  popup.classList.remove("hidden");
  popupContent.classList.remove("hidden", "scale");
  click++;
  btns.forEach((btn) => {
    btn.style.zIndex = 0;
  });
  if (click % 2 !== 0) {
    //Cancelling the form and hiding it
    addBtn.textContent = "Add Book";
    popup.classList.add("hidden");
    popupContent.classList.add("hidden", "scale");
    btns.forEach((btn) => {
      btn.style.zIndex = 100;
    });
  }
});

//Submitting form
submit.addEventListener("click", function (e) {
  e.preventDefault();
  addToLibrary();
  creatingBookElement();
  console.log(myLibrary);
  addBtn.textContent = "Add Book";
  btns.forEach((btn) => {
    btn.style.zIndex = 100;
  });
  popup.classList.add("hidden");
  popupContent.classList.add("hidden", "scale");
});

//creating books and displaying them on Ui
function creatingBookElement() {
  const book = document.createElement("div");
  book.classList.add("book-info");
  books.appendChild(book);
  const spanName = document.createElement("span");
  spanName.textContent = "Name";
  const bookName = document.createElement("p");
  bookName.classList.add("book-name");
  const spanAuthor = document.createElement("span");
  spanAuthor.textContent = " Author";
  const authorName = document.createElement("p");
  authorName.classList.add("author-name");
  const spanPages = document.createElement("span");
  spanPages.textContent = " Pages";
  const pages = document.createElement("p");
  pages.classList.add("page");
  const bookBtns = document.createElement("div");
  bookBtns.classList.add("book-btns");
  const readBtn = document.createElement("a");
  readBtn.href = "#";
  readBtn.style.zIndex = 100;
  const deleteBtn = document.createElement("a");
  deleteBtn.href = "#";
  deleteBtn.textContent = "Delete";
  deleteBtn.style.zIndex = 100;
  deleteBtn.classList.add("delete-book");
  for (let i = 0; i < myLibrary.length; i++) {
    bookName.textContent = myLibrary[i].title;
    authorName.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages;
    if (myLibrary[i].status === "NotRead") {
      readBtn.textContent = "Not read";
      readBtn.classList.remove("read");
      readBtn.classList.add("not-read");
    } else {
      readBtn.textContent = "Read";
      readBtn.classList.add("read");
    }
  }
  btns.push(readBtn, deleteBtn);

  bookBtns.append(readBtn, deleteBtn);
  book.append(
    spanName,
    bookName,
    spanAuthor,
    authorName,
    spanPages,
    pages,
    bookBtns
  );
  console.log(addBtnClick);

  //Updating status
  readBtn.addEventListener("click", function () {
    if (readBtn.classList.contains("read")) {
      readBtn.classList.remove("read");
      readBtn.classList.add("not-read");
      readBtn.textContent = "Not read";
    } else if (readBtn.classList.contains("not-read")) {
      readBtn.classList.remove("not-read");
      readBtn.classList.add("read");
      readBtn.textContent = "Read";
    }
  });

  //Delete functionality
  deleteBtn.addEventListener("click", function () {
    books.removeChild(book);
  });
}
