(() => {
  let tempData = [
    { title: "Hello World!", author: "Billy The Kid", pageCount: 200, completed: false },
    { title: "Goodbye again", author: "Stevie Jones", pageCount: 220, completed: true },
  ];

  let myLibrary = [];

  // add tempData to library
  for (let i = 0; i < tempData.length; i++) {
    myLibrary.push(new Book(tempData[i].title, tempData[i].author));
  }

  function Book(title, author, pageCount, completed = false) {
    // constructor
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.completed = completed;
  }

  function addBookToLibrary() {
    //
  }

  function removeBookFromLibrary(id) {
    //
  }

  function toggleCompletedBook(id) {}

  /* UI Functions */

  function displayLibrary() {
    //
  }

  function createBookElement() {
    //
  }

  /* LOCAL STORAGE */
  /* FIREBASE STORAGE */
})();
