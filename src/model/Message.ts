import {Model} from '@nozbe/watermelondb';
import {date, field, json, relation} from '@nozbe/watermelondb/decorators';

export const MESSAGES_TABLE = 'messages';

export default class Message extends Model {
  static table = MESSAGES_TABLE;
  @field('message_id') message_id;
  @field('text') text;
  @field('name') name;
  @field('username') username;
  @field('avatar') avatar;
  @field('date') date;
  @field('type') type;
  @field('image') image;
  @field('isEarliest') isEarliest;
  @field('userId') userId;
  @field('roomId') roomId;
}
