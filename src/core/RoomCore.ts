import { RemoteParticipant } from 'livekit-client'
import { LocalParticipantCore } from './LocalParticipantCore'

export class RoomCore {
  /** map of sid: [[RemoteParticipant]] */
  participants: Map<string, RemoteParticipant>

  /** the current participant */
  localParticipant: LocalParticipantCore

  constructor(
    participants: Map<string, RemoteParticipant>,
    localParticipant: LocalParticipantCore
  ) {
    this.participants = participants
    this.localParticipant = localParticipant
  }
}
