export interface LastChat {
    _id: string;
    ts: Date;
}

export interface LastAgent {
    agentId: string;
    username: string;
    ts: Date;
}

export interface ContactManager {
    username: string;
}

export interface UnmappedProperties {
    ts: Date;
    lastChat: LastChat;
    lastAgent: LastAgent;
    contactManager: ContactManager;
}

export interface Phone {
    phoneNumber: string;
}

export interface VisitorEmail {
    address: string;
}

export interface LivechatData {
    line_id: string;
    avatar: string;
}

export interface LivechatRoomsInfo {
    id: string;
    username: string;
    name: string;
    updatedAt: Date
    token: string;
    _unmappedProperties_: UnmappedProperties;
    status: string;
    phone: Phone[] | string[];
    visitorEmails: VisitorEmail[];
    livechatData: LivechatData;
    msg: string,
    roomId: string
}
