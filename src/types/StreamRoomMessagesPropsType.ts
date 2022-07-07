export interface Ts {
  $date: number;
}

export interface U {
  _id: string;
  username: string;
  name: string;
}

export interface UpdatedAt {
  $date: number;
}

export interface Value {
  type: string;
  value: string;
}

export interface Md {
  type: string;
  value: Value[];
}

export interface Arg {
  _id: string;
  msg: string;
  rid: string;
  ts: Ts;
  u: U;
  _updatedAt: UpdatedAt;
  urls: any[];
  mentions: any[];
  channels: any[];
  md: Md[];
  attachments?: {
    image_url: string;
    ts: string;
  }[];
  t: string;
  transferData?: {
    transferredTo?: {
      name: string;
    };
  };
}

export interface Fields {
  eventName: string;
  args: Arg[];
}

export interface StreamRoomMessagesProps {
  msg: string;
  collection: string;
  id: string;
  fields: Fields;
}
