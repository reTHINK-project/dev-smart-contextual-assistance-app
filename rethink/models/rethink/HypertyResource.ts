export interface HypertyResource {
  type: HypertyResourceType
  direction: direction
  author: string
  content: any
  contentURL: string,
  player: string
}

export enum HypertyResourceType {
  "chat",
	"audio",
	"video",
	"av",
	"screen",
	"file",
	"midi",
	"activity_context",
	"availability_context",
	"location_context",
	"heart_rate_context",
	"user_steps_context",
	"battery_context",
	"sleep_context",
	"light_context",
	"humidity_context",
	"power",
	"user_activity_context",
	"user_communication_context"
}

export enum direction {
  "in", "out", "inout"
}