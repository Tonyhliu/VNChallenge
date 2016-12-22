import React from 'react';
import ReactDOM from 'react-dom';
import BookActions from './actions/book_actions';
import BookStore from './store/book_store';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      books: [],
      sortBy: null,
      ready: false
    };

    this._bookChange = this._bookChange.bind(this);
  }

  componentWillMount() {
    this.bookListener = BookStore.addListener(this._bookChange);
    BookActions.fetchAllBooks();
  }

  componentWillUnmount() {
    this.bookListener.remove();
  }

  _bookChange() {
    this.setState({ books: BookStore.all() });
  }

  _sortByName() {
    var sortable = [],
        data = this.state.books,
        newObj = {};

    for (var genre in data) {
      sortable.push([genre, data[genre]]);
    }

    sortable.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      } else if (a[0] > b[0]) {
        return 1;
      } else {
        return 0;
      }
    });

    sortable.forEach(el => {
      newObj[el[0]] = el[1];
    });

    this.setState({ books: newObj,
      sortBy: 'name' });
  }

  _sortByNum() {
    var sortable = [],
        data = this.state.books,
        newObj = {};

    for (var genre in data) {
      sortable.push([genre, data[genre]]);
    }

    sortable.sort((a, b) => {
      return a[1] - b[1];
    });

    sortable.forEach(el => {
      newObj[el[0]] = el[1];
    });

    this.setState({ books: newObj,
                    sortBy: 'books' });
  }

  render() {
    if (this.state.sortBy === 'name') {
      $('#book').removeClass('selected');
      $('#name').addClass('selected');
    } else if (this.state.sortBy === 'books') {
      $('#name').removeClass('selected');
      $('#book').addClass('selected');
    }


    return(
      <div className='main-container'>
        <header className='header'>
          <h3 className='title'>Book Genres</h3>
          <ul className='header-ul'>
            <li>Sort By:</li>
            <li className='selector'
              id='name'
              onClick={this._sortByName.bind(this)}>Name</li>
            <li> | </li>
            <li className='selector'
                id='book'
                onClick={this._sortByNum.bind(this)}>Books</li>
          </ul>
        </header>

        <div className='books'>
          {Object.keys(this.state.books).map(genre => {
            let percentage = this.state.books[genre];
            const bbStyle = {
              width: `${percentage}%`,
              height: '100%',
              backgroundColor: '#6389cb'
            };
            return (
              <div className='genre-row'
                  key={genre}>
                <div className='genre'>{genre}</div>
                <div className='bar-graph'>
                  <div id='bluebar' style={bbStyle} />
                </div>
                <div className='number'>{this.state.books[genre]}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App/>, document.getElementById('root-element'));
});
