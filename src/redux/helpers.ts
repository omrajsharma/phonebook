import { AnyAction } from '@reduxjs/toolkit';

export const isError = (action: AnyAction): boolean => {
  return action.type.endsWith('rejected');
};
