import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import BookmarksContext from '../BookmarksContext';
import './BookmarkList.css'
import PropTypes from 'prop-types';

class BookmarkList extends Component {
  static contextType = BookmarksContext;

  render() {
    const { bookmarks } = this.context
    return (
      <section className='BookmarkList'>
        <h2>Your bookmarks</h2>
        <ul className='BookmarkList__list' aria-live='polite'>
          {bookmarks.map(bookmark =>
            <BookmarkItem
              key={bookmark.id}
              {...bookmark}
              history={this.props.history}
            />
          )}
        </ul>
      </section>
    );
  }
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.object)
};

export default BookmarkList;
