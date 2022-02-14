type Option =
  | {
      id: number;
      value: string;
      meta?: Object | string | number
    }
  | undefined;

export default Option;
