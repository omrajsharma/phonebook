import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filter/filterSelectors';
import { RootState } from '../store';

export const selectContacts = (state: RootState) => state.contacts.items;

export const selectIsLoading = (state: RootState) => state.contacts.isLoading;

export const selectError = (state: RootState) => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectFilter, selectContacts],
  (filter, contacts) => {
    const normalizeFilter = filter.trim().toLowerCase();

    return contacts.filter(contact => contact.name.trim().toLowerCase().includes(normalizeFilter));
  }
);
