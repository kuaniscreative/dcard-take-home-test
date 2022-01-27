import { useCallback, useEffect, useRef } from 'react';
import { usePostsQuery } from '@@core/post/usePostsQuery';
import PostList from '@@core/post/components/PostList/PostList';
import PostListItem from '@@core/post/components/PostListItem/PostListItem';
import Icon from '@@ui/components/Icon/Icon';
import { SpinnerIcon } from '@@icons/spinner';
import classes from './home.scss';

function Home() {
  const { 
    posts,
    loading,
    fetchMore,
    isDataReachEnd,
  } = usePostsQuery();

  
  /** Infinite scroll  */
  const anchorRef = useRef<HTMLDivElement>(null);
  const onIntersect: IntersectionObserverCallback = useCallback((entries) => {    
    const shouldDisableFetchMore = !posts?.length || loading || isDataReachEnd;

    if (entries[0].isIntersecting && !shouldDisableFetchMore) {
      fetchMore();
    }
  }, [fetchMore, isDataReachEnd, loading, posts?.length]);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      threshold: 1,
    };

    const observer = new IntersectionObserver(
      onIntersect,
      options,
    );

    if (anchorRef.current) {
      observer.observe(anchorRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onIntersect]);  

  return (
    <div className={classes.root}>
      <PostList>
        {posts?.map(({
          id, 
          title, 
          excerpt,
        }) => {
          return (
            <PostListItem 
              key={id}
              title={title}
              body={excerpt}/>
          );
        })}
        {loading ? (
          <div className={classes['spinner-container']}>
            <Icon 
              className={classes.spinner}
              icon={SpinnerIcon} 
              spin />
          </div>
        ) : null}
        <div ref={anchorRef} />
      </PostList>
    </div>
  );
}

export default Home;
