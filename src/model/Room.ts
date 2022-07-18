import {Model} from '@nozbe/watermelondb';
import {field, json} from '@nozbe/watermelondb/decorators';
import {writer} from '@nozbe/watermelondb/decorators';
import moment from 'moment';
const sanitizer = (r: object): object => r;
export const ROOMS_TABLE = 'rooms';
export default class Room extends Model {
  static table = ROOMS_TABLE;
  @field('roomId') roomId;
  @field('name') name;
  @field('username') username;
  @field('token') token;
  @field('avatar') avatar;
  @field('date') date;
  @field('line_id') line_id;
  @field('last_message') last_message;
  @field('unread') unread;
  @json('phone', sanitizer) phone;
  @field('custom_id') custom_id;
}
