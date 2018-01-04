export interface UserIdentity {
  guid: string;
  identifiers: string;
  email: string;
  name: string;
  picture: string;
  locale: string;
  userURL: string;

  idp: string;
  context?: string;

  isLegacy: boolean;
}
