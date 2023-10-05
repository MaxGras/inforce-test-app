
import { useState } from 'react'
import { selectAllProductComments, addComment } from './commentsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CommentItem } from './CommentItem';
import { v4 as uuidv4 } from 'uuid';
export default function CommentCard({ id }: { id: string | number }) {

  const [commentField, setCommentField] = useState('');
  const comments = useAppSelector((state) => selectAllProductComments(state, id));
  const dispatch = useAppDispatch();

  const commentsList = comments.map((comment) => {
    return <CommentItem key={comment.id} {...comment} />;
  });

  function handleAddComment() {
    if (commentField.trim() === '') return;

    const newComment = {
      id: uuidv4(),
      productId: id,
      description: commentField.trim(),
      date: getCurrentDate(),
    };

    dispatch(addComment(newComment));
    setCommentField('');
  }

  return (
    <div className="productPage__comments">
      <div className="productPage__comments__list">{commentsList}</div>
      <div className="productPage__comments__newComment">
        <textarea
          value={commentField}
          onChange={(e) => setCommentField(e.target.value)}
          placeholder="write your comment"
          rows={5}
        />
        <button onClick={handleAddComment}>add</button>
      </div>
    </div>
  )
}
function getCurrentDate() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}