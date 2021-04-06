import React from 'react';
import Rating from '../Rating/Rating';
import config from '../config';
import BookmarksContext from '../BookmarksContext';
import './BookmarkItem.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function deleteBookmarkRequest(bookmarkId, callback, history) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(bookmarkId)
      history.push('/')
    })
    .catch(error => {
      console.error(error)
    })
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context) => (
      <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <button
          className='BookmarkItem__description'
          onClick={() => {
            deleteBookmarkRequest(
              props.id,
              context.deleteBookmark,
              props.history
            )
          }}
        >
          Delete
        </button>
        <button
          className='BookmarkItem__description'>
            <Link to={`/edit-bookmark/${props.id}`}>
            Edit
            </Link>
        </button>
      </div>
    </li>
  )}
  </BookmarksContext.Consumer>
  )
}

BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string
};

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
  rating: 1,
  description: ""
}
