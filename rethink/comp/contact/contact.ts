export type ContactStatus = 'online' | 'away' | 'offline'

export interface Contact {
  id: string
  name: string
  status: ContactStatus
  avatar: string
  unread?: number
  email: string
}
