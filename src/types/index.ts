export type EnsInfo = {
  name: string | null;
  avatar: string | null;
};

export type SignedMessage = {
  message: string;
  signature: string;
  address: string;
};
