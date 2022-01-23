declare module '*.scss' {
  const classes: {
    [name: string]: string;
  };
  export default classes;
}

interface QueryResult<T> {
  data: T | null,
  loading: boolean,
  isDataReachEnd: boolean,
}
