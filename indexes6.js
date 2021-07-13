console.log("this is ES6");

class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
  add(book) {
    console.log("Adding to the Library");
    let tableBody = document.getElementById("tableBody");
    let uiString = `
        <tr>
                  <td>${book.name}</td>
                  <td>${book.author}</td>
                  <td>${book.type}</td>
        </tr>`;
    tableBody.innerHTML += uiString;
  }

  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  validate(book) {
    if (book.name.length < 3 || book.author.length < 3) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    // alert popup from bootstrap
    let message = document.getElementById("message");
    message.innerHTML = `
                        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message: </strong>${displayMessage} 
                        
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    setTimeout(function () {
      message.innerHTML = "";
    }, 5000);
  }
}

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();
  console.log("You've submitted the form");

  let name = document.getElementById("bookname").value;
  let author = document.getElementById("author").value;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  let type;

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Congrats! Your book has been successfully added.");
  } else {
    display.show(
      "danger",
      "Sorry, you can't add this book. Please enter valid book or author name"
    );
  }
}
