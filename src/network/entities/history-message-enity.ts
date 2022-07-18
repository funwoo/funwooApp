import {Arg} from '../../types/StreamRoomMessagesPropsType';

export interface File {
  _id: string;
  name: Date;
  type: string;
}

export interface File2 {
  _id: string;
  name: Date;
  type: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface Attachment {
  ts: Date;
  title: Date;
  title_link: string;
  title_link_download: boolean;
  image_dimensions: ImageDimensions;
  image_preview: string;
  image_url: string;
  image_type: string;
  image_size: number;
  type: string;
}

export interface U {
  _id: string;
  username: string;
  name: string;
}

export interface FileUpload {
  publicFilePath: string;
  type: string;
  size: number;
}

export interface Value {
  type: string;
  value: string;
}

export interface Md {
  type: string;
  value: Value[];
}

export interface Message extends Omit<Arg, 'ts' | '_updatedAt'> {
  ts: Date;
  _updatedAt: Date;

  file: File;
  files: File2[];
  groupable: boolean;
  fileUpload: FileUpload;
  alias: string;
  token: string;
  t: string;
}

export interface LiveChatMessagesHistoryProps {
  messages: Message[];
  success: boolean;
}
