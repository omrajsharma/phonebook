import { RootState } from '../store';

export const selectThemeDarkMode = (state: RootState) => state.theme.darkMode;
