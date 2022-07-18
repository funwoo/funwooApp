export interface V {
  _id: string;
  username: string;
  token: string;
  status: string;
}

export interface Source {
  type: string;
  id: string;
  alias: string;
  label: string;
  sidebarIcon: string;
  defaultIcon: string;
}

export interface U {
  _id: string;
  username: string;
  name: string;
}

export interface Url {
  url: string;
}

export interface Md {
  type: string;
  value: any;
}

export interface File {
  _id: string;
  name: string;
  type: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface Attachment {
  ts: Date;
  title: string;
  title_link: string;
  title_link_download: boolean;
  video_url: string;
  video_type: string;
  video_size: number;
  type: string;
  image_dimensions: ImageDimensions;
  image_preview: string;
  image_url: string;
  image_type: string;
  image_size?: number;
}

export interface LastMessage {
  _id: string;
  rid: string;
  u: U;
  msg: string;
  ts: Date;
  _updatedAt: Date;
  token: string;
  alias: string;
  urls: Url[];
  mentions: any[];
  channels: any[];
  md: Md[];
  newRoom: boolean;
  showConnecting: boolean;
  file: File;
  attachments: Attachment[];
}

export interface Inquiry {
  _id: string;
  rid: string;
  name: string;
  ts: Date;
  message: string;
  status: string;
  v: V;
  t: string;
  queueOrder: number;
  estimatedWaitingTimeQueue: number;
  estimatedServiceTimeAt: Date;
  source: Source;
  _updatedAt: Date;
  queuedAt: Date;
  lastMessage: LastMessage;
}

export interface InquiriesQueuedListProps {
  inquiries: Inquiry[];
  count: number;
  offset: number;
  total: number;
  success: boolean;
}
