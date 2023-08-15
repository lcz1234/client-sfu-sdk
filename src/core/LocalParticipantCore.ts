import { ConnectionQuality, LocalVideoTrack } from 'livekit-client'

export class LocalParticipantCore {
  identity: string

  name?: string

  isSpeaking: boolean

  connectionQuality: ConnectionQuality

  startTime: number

  isEncrypted: boolean

  joinedAt: Date | undefined

  videoTrack?: LocalVideoTrack

  isIncludeVideoElm?: HTMLMediaElement[]

  isLocal?: boolean = true

  cameraEnabled?: boolean

  micEnabled?: boolean

  constructor(
    identity: string,
    isSpeaking: boolean,
    connectionQuality: ConnectionQuality,
    startTime: number,
    isEncrypted: boolean,
    joinedAt: Date | undefined,
    videoTrack?: LocalVideoTrack,
    isIncludeVideoElm?: HTMLMediaElement[],
    cameraEnabled?: boolean,
    micEnabled?: boolean,
    name?: string,
    isLocal?: boolean
  ) {
    this.identity = identity
    this.isSpeaking = isSpeaking
    this.connectionQuality = connectionQuality
    this.isIncludeVideoElm = isIncludeVideoElm
    this.cameraEnabled = true
    this.name = name
    this.isLocal = true
    this.startTime = startTime
    this.videoTrack = videoTrack
    this.micEnabled = true
    this.isEncrypted = isEncrypted
    this.joinedAt = joinedAt
  }
}
