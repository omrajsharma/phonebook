export type Contact = {
  id: string;
  name: string;
  number: string;
};

export type OptionalContact = Partial<Pick<Contact, 'name' | 'number'>>;

export type ContactsState = {
  items: Contact[];
  isLoading: boolean;
  error: null | string;
};
