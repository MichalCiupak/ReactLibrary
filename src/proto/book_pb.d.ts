import * as jspb from 'google-protobuf'

import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';


export class ReadBookRequest extends jspb.Message {
  getId(): number;
  setId(value: number): ReadBookRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadBookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ReadBookRequest): ReadBookRequest.AsObject;
  static serializeBinaryToWriter(message: ReadBookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadBookRequest;
  static deserializeBinaryFromReader(message: ReadBookRequest, reader: jspb.BinaryReader): ReadBookRequest;
}

export namespace ReadBookRequest {
  export type AsObject = {
    id: number,
  }
}

export class ReadBookResponse extends jspb.Message {
  getId(): number;
  setId(value: number): ReadBookResponse;

  getTitle(): string;
  setTitle(value: string): ReadBookResponse;

  getAuthor(): string;
  setAuthor(value: string): ReadBookResponse;

  getGenre(): string;
  setGenre(value: string): ReadBookResponse;

  getRating(): number;
  setRating(value: number): ReadBookResponse;

  getAvailability(): boolean;
  setAvailability(value: boolean): ReadBookResponse;

  getCurrentownerid(): number;
  setCurrentownerid(value: number): ReadBookResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadBookResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ReadBookResponse): ReadBookResponse.AsObject;
  static serializeBinaryToWriter(message: ReadBookResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadBookResponse;
  static deserializeBinaryFromReader(message: ReadBookResponse, reader: jspb.BinaryReader): ReadBookResponse;
}

export namespace ReadBookResponse {
  export type AsObject = {
    id: number,
    title: string,
    author: string,
    genre: string,
    rating: number,
    availability: boolean,
    currentownerid: number,
  }
}

export class GetAllRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllRequest): GetAllRequest.AsObject;
  static serializeBinaryToWriter(message: GetAllRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllRequest;
  static deserializeBinaryFromReader(message: GetAllRequest, reader: jspb.BinaryReader): GetAllRequest;
}

export namespace GetAllRequest {
  export type AsObject = {
  }
}

export class GetAllResponse extends jspb.Message {
  getBookList(): Array<ReadBookResponse>;
  setBookList(value: Array<ReadBookResponse>): GetAllResponse;
  clearBookList(): GetAllResponse;
  addBook(value?: ReadBookResponse, index?: number): ReadBookResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllResponse): GetAllResponse.AsObject;
  static serializeBinaryToWriter(message: GetAllResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllResponse;
  static deserializeBinaryFromReader(message: GetAllResponse, reader: jspb.BinaryReader): GetAllResponse;
}

export namespace GetAllResponse {
  export type AsObject = {
    bookList: Array<ReadBookResponse.AsObject>,
  }
}

export class UpdateBookRequest extends jspb.Message {
  getId(): number;
  setId(value: number): UpdateBookRequest;

  getCurrentownerid(): number;
  setCurrentownerid(value: number): UpdateBookRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateBookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateBookRequest): UpdateBookRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateBookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateBookRequest;
  static deserializeBinaryFromReader(message: UpdateBookRequest, reader: jspb.BinaryReader): UpdateBookRequest;
}

export namespace UpdateBookRequest {
  export type AsObject = {
    id: number,
    currentownerid: number,
  }
}

export class UpdateBookResponse extends jspb.Message {
  getId(): number;
  setId(value: number): UpdateBookResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateBookResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateBookResponse): UpdateBookResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateBookResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateBookResponse;
  static deserializeBinaryFromReader(message: UpdateBookResponse, reader: jspb.BinaryReader): UpdateBookResponse;
}

export namespace UpdateBookResponse {
  export type AsObject = {
    id: number,
  }
}

