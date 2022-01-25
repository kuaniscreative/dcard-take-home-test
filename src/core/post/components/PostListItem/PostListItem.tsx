import TextControl from '@@ui/components/TextControl/TextControl';
import { ReactNode } from 'react';
import classes from './postListItem.scss';

export interface PostListItemProps {
  title: ReactNode;
  body: ReactNode;
}

function PostListItem(props: PostListItemProps) {
  const {
    title,
    body,
  } = props;

  return (
    <div className={classes.root}>
      <TextControl 
        component="h2"
        variant="h2"
        weight="semibold"
        className={classes.title}>
        {title}
      </TextControl>
      <TextControl 
        component="p"
        variant="body1"
        weight="medium"
        ellipsis>
        {body}
      </TextControl>
    </div>
  );
}

export default PostListItem;
