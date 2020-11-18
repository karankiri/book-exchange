import { RequestNextTimeoutInSeconds, BookActions } from './constants';

export default class Book {
  constructor({lender, title, author}) {
    this.lender = lender
    this.isBorrowed = false;
    this.borrowExpiry = null;
    this.borrower = null;
    this.title = title;
    this.author = author;
  }


  canBorrowBook({borrower}) {
    return Boolean(!this.isBorrowed && borrower !== this.lender)
  }

  borrow({borrower, timeInSeconds}) {
    if(this.canBorrowBook({borrower})) {
      this.borrower = borrower;
      this.isBorrowed = true;
      this.borrowExpiry = setTimeout(() => {
        this.returnBook({borrower})
      }, timeInSeconds * 1000); // convert seconds to MS
    }
  }

  canReturnBook({borrower}) {
    return this.isBorrowed && this.borrower === borrower
  }

  returnBook({ borrower}) {
    if(this.canReturnBook({borrower})) {
      this.isBorrowed = false;
      clearTimeout(this.borrowExpiry)
      if(this.nextBorrower) {
        this.isBorrowEnabledForNextBorrower = true
        setTimeout(() => {
          this.nextBorrower = null;
          this.isBorrowEnabledForNextBorrower = false;
        }, RequestNextTimeoutInSeconds * 1000);
      }
    }
  }

  canRequestNext({nextBorrower}) {
    return this.isBorrowed && this.lender !== nextBorrower && this.borrower !== nextBorrower
  }

  requestNext({ nextBorrower}) {
    if(this.canRequestNext({nextBorrower})) {
      this.nextBorrower = nextBorrower;
    }
  }

  getAction({username}) {
    if(!username) {
      return `<button class='action-btn' disabled>Borrow</button>`
    }
    if(this.canBorrowBook({borrower: username})) {
      this.action = BookActions.borrow
      return `<button class='action-btn ${this.title}'>Borrow</button>`
    }
    if(this.canRequestNext({nextBorrower: username})) {
      this.action = BookActions.requestNext
      return `<button class='action-btn ${this.title}'>Request Next</button>`
    }
    if(this.canReturnBook({borrower: username})) {
      this.action = BookActions.return
      return `<button class='action-btn ${this.title}'>Return</button>`
    }
    return '-'
  }

  performAction({username}) {
    console.log("Book -> performAction -> username", username)
    if(username && this.action) {
      switch(this.action) {
        case BookActions.borrow:
          this.borrow({borrower: username})
          break;
        case BookActions.return:
          this.returnBook({ })
      }
    }
    this.updateRow({username})
  }

  attachEvents() {
    const actionButton = document.getElementsByClassName(`.action-btn.${this.title}`);
    if(actionButton && actionButton[0]) {
      actionButton[0].addEventListener('click', this.performAction.bind(this))
    }
  }

  updateRow({username}) {
    const rowAction = document.getElementById(`table-row-${this.title} td.action`)
    console.log("Book -> updateRow -> rowAction", rowAction)
    if(rowAction && rowAction[0]) {
      rowAction[0].innerHtml = this.getAction({username})
    }
  }

  render({username, index}) {
    return (
      `<tr class='table-row-${this.title}'>
        <td>${index + 1}</td>
        <td>${this.title}</td>
        <td>${this.author}</td>
        <td>${this.lender}</td>
        <td>${this.borrower || '-'}</td>
        <td class='action'>${this.getAction({username: username})}</td>
      </tr>`
    )
  }

}