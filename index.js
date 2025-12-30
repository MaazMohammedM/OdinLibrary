const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".dialogBtn");
const closeButton = document.querySelector("dialog button");
let container = document.querySelector('.container');
let form = document.querySelector("dialog form");
let titleError = document.getElementById('#titleError');

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
form.addEventListener('submit', function (e) {
    e.preventDefault()

    let title = document.getElementById('title').value.trim();
    let author = document.getElementById('author').value.trim();
    let numberOfPages = +document.getElementById('pages').value;
    let readingStatus = document.querySelector('input[name = "readingStatus"]:checked').value;

    console.log(readingStatus)

    addBookToLibrary(title, author, numberOfPages, readingStatus);
    form.reset();
    dialog.close();
    render();
  
})





function render() {
    container.innerHTML = '';

    myLibrary.forEach(book => {
         createCard(book);
    })
    console.log(myLibrary)
}



function createCard(book){
        const card = document.createElement('div');
        card.dataset.id = book.id;
        card.classList.add('card');
        let iconHolder = document.createElement('div');
        iconHolder.classList.add('iconHolder');
        let readBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        iconHolder.append(readBtn);
        iconHolder.append(deleteBtn);
        readBtn.classList.add('readBtn');
        deleteBtn.classList.add('deleteBtn');

        let title = document.createElement('p');
        title.classList.add('title');
        let author = document.createElement('p');
        author.classList.add('author');
        let pages = document.createElement('p');
        pages.classList.add('pages');
        card.append(iconHolder);
        card.append(title);
        card.append(author);
        card.append(pages);
        title.innerText = `${book.title}`;
        author.innerText = `${book.author}`;
        pages.innerText = `${book.pages} Pages`;
        readBtn.innerText = `${book.read === true ? '✅' : '❌'}`;
        deleteBtn.innerText = '🗑️';
        readBtn.addEventListener('click', function () {
            book.toggleRead();
            readBtn.innerText = `${book.read === true ?  '✅' : '❌'}`;
        })

        deleteBtn.addEventListener('click',function(e){
         let index = myLibrary.findIndex(item=>item.id === book.id);
         console.log(index)
         if(index !== -1){
            myLibrary.splice(index,1);
            render()
         }
        })
        
         container.appendChild(card)
}




