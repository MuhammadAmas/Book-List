class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {
    addBookToList(book) {
      const list = document.getElementById('book-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
      `;
    
      list.appendChild(row);
    }

    showAlert(message, className) {
        //Create div 
        const div = document.createElement('div');
        // Add classes to
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode('message'));
        // Get Parent
        const container = document.querySelector('.container');

        const form = document.querySelector('#book-form')

        // Inser Alert
        container.insertBefore(div, form);

        //Timeout After 
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//Local Storage Class
class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //add book to ui
            ui.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn, index){
        const books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get Form Values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
    
    const book = new Book(title, author, isbn);

    const ui = new UI();

    //validate
    if (book === '' || author === '' || isbn === ''){
        // Error alert
        
    ui.showAlert('Please fill in all fields', 'error');
    }else{
        //add book to list
        ui.addBookToList(book);

        //add to local Storage
        Store.addBook(book);

        // Show success alert
        ui.showAlert('Book Added', 'success');
        //Clear Fields
        ui.clearFields();
    }

    e.preventDefault();
})


//Event Listeners for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();

    ui.deleteBook(e.target);

    //Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show message
    ui.showAlert('Book removed', 'success');
    e.preventDefault(); 
})