import { ReactNode } from 'react';
import classes from './postList.scss';

export interface PostListProps {
  children?: ReactNode
}

function PostList(props: PostListProps) {
  const {
    children,
  } = props;

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}

export default PostList;
