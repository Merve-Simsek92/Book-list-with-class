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
     td.innerText='<a href="# class="delete">X</a>';
     row.appendChild(td)

    list.appendChild(row);

    }
    clearFields(){
        document.getElementById("title")=""
        document.getElementById("author")=""
        document.getElementById("isbn")=""
    }


    deleteBook(target){
        if(target.className==="delete"){
            target.parentElement.parentElement.remove();
            return true;
        }return false;
    }

}
class Store{
    static getBooks(){
        let books;
        books=localStorage.getItem("books")===null ? [] : JSON.parse(localStorage.getItem("books"));
        return books;

    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach(function(book) {
            const ui=new UI();
            ui.addBookList(book)

        });
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn===isbn) books.splice(index,1);
        });
        localStorage.setItem("books",JSON.stringify(books))
    }
}
document.getElementById("form-book").addEventListener("submit",function(e){
    e.preventDefault();
    const title=document.getElementById("title").value;
    const author=document.getElementById("author").value;
    const isbn=document.getElementById("isbn").value;
    const book=new Book(title,author,isbn);

    const ui=new UI();

    if(title==="" || author==="" || isbn===""){
        alert("Fields can not be empty","error");
    }else{
        ui.addBookList(book);
        Store.addBook(book);
        ui.clearFields();
    }
});

document.getElementById("bok-list").addEventListener("click",function(e){
    const ui=new UI();
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    const isDeleted =ui.deleteBook(e.target);

});
document.addEventListener('DOMContentLoaded', Store.displayBooks);