"use client";

type Schema = {
  sessionId: string;
  tmpRespondentId: string;
};

type LocalStorageKey = keyof Schema;

const getItem = (key: LocalStorageKey) => localStorage.getItem(key);

const setItem = (key: LocalStorageKey, value: string) =>
  localStorage.setItem(key, value);

export default {
  getItem,
  setItem,
};
