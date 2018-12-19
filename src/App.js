import React from 'react'
import HomePage from './components/homePage';
import SearchPage from './components/searchPage';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  // To fill the shelves with books we need a state.
  state = {
	  booksList : [] // List of books fetched.
  }
  // Then,the componentDidMont method will be use to rendered the books in the shelves.
  componentDidMount() {
	  BooksAPI.getAll().then((booksList) => {
		  this.setState({booksList})
	  })
  }
  // To move the books between shelves,a moveBook method is required;
  moveBook = (book, shelf) => {
	  BooksAPI.update(book, shelf);

	  BooksAPI.getAll().then((booksList) => {
		  this.setState({booksList})
	  })
  }
  render() {
    return (
      <div className="app">

		  <Route exact path="/" // Navigate back to home page.
          render={() =>(
            <HomePage
    					homePageBooks={this.state.booksList} // This avails the fetched books to the homepage.
    					moveBook={this.moveBook} // This avails the moveBook method to the other components.
    				/>
          )}
      />
      <Route exact path={"/search"} // Navigate back to the search page.
          render={() =>(
              <SearchPage
					    moveBook={this.moveBook}
					    searchPageBooks={this.state.booksList} // This avails the fetched books to the searchpage.
				  />
         )}
      />
    </div>
    )
  }
}
export default BooksApp;
