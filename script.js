// DOM get element
let x = document.getElementById("input-num");
let open = document.getElementById("myForm");
let openBtn = document.getElementById("open-form");
let doneBtn = document.getElementById("close-form");
let cancelBtn = document.getElementById("cancel");
let deleteBtn = document.getElementById("tableBtn");
let blurBg = document.getElementById("blur-screen");
let displayTb = document.getElementById("Tb");

// The Book Object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return title + " by " + author + ", " + pages + " pages, " + read;
    }
}

// Declare empty array
let myLibrary = [];

let bookToLibrary = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Not Read Yet');

myLibrary.push(bookToLibrary);

// Push new books into array
function addBookToLibrary() {
    bookToLibrary = new Book('Harry Potter', 'J. K. Rowling', '300', 'Read');
    myLibrary.push(bookToLibrary);

    bookToLibrary = new Book('Angels & Demons', 'Dan Brown', '768', 'Read');
    myLibrary.push(bookToLibrary);
}

addBookToLibrary();

// Open Form
function openForm() {
    open.classList.add("key-open");
    open.classList.remove("key-close");

    open.style.display = "block";
    openBtn.style.display = "none";

    blurBg.classList.add("blur");
}

// Done and close form
doneBtn.addEventListener("click", function (event) {
    event.preventDefault();
});

// Submit form and close it
function closeForm() {
    if (x.value >= 1) {
        open.classList.remove("key-open");
        open.classList.add("key-close");

        open.style.display = "none";
        openBtn.style.display = "block";

        blurBg.classList.remove("blur");
    }
}

// Cancel form and close it
function closeForm2() {
    open.classList.remove("key-open");
    open.classList.add("key-close");

    open.style.display = "none";
    openBtn.style.display = "block";

    blurBg.classList.remove("blur");
}

// Delete selected book
function deleteBook(index) {
    let dlt = index.parentNode.parentNode.rowIndex;
    displayTb.deleteRow(dlt);

    // Remove element from array without holes 
    myLibrary.splice(dlt - 1, 1);

    for (let i = 0; i < myLibrary.length; i++) {
        displayTb.deleteRow(1);
    }

    tableData();
}



// Display all books from array
function tableData() {

    for (let i = 0; i < myLibrary.length; i++) {
        let newRow = displayTb.insertRow();

        newRow.insertCell().textContent = i + 1;
        newRow.insertCell().textContent = myLibrary[i]['title'];
        newRow.insertCell().textContent = myLibrary[i]['author'];
        newRow.insertCell().textContent = myLibrary[i]['pages'];

        // Create select element
        let readSelect = document.createElement("SELECT");
        newRow.insertCell().appendChild(readSelect);
        readSelect.classList.add("form-select");

        // Create first option
        let readOption1 = document.createElement("OPTION");
        readOption1.classList.add("opt1");
        readSelect.appendChild(readOption1);

        // Set text of option according to object 
        readOption1.textContent = myLibrary[i]['read'];
        readOption1.setAttribute("selected", true);

        // Create second option
        let readOption2 = document.createElement("OPTION");
        readOption2.classList.add("opt2");
        readSelect.appendChild(readOption2);

        // Set the text of option opposite to the first option
        if (readOption1.textContent === "Read") {
            readOption2.textContent = "Not Read Yet";
            readOption1.value = "r";
            readOption2.value = "nry";
        }
        if (readOption1.textContent === "Not Read Yet") {
            readOption2.textContent = "Read";
            readOption1.value = "nry";
            readOption2.value = "r";

        }

        // If an option is chosen, update object
        readSelect.addEventListener("click", function () {
            if (readSelect.value == "nry") {
                myLibrary[i]['read'] = "Not Read Yet";
            } else if (readSelect.value == "r") {
                myLibrary[i]['read'] = "Read";
            }
        });

        // Delete Button
        let newBtn = document.createElement("BUTTON");
        let btnText = document.createTextNode("Delete");

        newBtn.appendChild(btnText);
        newBtn.classList.add("btn");
        newBtn.classList.add("btn-primary");
        newBtn.setAttribute("id", "tableBtn");
        newBtn.setAttribute("onclick", "deleteBook(this)");

        newRow.insertCell().appendChild(newBtn);
    }
}

tableData();




