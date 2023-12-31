import { Comment } from '../../app/types';
import { useAppDispatch } from '../../app/hooks';
import { removeComment } from './commentsSlice';
import './singleComment.scss';



export function CommentItem({ id, description, date }: Comment) {
  const dispatch = useAppDispatch();

  return (
    <div className='singleComment'>
      <p>{description}</p>
      <div className='singleComment__info'>
        <button onClick={() => dispatch(removeComment(id))}>X</button>
        <span>{date}</span>
      </div>
    </div>
  );
}
