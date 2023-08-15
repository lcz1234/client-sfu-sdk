const roomCreate = '/api/cloud-visual/schedule/createConference' // 1.创建会议
const roomJoinInfo = '/api/cloud-visual/schedule/joinConference' // 2.加入会议
const mediaSwitch = '/api' // 3.媒体开关
const userMetadata = '/api' // 4.自定义与会者属性
const roomClose = '/api' // 5.结束会议
const setHost = '/api' // 6.设为主持人
const outOfRoom = '/api' // 7.移除会议(踢人)
const roomMetadata = '/api' // 8.设置会议属性
const rename = '/api' // 9.修改名称
const userLogo = '/api' // 10.设置头像
const screenShare = '/api' // 11.共享桌面
const getMemberList = '/api' // 12.获取成员列表

// 测试接口
const testApi = '/api/cloud-visual/schedule/testInterface'

export default {
  roomCreate,
  roomJoinInfo,
  mediaSwitch,
  userMetadata,
  roomClose,
  setHost,
  outOfRoom,
  roomMetadata,
  rename,
  userLogo,
  screenShare,
  getMemberList,
  testApi,
}
