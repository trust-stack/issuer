export type EncryptionPayload = {
  cipherText: string;
  iv: string;
  tag: string;
  key: string;
};

// TODO: replace with real encryption logic
export const encryptString = (input: string): EncryptionPayload => ({
  cipherText: input,
  iv: '',
  tag: '',
  key: '',
});
