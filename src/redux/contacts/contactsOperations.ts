import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contact } from './contactsTypes';
import { AsyncThunkConfig } from '../commonTypes';

export const fetchContacts = createAsyncThunk<Contact[], undefined, AsyncThunkConfig>(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data }: AxiosResponse<Contact[]> = await axios('/contacts');
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Fetch all contacts failed';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

export const addContact = createAsyncThunk<Contact, Omit<Contact, 'id'>, AsyncThunkConfig>(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const { data }: AxiosResponse<Contact> = await axios.post('/contacts', newContact);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Add contact failed';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

export const deleteContact = createAsyncThunk<Contact, string, AsyncThunkConfig>(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const { data }: AxiosResponse<Contact> = await axios.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Delete contact failed';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

export const updateContact = createAsyncThunk<Contact, Contact, AsyncThunkConfig>(
  'contacts/updateContact',
  async ({ id, name, number }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/contacts/${id}`, { name, number });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Update contact failed';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);
