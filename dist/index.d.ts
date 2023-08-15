import { ConnectionQuality, LocalVideoTrack, RemoteParticipant, Room, RoomOptions } from 'livekit-client';

declare class LocalParticipantCore {
    identity: string;
    name?: string;
    isSpeaking: boolean;
    connectionQuality: ConnectionQuality;
    startTime: number;
    isEncrypted: boolean;
    joinedAt: Date | undefined;
    videoTrack?: LocalVideoTrack;
    isIncludeVideoElm?: HTMLMediaElement[];
    isLocal?: boolean;
    cameraEnabled?: boolean;
    micEnabled?: boolean;
    constructor(identity: string, isSpeaking: boolean, connectionQuality: ConnectionQuality, startTime: number, isEncrypted: boolean, joinedAt: Date | undefined, videoTrack?: LocalVideoTrack, isIncludeVideoElm?: HTMLMediaElement[], cameraEnabled?: boolean, micEnabled?: boolean, name?: string, isLocal?: boolean);
}

declare class RoomCore {
    /** map of sid: [[RemoteParticipant]] */
    participants: Map<string, RemoteParticipant>;
    /** the current participant */
    localParticipant: LocalParticipantCore;
    constructor(participants: Map<string, RemoteParticipant>, localParticipant: LocalParticipantCore);
}

declare class MyEventEmitter {
    Events: {
        [key: string]: Array<Function>;
    };
    constructor();
    /**
     * 发布/ 触发
     * @param eventName
     * @param args
     */
    emit(eventName: string, ...args: any): this;
    /**
     * 订阅/监听
     * @param eventName
     * @param callback
     */
    on(eventName: string, callback?: Function): this;
    /**
     * 只订阅一次/监听一次：
     * 思路：
     * 1. 重新包装一个回调函数(有名的)，进行注册订阅/监听,
     * 2. 包装函数里面直接调用 once方法的第二个参数回调函数，然后调用off方法 卸载该包装函数
     * @param eventName
     * @param callback
     */
    once(eventName: string, callback?: Function): this;
    /**
     * 卸载/取消 某一个回调监听(不是取消eventName的所有回调监听),主要配合once一起,实例单独调用,无意义
     * @param eventName
     * @param callback
     */
    off(eventName: string, callback: Function): this;
    /**
     * 卸载/取消 指定eventName 的所有订阅/监听
     * @param eventName
     * @param callback
     */
    remove(eventName: string, callback?: Function): this;
}

declare class SfuApi extends MyEventEmitter {
    private requestPrefix;
    room: Room;
    startTime?: number;
    roomOptions?: RoomOptions;
    constructor(ip?: string, port?: string, roomOptions?: RoomOptions);
    createMeeting(params: any): Promise<Room | RoomCore>;
    private connect;
    joinMeeting(params: any): Promise<Room | RoomCore>;
    attachVideo(element: HTMLMediaElement): void;
    attachAudio(element: HTMLMediaElement): void;
    endMeeting(): void;
    mediaSwitch(): void;
    setUserMetadata(): void;
    setHost(): void;
    outOfRoom(): void;
    setRoomMetadata(): void;
    updateName(): void;
    setUserLogo(): void;
    screenShare(): void;
    getMemberList(): void;
    private localCameraEnabled;
    private localMicrophoneEnabled;
    private localScreenShareEnabled;
    private initListen;
    private handleParticipantConnected;
    static fromJSON(d: Object, ip: string, port: string): SfuApi;
    testCreateMeeting(params: any): Promise<Room | RoomCore>;
}

export { SfuApi as default };
