type Option =
  | {
      id: number;
      value: string | {start: string, end: string};
      meta?: Object | string | number;
    }
  | undefined;

export default Option;
