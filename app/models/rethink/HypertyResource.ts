export interface HypertyResource {
  type: HypertyResourceType;
  direction?: HypertyResourceDirection;
  mimetype?: string;
  author?: string;
  content?: any;
  contentURL?: string;
  preview?: any;
  size?: number;
  player?: string;
}

export enum HypertyResourceType {
  Chat = <any>'chat',
  Audio = <any>'audio',
  Video = <any>'video',
  AV = <any>'av',
  Screen = <any>'screen',
  File = <any>'file',
  MIDI = <any>'midi',
  ActivityContext = <any>'activity_context',
  AvailabilityContext = <any>'availability_context',
  LocationContext = <any>'location_context',
  HeartRateContext = <any>'heart_rate_context',
  UserStepsContext = <any>'user_steps_context',
  BatteryContext = <any>'battery_context',
  SleepContext = <any>'sleep_context',
  LightContext = <any>'light_context',
  HumidityContext = <any>'humidity_context',
  Power = <any>'power',
  UserActivityContext = <any>'user_activity_context',
  UserCommunicationContext = <any>'user_communication_context'
}

export enum HypertyResourceDirection {
  IN = <any>'in',
  OUT = <any>'out',
  IN_OUT = <any>'inout'
}
