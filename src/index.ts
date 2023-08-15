import {
  ConnectionQuality,
  ConnectionState,
  DataPacket_Kind,
  DisconnectReason,
  ExternalE2EEKeyProvider,
  LocalAudioTrack,
  LocalParticipant,
  LogLevel,
  MediaDeviceFailure,
  Participant,
  ParticipantEvent,
  RemoteParticipant,
  RemoteTrackPublication,
  RemoteVideoTrack,
  Room,
  RoomConnectOptions,
  RoomEvent,
  RoomOptions,
  Track,
  TrackPublication,
  VideoCaptureOptions,
  VideoCodec,
  VideoPresets,
  VideoQuality,
  createAudioAnalyser,
  setLogLevel,
  supportsAV1,
  supportsVP9,
  InternalRoomOptions,
} from 'livekit-client'
import { RoomCore } from './core/RoomCore'
import constant from './utils/constant'
import MyEventEmitter from './utils/MyEventEmitter'
import { localParticipantConvert } from './utils/transferUtils'

export default class SfuApi extends MyEventEmitter {
  // 请求地址前缀
  private requestPrefix: string

  // 会议房间
  room: Room

  // 开始时间
  startTime?: number

  roomOptions?: RoomOptions

  // 初始化
  constructor(ip?: string, port?: string, roomOptions?: RoomOptions) {
    super()
    this.requestPrefix = ip + ':' + port
    this.roomOptions = roomOptions
    this.room = new Room(roomOptions)
  }

  // 创建会议
  async createMeeting(params: any) {
    //console.log('params', params)
    // 调用创建会议接口
    const res = await fetch(this.requestPrefix + constant.roomCreate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    const data = await res.json()
    if (data.code === 200) {
      // 连接会议
      return this.connect(data.data.url, data.data.token)
    }
    return this.room
  }

  // 连接会议
  private async connect(url: string, token: string) {
    this.startTime = Date.now()
    // 预热连接
    this.room.prepareConnection(url, token)
    // 初始化监听事件
    this.initListen()
    // 连接
    await this.room.connect(url, token)
    this.localCameraEnabled(true)
    this.localMicrophoneEnabled(true)
    const localParticipantCore = localParticipantConvert(
      this.room.localParticipant,
      this.startTime
    )
    const rm = new RoomCore(this.room.participants, localParticipantCore)
    return rm
  }

  // 加入会议
  async joinMeeting(params: any) {
    //console.log('params', params)
    // 调用创建会议接口
    const res = await fetch(this.requestPrefix + constant.roomJoinInfo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    const data = await res.json()
    if (data.code === 200) {
      // 连接会议
      return this.connect(data.data.url, data.data.token)
    }
    return this.room
  }

  // attaches track to an existing HTMLVideoElement
  attachVideo(element: HTMLMediaElement) {
    const cameraPub = this.room.localParticipant.getTrack(Track.Source.Camera)
    cameraPub?.videoTrack?.attach(element)
  }

  // attaches track to an existing HTMLAudioElement
  attachAudio(element: HTMLMediaElement) {
    const micPub = this.room.localParticipant.getTrack(Track.Source.Microphone)
    micPub?.audioTrack?.attach(element)
  }

  // 结束会议
  endMeeting() {}

  // 媒体开关
  mediaSwitch() {}

  // 自定义与会者属性
  setUserMetadata() {}

  // 设置主持人
  setHost() {}

  // 移除会议(踢人)
  outOfRoom() {}

  // 设置会议属性
  setRoomMetadata() {}

  // 修改名称
  updateName() {}

  // 设置头像
  setUserLogo() {}

  // 共享桌面
  screenShare() {}

  // 获取成员列表
  getMemberList() {}

  // 本地摄像头开关
  private localCameraEnabled(flag: boolean) {
    this.room.localParticipant.setCameraEnabled(flag)
  }

  // 本地麦克风开关
  private localMicrophoneEnabled(flag: boolean) {
    this.room.localParticipant.setMicrophoneEnabled(flag)
  }

  // 本地共享开关
  private localScreenShareEnabled(flag: boolean) {
    this.room.localParticipant.setScreenShareEnabled(flag)
  }

  // 初始化监听事件
  private initListen() {
    this.room
      .on(RoomEvent.ParticipantConnected, () => {
        this.handleParticipantConnected(this.room)
      })
      .on(RoomEvent.TrackUnsubscribed, () => {})
      .on(RoomEvent.ActiveSpeakersChanged, () => {})
      .on(RoomEvent.Disconnected, () => {})
      .on(RoomEvent.LocalTrackUnpublished, () => {})
  }

  // --------------------------- event handlers ------------------------------- //

  // 监听新成员加入
  private handleParticipantConnected(room: Room) {
    this.emit('ParticipantConnect', room.participants)
  }

  static fromJSON(d: Object, ip: string, port: string): SfuApi {
    return Object.assign(new SfuApi(ip, port), d)
  }

  // --------------------------- JS 测试 ------------------------------- //

  async testCreateMeeting(params: any) {
    //console.log('params', params)
    // 调用创建会议接口
    const res = await fetch(this.requestPrefix + constant.testApi, {
      method: 'POST',
    })
    const data = await res.json()
    if (data.code === 200) {
      // 连接会议
      return this.connect(data.data.url, data.data.token)
    }
    return this.room
  }
}
