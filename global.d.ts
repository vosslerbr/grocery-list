interface List {
  __v: number;
  _id: string;
  categories: any[]; // TODO - create interface for categories
  created_date: string;
  modified_date: string;
  owner: string;
  title: string;
}

interface SocketSuccessResponse {
  success: boolean;
  message: string;
  data: any;
}

interface SocketErrorResponse {
  success: boolean;
  message: string;
  err: any;
}

type SocketResponse = SocketErrorResponse | SocketSuccessResponse;
