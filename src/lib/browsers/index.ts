
import browser from 'webextension-polyfill';

export enum storageKeys {
  W_ENCRYPTOR = 'walletEncryptor',
  W_PRIVATE_KEY = 'walletPrivateKey',
}

export const saveToStorage = async (key: storageKeys, value: string): Promise<void> => {

  return await browser.storage.sync.set({[key]: value});
}

export const getInStorage = async (key: storageKeys): Promise<string> => {

  const value = await browser.storage.sync.get(key);

  return value[key];
}

export const currentUrl = async (): Promise<string | undefined> => {

  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  return tab.url;
}
