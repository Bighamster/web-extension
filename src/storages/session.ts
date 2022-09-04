import { writable } from 'svelte/store';
import { encrypt, decrypt } from "~/lib/crypto";
import { sendMessage } from 'webext-bridge';

const expirationTime = 1*86400000; // 1 day in milliseconds

const createStore = () => {

  const store = writable('pending', () => () => clearInterval(interval));

  let password: string | undefined;
  let privateKey: string | undefined;
  let lastActivity = 0;

  const init = () => {

    sendMessage('getCredentials', '', 'background').then((data) => {

      password = data.password;
      privateKey = data.privateKey;

      const item = localStorage.getItem('lt');

      lastActivity = item ? Number(decrypt(item, password)) : 0;

      validate();

    });
  }

  const validate = () => {

    const currentTime = new Date().getTime();

    if( password && privateKey && currentTime - lastActivity <= expirationTime ) {
      store.update((v) => 'valid');
    } else {
      store.update((v) => 'invalid');
    }
  }

  const refresh = () => {

    if( password ) {

      lastActivity = new Date().getTime();
      localStorage.setItem('lt', encrypt(String(lastActivity), password));

    } else {

      localStorage.removeItem('lt')
    }
  }

  const login = (_password: string, _privateKey: string):void => {

    password = _password;
    privateKey = _privateKey;

    sendMessage('setCredentials', {password, privateKey}, 'background').then(() => {
      refresh();
      validate();
    });
  }

  const logout = ():void => {
    password = undefined;
    privateKey = undefined;
    refresh();
    validate();
  }

  const getPassword = (): string => password;
  const getPrivateKey = (): string => privateKey;

  init();

  const interval = setInterval(validate, 5000);

  return {
    subscribe: store.subscribe,
    refresh,
    login,
    logout,
    getPassword,
    getPrivateKey
  }
}

export const session = createStore();
