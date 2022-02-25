class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;

    }
}
class UI{
    addBookList(book){
        const list=document.getElementById("book-list");
        const row=document.createElement("tr");
        for(let item of Object.keys(book)){
            const td=document.createElement("td");
            td.innerHTML=book[item];
            row.appendChild(td);
        }
        const td=document.createElement("td");
        td.innerHTML=`<a href="#" class="delete>X</a>`;
        row.appendChild(td);


        list.appendChild(row);

    }
    clearFields(){
        document.getElementById("title").value=""
        document.getElementById("author").value=""
        document.getElementById("isbn").value=""
    }
   deleteBook(target){
       if(target.className==="delete"){

        target.parentElement.parentElement.remove();
        return true;
       }
       return false;
   } 
}
class Store{
    static getBooks(){
        let books;
        books=localStorage.getItem("books")=== null ? []
: JSON.parse(localStorage.getItem("books"));
return books;    }
}


static addBook(book){
    const books=Store.getBooks();
    books.push(book);
    localStorage.setItem("books",JSON.stringify(books));
}

static displayBooks(){
    const books=Store.getBooks();
    books.forEach(function(book) => {
        const ui=new UI();
        ui.addBookList(book);
        
    });
}