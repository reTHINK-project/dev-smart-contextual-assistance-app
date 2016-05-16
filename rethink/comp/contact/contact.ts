export type ContactStatus = 'online' | 'away' | 'offline'

export interface Contact {
  name: string
  status: ContactStatus
  avatar: string
  unread?: number
}
