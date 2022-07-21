// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor
function UI() { }
//Add Book to List
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
}

//Show Alert with
UI.prototype.showAlert = function(messsage, className){
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
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)


}

// Delete Book
UI.prototype.deleteBook= function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear Fieldset
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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
        ui.addBookToList(book);

        // Show success alert
        ui.showAlert('Book Added', 'success');
        //Clear Fields
        ui.clearFields();
    }

    //Add book to list

    e.preventDefault();
})


//Event Listeners for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();

    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book removed', 'success');
    e.preventDefault(); 
})