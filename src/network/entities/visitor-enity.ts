export interface LastChat {
  _id: string;
  ts: Date;
}

export interface LastAgent {
  agentId: string;
  username: string;
  ts: Date;
}

export interface LivechatData {
  line_id: string;
  avatar: string;
}

export interface VisitorEmail {
  address: string;
}

export interface Visitor {
  _id: string;
  username: string;
  ts: Date;
  _updatedAt: Date;
  name: string;
  token: string;
  lastChat: LastChat;
  lastAgent: LastAgent;
  contactManager?: any;
  livechatData: LivechatData;
  phone?: any;
  visitorEmails: VisitorEmail[];
}

export interface VisitorResponse {
  visitor: Visitor;
  success: boolean;
}
