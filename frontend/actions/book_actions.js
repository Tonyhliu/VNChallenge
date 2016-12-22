import AppDispatcher from '../dispatcher/dispatcher';
import BookApiUtil from '../util/book_api_util';

const BookActions = {
  fetchAllBooks() {
    BookApiUtil.fetchAllBooks(this.receiveAllBooks);
  },

  receiveAllBooks(books) {
    AppDispatcher.dispatch({
      actionType: 'BOOKS_RECEIVED',
      books: books
    });
  }
};

export default BookActions;
