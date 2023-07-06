import { ID, NewEntity } from '.';

export interface ICRUDReaderModel<T> {
  getAll(): Promise<T[]>;
  getById(id: ID): Promise<T | null>;
}

export interface ICRUDWriterModel<T> {
  create(data: NewEntity<T>): Promise<T>;
}

export interface ICRUDUpdaterModel<T> {
  update(id: ID, data: Partial<T>): Promise<boolean>;
}
