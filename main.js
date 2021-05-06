(() => {
  let myLibrary = [];
  let idCounter = 0;

  /* UI Elements */

  const formContainer = document.querySelector(".new-book-form");
  const formEl = document.querySelector(".new-book-form form");
  const newBookBtn = document.querySelector("#new-book");
  const saveNewBook = document.querySelector("#save-book");
  const cancelNewBook = document.querySelector("#cancel-book");

  /*  Dummy Data */
  let tempData = [
    { title: "Hello World!", author: "Billy The Kid", pageCount: 200, completed: false },
    { title: "Goodbye again", author: "Stevie Jones", pageCount: 220, completed: true },
  ];

  // add tempData to library
  for (let i = 0; i < tempData.length; i++) {
    let { title, author, pageCount, completed } = tempData[i];
    myLibrary.push(new Book(title, author, pageCount, completed));
    idCounter++;
  }

  /* Logic */

  function Book(title, author, pageCount, completed = false) {
    // constructor
    this.id = idCounter;
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.completed = completed;
  }

  Book.prototype.toggleCompleted = function () {
    this.completed = !this.completed;
  };

  function addNewBookToLibrary(title, author, pageCount, completed) {
    myLibrary.push(new Book(title, author, pageCount, completed));
    idCounter++;
    console.log(myLibrary);
  }

  function removeBookFromLibrary(id) {
    myLibrary = myLibrary.filter((book) => book.id != id);
    console.log(myLibrary);
  }

  function toggleCompletedBook(id) {
    myLibrary.filter((book) => book.id == id)[0].toggleCompleted();
  }

  /* UI Functions */

  function displayLibrary() {
    //
  }

  function createBookElement() {
    //
  }

  /* Event Handlers */

  /* LOCAL STORAGE */
  /* FIREBASE STORAGE */
})();
