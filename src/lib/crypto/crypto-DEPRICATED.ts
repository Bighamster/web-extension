export type EncryptedData<T> = {
  key: CryptoKey;
  iv: Uint8Array;
  data: T;
};

export async function encrypt<T = string>(text: string): Promise<EncryptedData<T>> {
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const key = window.crypto.getRandomValues(new Uint8Array(16));
  const data = new TextEncoder().encode(text);

  const keyEncode = await crypto.subtle.importKey('raw', key.buffer, 'AES-CTR', true, ['encrypt', 'decrypt']);
  return {
    key: keyEncode,
    iv,
    data: await window.crypto.subtle.encrypt(getAlgorithm(iv), keyEncode, data),
  };
}

export async function decode<T extends string>(encodedData: EncryptedData<T>): Promise<T> {
  return await window.crypto.subtle.decrypt(
    getAlgorithm(encodedData.iv),
    encodedData.key,
    new TextEncoder().encode(encodedData.data)
  );
}

export function getAlgorithm(iv: Uint8Array) {
  return {
    name: 'AES-CTR',
    counter: iv,
    length: 128,
  };
}
