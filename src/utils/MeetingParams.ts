/**
 * 参会房间属性
 */
export default class MeetingParams {
  // 用户名称
  useName: string

  // 房间名称
  roomName: string

  // 房间密码
  password: string

  // 房间归属地区id
  areaId: string

  // 最大参会议人数
  maxMembers: number

  // 允许成员开启视频
  allowMemOpenCam: boolean

  // 允许成员改名
  allowMemRename: boolean

  // 允许成员自我解除静音
  allowMemOpenMic: boolean

  // 允许成员举手
  allowMemHandsUp: boolean

  // 允许屏幕共享
  allowMemShareScreen: boolean

  // 成员入会时静音 1-打开，0-静音
  micOpen: number

  // 成员进入时播放提示音
  allowMemJoinSound: boolean

  constructor(
    useName: string,
    roomName: string,
    password: string,
    areaId: string,
    maxMembers: number,
    allowMemOpenCam: boolean,
    allowMemRename: boolean,
    allowMemOpenMic: boolean,
    allowMemHandsUp: boolean,
    allowMemShareScreen: boolean,
    micOpen: number,
    allowMemJoinSound: boolean
  ) {
    this.useName = useName
    this.roomName = roomName
    this.password = password
    this.areaId = areaId
    this.maxMembers = maxMembers
    this.allowMemOpenCam = allowMemOpenCam
    this.allowMemRename = allowMemRename
    this.allowMemOpenMic = allowMemOpenMic
    this.allowMemHandsUp = allowMemHandsUp
    this.allowMemShareScreen = allowMemShareScreen
    this.micOpen = micOpen
    this.allowMemJoinSound = allowMemJoinSound
  }
}
