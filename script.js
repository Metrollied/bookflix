const libraryArea = document.getElementById('library');
document.getElementById('submit').addEventListener('click', addBookToLibrary);
document.getElementById('deleteAll').addEventListener('click', reset);

let library = JSON.parse(sessionStorage.getItem("storedLibrary"));
if (sessionStorage.getItem("storedLibrary")) {
    console.log("True")
    library.forEach(function (arrayItem) {
        displayBook(arrayItem)
    } )
}
else {
    console.log("False")
    library = [];
    
    sessionStorage.setItem("storedLibrary", JSON.stringify(library))
    

}



function reset() {
    sessionStorage.clear()
    library = []
    sessionStorage.setItem("storedLibrary", JSON.stringify(library))
    function removeLibrary() {
        while (libraryArea.firstChild) {
            libraryArea.removeChild(libraryArea.firstChild);
        }
    }
    removeLibrary();

}

function Book(id, title, author, pages, read) {
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}





function unRead(e) {
    library.forEach(function (arrayItem) {
        if (e.target.classList.item(0) == arrayItem.id) {
            if (arrayItem.read) {
                arrayItem.read = false;
                e.target.innerHTML = 'Not Read';
                e.target.classList.remove("read");
                e.target.classList.add("unRead")
            }
            else {
                arrayItem.read = true;
                e.target.innerHTML = 'Read';
                e.target.classList.remove("unRead");
                e.target.classList.add("read");
            }
        }
    })
    sessionStorage.setItem("storedLibrary", JSON.stringify(library))
}

function remove(e) {
    console.log(e.target.classList.item(0))
    document.getElementById("book" + e.target.classList.item(0)).remove();
    a = library.findIndex(x => x.id == e.target.classList.item(0));
    console.log(a)
    library.splice(a, 1)
    sessionStorage.setItem("storedLibrary", JSON.stringify(library))
}


function addBookToLibrary(e) {
    e.preventDefault();
    y = Date.now();
    let book = new Book(y, document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, document.getElementById('read').checked)
    library.push(book);
    displayBook(book);
}



function displayBook(arrayItem) {
    if (arrayItem.read) {
        x = 'Read';
    }
    else {
        x = 'Not Read';
    }
    const bookDisplay = document.createElement('div');
    bookDisplay.classList.add('book');
    bookDisplay.setAttribute("id", "book" + arrayItem.id);
    bookDisplay.innerHTML = ('"' + arrayItem.title + '"' + "<br>" + arrayItem.author + "<br>" + arrayItem.pages + " pages" + "<br>")
    let btn1 = document.createElement("button");
    btn1.innerHTML = "Delete";
    btn1.classList.add(arrayItem.id, "delete");
    btn1.onclick = remove;
    let btn2 = document.createElement("div");
    btn2.innerHTML = x;
    if (x === 'Read') {
        btn2.classList.add(arrayItem.id, "read");
    }
    else if (x === 'Not Read') {
        btn2.classList.add(arrayItem.id, "unRead")
    }
    btn2.onclick = unRead;
    libraryArea.appendChild(bookDisplay);
    bookDisplay.appendChild(btn2);
    bookDisplay.appendChild(btn1);
    sessionStorage.setItem("storedLibrary", JSON.stringify(library))
}
