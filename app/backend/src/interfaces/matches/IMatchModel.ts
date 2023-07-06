import {
  ICRUDReaderModel,
  ICRUDUpdaterModel,
  ICRUDWriterModel,
} from '../ICRUDModel';
import IMatch from './IMatch';

export type IMatchModel = ICRUDReaderModel<IMatch> &
ICRUDUpdaterModel<IMatch> &
ICRUDWriterModel<IMatch> & {
  getAllByProgess(inProgress: boolean): Promise<IMatch[]>;
};
