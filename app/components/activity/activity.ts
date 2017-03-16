import { User } from '../../models/models';

export type ActivityStatus = 'ok' | 'failed'
export type ActivityType = 'message' | 'audio-call' | 'video-call' | 'file-share'

export interface Activity {
  contact: User
  type: ActivityType
  date: string

  message?: string
  status?: ActivityStatus
  duration?: number

  read?: boolean
  //data: Message | Call | File
}

/*
export interface Message {
  message: string
}

export interface Call {
  status: ActivityStatus
  duration: number
}

export interface File {

}
*/
