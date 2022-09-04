
import browser from "webextension-polyfill";
import { onMessage } from 'webext-bridge';

let password;
let privateKey;

browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

onMessage('setPassword', ({data}) => {
  password = data;
})

onMessage('getPassword', () => {
  return password;
})

onMessage('setCredentials', ({data}) => {
  password = data.password;
  privateKey = data.privateKey;
})
onMessage('getCredentials', () => {
  return { password, privateKey };
})
