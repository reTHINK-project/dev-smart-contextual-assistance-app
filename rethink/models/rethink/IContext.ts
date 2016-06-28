export interface IContext {
  id: string
  type: string
  values: ITimeActivity[]
  description?: string
  time?: Date
  tag?: string
}

export interface ITimeActivity {
  name: string
  unit: string
  value: number
  sum: number
  time?: Date
  updateTime?: Date
  expires?: Date
  address?: string
}
