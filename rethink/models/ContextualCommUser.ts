export interface ContextualCommUser {
  [index: string]: string | number
  username: string
  cn: string
  avatar: string
  locale: string
  userURL: string

  // optional
  status?: string
  unread?: number
}
