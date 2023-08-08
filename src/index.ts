import {
  Participant,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  VideoPresets,
} from 'livekit-client'
import constant from './utils/constant'

export default class SfuApi {
  // 请求地址前缀
  private requestPrefix: string

  // 会议房间
  private room: Room

  // 初始化
  constructor(ip: string, port: string) {
    this.requestPrefix = ip + ':' + port
    console.log(this.requestPrefix)
    this.room = new Room({
      // automatically manage subscribed video quality
      adaptiveStream: true,
      // optimize publishing bandwidth and CPU for published tracks
      dynacast: true,
      // default capture settings
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
    })
  }

  // 创建会议
  async createMeeting() {
    // 调用创建会议接口
    const res = await fetch(this.requestPrefix + constant.testApi, {
      method: 'POST',
    })
    const data = await res.json()
    if (data.code === 200) {
      // 连接会议
      this.connect(data.data.url, data.data.token)
    }
    return data
  }

  // 连接会议
  connect(url: string, token: string) {
    this.room.prepareConnection(url, token)
    console.log('prepareConnection')
    this.room.connect(url, token)
    console.log('room', this.room)
  }
}
