
import crypto from 'crypto-js';

export const seed = "bnLlmevOLmVJSZenecaowhytdcnKOtQc";

export const encrypt = (data: string, password = seed) => crypto.AES.encrypt(data, password).toString();
export const decrypt = (data: string, password = seed) => {
  try {
    return crypto.AES.decrypt(data, password).toString(crypto.enc.Utf8);
  } catch {
    throw Error("wrong password");
  }
}


// // symmetric key generation function
// const generateKey = async (): Promise<CryptoKey> => await window.crypto.subtle.generateKey({name: 'AES-GCM', length: 256, }, true, ['encrypt', 'decrypt']);
//
// const generateIv = (): Uint8Array => window.crypto.getRandomValues(new Uint8Array(16));
//
// const encode = (data: string): Uint8Array => new TextEncoder().encode(data);
// const decode = (data: Uint8Array): string => new TextDecoder().decode(data);
//
// const encrypt = async (data, key) => {
//
//   const encoded = encode(data);
//   const iv = generateIv();
//   const cipher = await window.crypto.subtle.encrypt({name: 'AES-GCM', iv}, key, encoded);
//
//   return { cipher, iv };
// }
//
// const decrypt = async (cipher, key, iv) => {
//   const encoded = await window.crypto.subtle.decrypt({
//       name: 'AES-GCM',
//       iv
//   }, key, cipher);
//
//   return decode(encoded);
// }
//
// const pack = (buffer: ArrayBuffer | Uint8Array): string => window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
//
// const unpack = (packed: string): Uint8Array => {
//
//   const string = window.atob(packed);
//   const buffer = new ArrayBuffer(string.length);
//   const bufferView = new Uint8Array(buffer);
//
//   for (let i = 0; i < string.length; i++) {
//     bufferView[i] = string.charCodeAt(i);
//   }
//
//   return bufferView;
// }
//
// export default {
//   generateKey,
//   generateIv,
//   encrypt,
//   decrypt,
//   pack,
//   unpack
// }
