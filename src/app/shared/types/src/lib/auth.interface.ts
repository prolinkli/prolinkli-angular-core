export const LkUserAuthenticationMethods = {
  PASSWORD: 'INTERNAL',
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
  GITHUB: 'GITHUB',
  MICROSOFT: 'MICROSOFT',
  APPLE: 'APPLE',
}

export type LkUserAuthenticationMethod = keyof typeof LkUserAuthenticationMethods;

export interface GenericUserAuthenticationForm<T> {
  username: string;
  specialToken: string;
  parameters: T;
}

export type UserAuthenticationForm = GenericUserAuthenticationForm<{ [key: string]: string }>;
