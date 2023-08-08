declare class SfuApi {
    private requestPrefix;
    private room;
    constructor(ip: string, port: string);
    createMeeting(): Promise<any>;
    connect(url: string, token: string): void;
}

export { SfuApi as default };
