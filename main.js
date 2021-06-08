(() => {
  let myLibrary = [];

  /* UI Elements */

  const formContainer = document.querySelector(".new-book-form");
  const formEl = document.querySelector(".new-book-form form");
  const booksEl = document.querySelector(".books");
  const newBookBtn = document.querySelector("#new-book");
  const cancelNewBookBtn = document.querySelector("#cancel-book");

  /* Logic */

  function Book(id, title, author, pageCount, completed = false) {
    // constructor
    this.id = id;
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.completed = completed;
  }

  Book.prototype.toggleCompleted = function () {
    this.completed = !this.completed;
  };

  function rawDataToLibrary(data) {
    for (let i = 0; i < data.length; i++) {
      let { id, title, author, pageCount, completed } = data[i];
      myLibrary.push(new Book(id, title, author, pageCount, completed));
    }
  }

  function addNewBookToLibrary(title, author, pageCount, completed) {
    myLibrary.push(new Book(idGenerator(), title, author, pageCount, completed));

    updateLocalStorage(myLibrary);
  }

  function removeBookFromLibrary(id) {
    myLibrary = myLibrary.filter((book) => book.id != id);
    updateLocalStorage(myLibrary);
  }

  function toggleCompletedBook(id) {
    myLibrary.filter((book) => book.id == id)[0].toggleCompleted();
    updateLocalStorage(myLibrary);
  }

  function idGenerator() {
    return Math.random().toString(36).substr(2, 8);
  }

  /* UI Functions */

  function displayLibrary() {
    booksEl.innerHTML = "";
    myLibrary.forEach((book) => {
      booksEl.append(createBookElement(book));
    });
  }

  function createBookElement(book) {
    //
    const bookEl = document.createElement("div");
    bookEl.classList.add("book");
    bookEl.dataset.id = book.id;

    ["title", "author", "pageCount", "completed", "delete"].forEach((prop) => {
      const el = document.createElement("div");
      el.classList.add(prop);

      const label = document.createElement("span");
      label.classList.add("label");

      if (prop == "completed") {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = book[prop];
        el.append(checkbox);

        label.textContent = "have read : ";
        el.prepend(label);
      } else if (prop == "delete") {
        let delBtn = document.createElement("button");
        delBtn.classList.add("delete-book");
        delBtn.textContent = "x";
        el.append(delBtn);
      } else if (prop == "pageCount") {
        el.textContent = book[prop];
        label.textContent = "page count : ";
        el.prepend(label);
      } else {
        el.textContent = book[prop];

        label.textContent = prop + " : ";
        el.prepend(label);
      }

      bookEl.append(el);
    });

    return bookEl;
  }

  function getFormData() {
    return {
      title: formEl.querySelector("[name='title']").value,
      author: formEl.querySelector("[name='author']").value,
      pageCount: formEl.querySelector("[name='page-count']").value,
      completed: formEl.querySelector("[name='completed']").value == "yes",
    };
  }

  function clearForm() {
    formEl.querySelector("[name='title']").value = "";
    formEl.querySelector("[name='author']").value = "";
    formEl.querySelector("[name='page-count']").value = 200;
    formEl.querySelector("[value='yes']").checked = false;
    formEl.querySelector("[value='no']").checked = true;
  }

  /* Event Handlers */

  booksEl.addEventListener("click", (e) => {
    const targ = e.target;
    const parent = targ.parentElement;

    if (parent.classList.contains("completed")) {
      // clicked a checkbox
      // get data-id from parent book
      const id = parent.parentElement.dataset.id;
      toggleCompletedBook(id);
    } else if (parent.classList.contains("delete")) {
      // clicked a delete button
      const id = parent.parentElement.dataset.id;
      const book = myLibrary.filter((book) => book.id == id)[0];
      const confirmed = confirm(`Are you sure you want to delete "${book.title}" ?`);

      if (!confirmed) return;

      removeBookFromLibrary(id);
      // refresh display
      displayLibrary();
    }
  });

  newBookBtn.addEventListener("click", () => {
    // show form
    formContainer.style.display = "block";
  });

  cancelNewBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.style.display = "none";
    clearForm();
  });

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewBookToLibrary(...Object.values(getFormData()));
    displayLibrary();
    clearForm();
    formContainer.style.display = "none";
  });

  formContainer.addEventListener("click", (e) => {
    // hide the form but don't clear if clicked outside form element
    if (e.target.classList.contains("new-book-form")) {
      formContainer.style.display = "none";
    }
  });

  /* LOCAL STORAGE */

  function clearLocalStorage() {
    localStorage.clear();
  }

  function updateLocalStorage(library) {
    localStorage.setItem("simpleLibrary", JSON.stringify(library));
  }

  if (localStorage.getItem("simpleLibrary")) {
    let bookData = JSON.parse(localStorage.getItem("simpleLibrary"));
    rawDataToLibrary(bookData);
    displayLibrary();
  }

  /* FIREBASE STORAGE */
})();

/* 
To-Do's
-------
- Styling
- Animations

*/
