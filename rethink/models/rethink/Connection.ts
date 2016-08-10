export interface Connection {
  scheme: string
  status: string
  owner: string
  peer: string
  OwnerPeer: {
    ConnectionDescription: ConnetionDescription,
    IceCandidates: IceCandidates
  }
}

export interface ConnetionDescription {
  sdp: string
}

export interface IceCandidates {
  status: RTCIceConnectionState
  [index: number]: IceCandidate
}

export interface IceCandidate {
  candidate: string
  sdpMLineIndex: number
  sdpMid: string
}

export enum RTCIceConnectionState {
  'new', 'checking', 'connected', 'completed', 'failed', 'disconnected', 'closed'
}
