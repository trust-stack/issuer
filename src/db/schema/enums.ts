export const keyTypeEnum = [
  "Ed25519",
  "Secp256k1",
  "Secp256r1",
  "X25519",
  "Bls12381G1",
  "Bls12381G2",
] as const;

export const encryptionAlgorithmEnum = ["AES_GCM"] as const;

export type KeyType = (typeof keyTypeEnum)[number];
export type EncryptionAlgorithm = (typeof encryptionAlgorithmEnum)[number];
