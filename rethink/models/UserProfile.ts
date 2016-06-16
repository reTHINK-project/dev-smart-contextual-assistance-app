export interface UserProfile {
  [index: string]: string | URL | number
  username: string
  cn: string
  avatar: URL
  locale: string
  userURL: URL
}
