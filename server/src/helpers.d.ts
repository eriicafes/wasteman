export interface BcryptServiceInterface {
  hashPassword: (password: string) => string;
  comparePassword: (password: string, hash: string) => boolean;
}