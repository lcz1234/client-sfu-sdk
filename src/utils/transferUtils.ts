import { LocalParticipant, Track } from 'livekit-client'
import { LocalParticipantCore } from '../core/LocalParticipantCore'

export const localParticipantConvert = (
  participant: LocalParticipant,
  startTime: number
) => {
  console.log('this.participant', participant)
  setTimeout(() => {
    console.log('_connectionQuality22', participant.connectionQuality)
    console.log(
      'cameraEnabled22',
      cameraPub && cameraPub.isSubscribed && !cameraPub.isMuted
    )
    console.log(
      'micEnabled22',
      micPub && micPub.isSubscribed && !micPub.isMuted
    )
  }, 3000)

  const identity = participant.identity
  const name = participant.name
  const isSpeaking = participant.isSpeaking
  const connectionQuality = participant.connectionQuality
  const cameraPub = participant.getTrack(Track.Source.Camera)
  const cameraEnabled =
    cameraPub && cameraPub.isSubscribed && !cameraPub.isMuted
  const isIncludeVideoElm = cameraPub?.videoTrack?.attachedElements
  const videoTrack = cameraPub?.videoTrack
  const micPub = participant.getTrack(Track.Source.Microphone)
  const micEnabled = micPub && micPub.isSubscribed && !micPub.isMuted
  const isEncrypted = participant.isEncrypted
  const joinedAt = participant.joinedAt

  let participantCore = new LocalParticipantCore(
    identity,
    isSpeaking,
    connectionQuality,
    startTime,
    isEncrypted,
    joinedAt,
    videoTrack,
    isIncludeVideoElm,
    cameraEnabled,
    micEnabled,
    name
  )
  return participantCore
}
