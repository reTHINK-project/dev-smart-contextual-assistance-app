export interface UserIdentity {
  guid: string;
  identifiers: string;
  username: string;
  cn: string;
  avatar: string;
  locale: string;
  userURL: string;

  idp: string;
  context?: string;
}
