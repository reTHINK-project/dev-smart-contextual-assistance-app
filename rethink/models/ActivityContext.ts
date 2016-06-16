import { HypertyResource } from './HypertyResource';

export interface ActivityContext {
  id: string
  type: string
  values: TimeActivity[]
  description?: string
  time?: Date
  tag?: string
  children?: ActivityRequests[]
  childUrls: URL
}

interface ActivityRequests {
  parent: ActivityContext
  listner: ActivityRequests
  type: ActivityRequest
}

interface ActivityRequest {
  id: string
  type: HypertyResource
  values: TimeActivity[]
  description?: string
  time?: Date
  tag?: string
}

export interface TimeActivity {
  name: string
  unit: string
  value: number
  sum: number
  time?: Date
  updateTime?: Date
  expires?: Date
  address?: string
}
