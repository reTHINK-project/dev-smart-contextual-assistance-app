import { Contact } from '../contact/contact';

export type ActivityType = 'message' | 'audio-call' | 'audio-call-failed' | 'video-call' | 'video-call-failed' | 'file-share'

export interface Activity {
  contact: Contact
  type: ActivityType
  date: string
  message?: string
  duration?: number
}
