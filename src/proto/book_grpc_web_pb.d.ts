import * as grpcWeb from 'grpc-web';

import * as book_pb from './book_pb';


export class BookItClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  readBook(
    request: book_pb.ReadBookRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: book_pb.ReadBookResponse) => void
  ): grpcWeb.ClientReadableStream<book_pb.ReadBookResponse>;

  listBook(
    request: book_pb.GetAllRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: book_pb.GetAllResponse) => void
  ): grpcWeb.ClientReadableStream<book_pb.GetAllResponse>;

  updateBook(
    request: book_pb.UpdateBookRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: book_pb.UpdateBookResponse) => void
  ): grpcWeb.ClientReadableStream<book_pb.UpdateBookResponse>;

}

export class BookItPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  readBook(
    request: book_pb.ReadBookRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<book_pb.ReadBookResponse>;

  listBook(
    request: book_pb.GetAllRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<book_pb.GetAllResponse>;

  updateBook(
    request: book_pb.UpdateBookRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<book_pb.UpdateBookResponse>;

}

