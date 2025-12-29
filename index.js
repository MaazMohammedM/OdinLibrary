const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
let container = document.querySelector('.container');

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

let myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
}

Book.prototype.toggleRead = function () {
    if(this.read === true){
        this.read = false
    } else{
        this.read = true
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read))
}

let formSubmitBtn = document.querySelector('.formSubmitBtn');
formSubmitBtn.addEventListener('click', function (e) {
    e.preventDefault()

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let numberOfPages = +document.getElementById('pages').value;
    let readingStatus = !!document.querySelector('input[name = "readingStatus"]:checked').value;

    addBookToLibrary(title, author, numberOfPages, readingStatus);
    dialog.close();
    render();
  
})





function render() {
    container.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let read = document.createElement('p');
        let toggleBtn = document.createElement('button');
        card.append(title);
        card.append(author);
        card.append(pages);
        card.append(read);
        card.append(toggleBtn);
        title.innerText = `Title: ${book.title}`;
        author.innerText = `Author: ${book.author}`;
        pages.innerText = `Pages: ${book.pages}`;
        read.innerText = `Reading Status: ${book.read === true ? 'Read' : 'Not Read'}`;
        container.appendChild(card)
        toggleBtn.addEventListener('click', function () {
            book.toggleRead();
            toggleBtn.innerText = `${book.read === true ? 'Read' : 'Not Read'}`;
        })
         toggleBtn.innerText = `${book.read === true ? 'Read' : 'Not Read'}`;
    })
}

console.log(myLibrary)






