import { RootState } from './store';
import { AppDispatch } from './store';

export type AsyncThunkConfig = {
  state: RootState;
  rejectValue: string;
  serializedErrorType: string;
  dispath: AppDispatch;
};
