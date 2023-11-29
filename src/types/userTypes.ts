export interface SubmitCredentials {
  email: string;
  number?: string;
  [key: string]: string | undefined;
}
export interface SubmitResponse {
  result: boolean;
  message: string;
  data: SubmitCredentials[] | null
}
