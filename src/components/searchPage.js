import React from 'react';
import * as BooksAPI from '../BooksAPI'
import Book from './book';
import {Link} from 'react-router-dom';

class SearchPage extends React.Component {
	// Create a state for the search activities.
	state = {
		query:"",
		querriedBooks:[] // Holds the books from search results.
	}
	// Method to update the query.
	queryUpdate = (query) => {
		this.setState({
			query: query
		})
		this.queryResultsUpdate(query);
	}
	queryResultsUpdate = (query) => {
		if(query) {
			BooksAPI.search(query).then((querriedBooks) => {
				if(querriedBooks.error){
					this.setState({querriedBooks: []})
				}else {
					this.setState({querriedBooks})
				}
			})
		}else {
			this.setState({querriedBooks: []})
		}
	}
	render(){
		return(
			<div className="search-books">

				<div className="search-books-bar">

				  <Link to="/" className="close-search">Close</Link>

				  <div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title or author"
						value = {this.state.query}
						onChange={(e)=> this.queryUpdate(e.target.value)}
					/>
				  </div>

				</div>
				<div className="search-books-results">
					<ol className="books-grid">

						{
							this.state.querriedBooks.map(searchBook =>  {
								let shelf = "none";
							// Check for match between searched book and book from bookList(searchPageBooks).
							this.props.searchPageBooks.map(book => (
								book.id === searchBook.id ?
								shelf = book.shelf :
								""
							));

							return (
								<li key={searchBook.id}>
									<Book
										book={searchBook}
										moveBook = {this.props.moveBook}
										defaultShelf= {shelf}
									/>
							  </li>
							);
						})
					}

				</ol>
			</div>
       </div>
	  );
	}
}
export default SearchPage;