import { HypertyResourceType } from './HypertyResource';

export interface Context {
  url: string;
  reporter: string;
  schema: string;
  name: string;
  scheme: string;
  id: string;
  values: ContextValue[];

  description ?: string;
  time?: Date;
  unit?: ContextUnit;
  version?: number;
  tag?: string;
  children ?: string[];
  childUrls ?: string[];
  address ?: string;
}

export interface ContextValue {
  name: ContextUnitName;
  value: any;
  type ?: HypertyResourceType;
  unit ?: ContextUnit;
  sum ?: ContextUnit;
  time ?: Date;
  updateTime ?: Date;
  expires ?: Date;
}

// TODO Apply the Actions and Action Interfaces
// TODO check here
// https://raw.githubusercontent.com/reTHINK-project/dev-service-framework/develop/schemas/json-schema/data-objects/Context.json

export enum ContextUnitName {
  'meter',
  'gram',
  'second',
  'ampere',
  'kelvin',
  'candela',
  'mole',
  'hertz',
  'radian',
  'steradian',
  'newton',
  'pascal',
  'joule',
  'watt',
  'coulomb',
  'volt',
  'farad',
  'ohm',
  'siemens',
  'weber',
  'tesla',
  'henry',
  'degrees_celsius',
  'lumen',
  'lux',
  'becquerel',
  'gray',
  'sievert',
  'katal',
  'ph_acidity',
  'value_of_a_switch',
  'counter_value',
  'relative_humidity',
  'area',
  'volume_in_liters',
  'velocity',
  'acceleration',
  'flow_rate_in_liters_per_second',
  'irradiance',
  'luminance',
  'bel_sound_pressure_level',
  'bits_per_second',
  'degrees_latitude',
  'degrees_longitude',
  'remaining_battery_energy_level_in_percents',
  'remaining_battery_energy_level_in_seconds',
  'heart_rate_in_beats_per_minute',
  'cumulative_number_of_heart_beats',
  'steps',
  'availability',
  'user_activity',
  'user_communication'
}

export enum ContextUnit {
  'meter',
  'gram',
  'second',
  'ampere',
  'kelvin',
  'candela',
  'mole',
  'hertz',
  'radian',
  'steradian',
  'newton',
  'pascal',
  'joule',
  'watt',
  'coulomb',
  'volt',
  'farad',
  'ohm',
  'siemens',
  'weber',
  'tesla',
  'henry',
  'degrees_celsius',
  'lumen',
  'lux',
  'becquerel',
  'gray',
  'sievert',
  'katal',
  'ph_acidity',
  'value_of_a_switch',
  'counter_value',
  'relative_humidity',
  'area',
  'volume_in_liters',
  'velocity',
  'acceleration',
  'flow_rate_in_liters_per_second',
  'irradiance',
  'luminance',
  'bel_sound_pressure_level',
  'bits_per_second',
  'degrees_latitude',
  'degrees_longitude',
  'remaining_battery_energy_level_in_percents',
  'remaining_battery_energy_level_in_seconds',
  'heart_rate_in_beats_per_minute',
  'cumulative_number_of_heart_beats',
  'steps',
  'pres',
  'act',
  'comm'
}
