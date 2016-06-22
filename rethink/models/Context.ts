import { HypertyResource } from './HypertyResource';

export interface Context {
  id: string
  type: string
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
