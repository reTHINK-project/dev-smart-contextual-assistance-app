import { Contact } from '../contact/contact';

export type ActivityStatus = 'ok' | 'failed'
export type ActivityType = 'message' | 'audio-call' | 'video-call' | 'file-share'

export interface Activity {
  contact: Contact
  type: ActivityType
  status: ActivityStatus
  date: string
  message?: string
  duration?: number
}
