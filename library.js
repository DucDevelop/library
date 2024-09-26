const myLibrary = [new Book('Hello', 'JR', 100, true), new Book('Bye', 'RR', 180, false)];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    this.info = function() {
      return `${this.title}, ${this.author}, ${this.pages}, ${this.read ? "read" : "not read yet"}`;
    };

    this.toggleRead = function() {
        this.read = !this.read;
    }
}
  

function addBookToLibrary(book) {
    myLibrary.push(book);
}


function renderBooksAll() {
    const container = document.querySelector('.book-container');

    myLibrary.forEach((book, idx) => {
        container.appendChild(renderBook(book, idx))
    });
}

function renderBook(book, idx) {

    const bookDiv = document.createElement("div");
    const author = document.createElement("p");
    const title = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const toggleReadBtn = document.createElement("button");

    bookDiv.setAttribute("class", 'book');
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(read);
    bookDiv.appendChild(deleteBtn);
    bookDiv.appendChild(toggleReadBtn);


    author.textContent = "Author: " + book.author;
    title.textContent = "Title: " + book.title;
    pages.textContent = "Pages: " + book.pages;
    read.textContent = "Read: " + book.read;


    deleteBtn.setAttribute("data-idx", idx);
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', (event) => {
        myLibrary.splice(event.target.getAttribute("data-idx"), 1);
        clearDisplay();
        renderBooksAll();
    });


    toggleReadBtn.setAttribute("data-idx", idx);
    toggleReadBtn.textContent = book.read ? "Not read" : "Read";
    toggleReadBtn.addEventListener('click', (event) => {
        myLibrary[event.target.getAttribute("data-idx")].toggleRead();
        clearDisplay();
        renderBooksAll();
    });

    return bookDiv;
}

function clearDisplay() {
    const container = document.querySelector('.book-container');
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }

}

document.querySelector('button[type="submit"]').addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');

    const newBook = new Book(title.value, author.value, pages.value, read.checked)
    addBookToLibrary(newBook);
    clearDisplay();
    renderBooksAll();

    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
})


renderBooksAll();