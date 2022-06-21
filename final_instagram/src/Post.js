import React, {useState,useEffect} from 'react';
import './Post.css';
import Avatar from '@mui/material/Avatar';
import {db} from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

function Post({ postId, user, username, caption, imageUrl}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }
  const postLike = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection('likes').add({
      username: user.displayName,
    });
    setLikes('');
  }

  return (
    <div className='post'>
        <div className='post_header'>
            <Avatar
                className='post_avatar'
                alt='Remy Sharp'
                src="/static/images/avatar/1.jpg"
            />
            <h2>{username}</h2>
        </div>

        <img className='post_image' src={imageUrl} alt=""/>

        <div className='showlike'>
          <button onClick={postLike}>like</button>
          <p>{likes.length} likes</p>
        </div>

        <h4 className='post_text'><strong>{username} </strong>{caption}</h4>

        <div className='post_comments'>
          {comments.map((comment) => (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}
        </div>

        {user && (
          <form className='post_commentBox'>
            <input 
              className='post_input'
              type='text'
              placeholder='Add a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className='post_button'
              disabled={!comment}
              type='submit'
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )}

        
    </div>
  );
}

export default Post;
