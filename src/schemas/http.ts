export type HttpResponse<T> = {
  data: T;
  status: number;
  error?: string;
};
