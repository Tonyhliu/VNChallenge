import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
const BookStore = new Store(AppDispatcher);

let _books = {};

BookStore.all = function() {
  // let books = {};
  // console.log(_books);
  // Object.keys(_books).map(key => {
  //   books.push(_books[key]);
  // });

  return _books;
};

function resetAllBooks(books) {
  _books = {};
  _books = books;
}

BookStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case 'BOOKS_RECEIVED':
      resetAllBooks(payload.books);
      this.__emitChange();
      break;
    default:
  }
};

export default BookStore;
