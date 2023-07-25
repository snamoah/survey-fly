'use client';

type Schema = {
  email: string;
  sessionId: string;
  tmpRespondentId: string;
};

type LocalStorageKey = keyof Schema;

const getItem = (key: LocalStorageKey) => localStorage.getItem(key);

const setItem = (key: LocalStorageKey, value: string) =>
  localStorage.setItem(key, value);

const removeItem = (key: LocalStorageKey) => localStorage.removeItem(key);

const clientStorage = {
  getItem,
  setItem,
  removeItem,
};

export default clientStorage;
