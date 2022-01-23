import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Post } from './typings';

interface GetPostsParams {
  limit?: number,
  cursor?: number,
}

function getPosts(params?: GetPostsParams) {
  return axios.get<Post[]>('/api/posts', {
    params: {
      popular: true,
      limit: params?.limit || 10,
      before: params?.cursor,
    },
  });
}

function usePostsQuery() {
  const [queryResult, setQueryResult] = useState<QueryResult<Post[]>>({
    data: null,
    loading: false,
    isDataReachEnd: false,
  });

  const cursor = useRef<GetPostsParams['cursor']>();

  const fetch = useCallback((params?: GetPostsParams) => {
    if (!queryResult.isDataReachEnd) {
      const {
        limit,
        cursor: passedinCursor,
      } = params || {};

      setQueryResult(prevResult => ({
        ...prevResult,
        isLoading: true,
      }));

      getPosts({
        limit,
        cursor: passedinCursor,
      })
        .then((res) => {
          const { 
            data: newPosts, 
          } = res;

          const isDataReachEnd = !newPosts || !newPosts.length;

          setQueryResult(prevResult => ({
            data: prevResult.data ? [...prevResult.data, ...newPosts] : newPosts,
            loading: false,
            isDataReachEnd,
          }));

          const lastPost = newPosts[newPosts.length - 1];

          cursor.current = lastPost.id;
        });
    }
  }, [queryResult.isDataReachEnd]);

  function fetchMore(params?: GetPostsParams) {
    fetch({
      ...params,
      cursor: params?.cursor ?? cursor.current,
    });
  }
  
  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    posts: queryResult.data,
    loding: queryResult.loading,
    isDataReachEnd: queryResult.isDataReachEnd,
    fetchMore,
  };  
}

export type {
  GetPostsParams,
};

export {
  getPosts,
  usePostsQuery,
};
