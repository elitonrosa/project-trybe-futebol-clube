import { ID, NewEntity } from '.';

export interface ICRUDReaderModel<T> {
  getAll(): Promise<T[]>;
  getById(id: ID): Promise<T>;
}

export interface ICRUDWriterModel<T> {
  create(data: NewEntity<T>): Promise<T>;
}
