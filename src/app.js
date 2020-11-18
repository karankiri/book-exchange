import Book from './book';

export default class App {
  constructor({initialBooks = []}) {
    this.books = initialBooks.map((bookData) => {
      return new Book({
        lender: bookData.lender,
        title: bookData.title,
        author: bookData.author
      })
    })
    this.currentUser = null;
  }

  addNewBook({ lender, title, author}) {
    this.books.push( new Book({
      lender,
      title,
      author
    }))
  }

  updatedBooksRender() {
    document.getElementById('table-body').innerHTML = this.books.map((item, index) => item.render({username: this.currentUser, index: index}))
    this.books.map((item) => item.attachEvents())
  }

  loginUser() {
    const username = document.getElementById("username").value;
    console.log(username);
    this.currentUser = username
    this.updatedBooksRender()

  }

  render() {
    return (
      `<div>
        <header>
          <div>Book Club</div>
          <div>
            <input type='string' placeholder='Enter username' id='username' />
            <Button id='loginUserBtn'>
              Submit
            </Button>
          </div>
        </header>
        <main>
          <div>
            <table>
              <thead>
                <th>Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Lender</th>
                <th>Borrower</th>
                <th>Action</th>
              </thead>
              <tbody id='table-body'>
                ${this.books.map((item, index) => item.render({username: this.currentUser, index: index}))}
              </tbody>
            </table>
          </div>
        </main>
      </div>`
    )
  }
  
  attachEvents() {
    document.getElementById('loginUserBtn').addEventListener('click', this.loginUser.bind(this))
  }
}