import {Q} from '@nozbe/watermelondb';
import {database} from '../../..';
import apis from '../../network/apis';
import {ROOMS_TABLE} from '../Room';
//@ts-ignore
import RNUserdefaults from '@tranzerdev/react-native-user-defaults';
import moment from 'moment';

const readAll = async (rid: string) => {
  await apis.setRead(rid);
  const rooms = await database
    .get(ROOMS_TABLE)
    .query(Q.where('roomId', rid))
    .fetch();
  await database.write(async () => {
    await database.batch(
      //@ts-ignore
      rooms.map(item => {
        return item.update(room => {
          //@ts-ignore
          room.unread = 0;
        });
      }),
    );
  });
};
export const updateOrCreate = (
  custom_id: string,
  {
    name,
    username,
    token,
    phone,
    roomId,
    msg,
    line_id,
    updatedAt,
    avatar,
    unread,
  }: {
    name: string;
    username: string;
    token: string;
    phone: string | string[] | {phoneNumber: string}[];
    roomId: string;
    msg: string;
    line_id: string;
    updatedAt: string | Date;
    avatar: string;
    unread: number;
  },
) => {
  return new Promise(async (resolve, reject) => {
    await RNUserdefaults.setFromSuite(
      JSON.stringify({
        id: custom_id,
        name: name,
        username: username,
        avatar: avatar ?? '',
        date: moment(updatedAt).toISOString(),
      }),
      custom_id,
      'group.com.funwoo.funwoochat.onesignal',
    );
    const room = await database
      .get(ROOMS_TABLE)
      .query(Q.where('custom_id', custom_id))
      .fetch();
    if (room.length === 0) {
      resolve(
        database.get(ROOMS_TABLE).prepareCreate(room => {
          room.custom_id = custom_id;
          room.name = name;
          room.username = username;
          room.token = token;
          room.phone = phone;
          room.roomId = roomId;
          room.last_message = msg ?? '';
          room.line_id = line_id ?? '';
          room.date = updatedAt ? parseInt(moment(updatedAt).unix()) : 0;
          room.avatar = avatar ?? '';
          room.unread = unread;
        }),
      );
    } else {
      const existRoom = await database.get(ROOMS_TABLE).find(room[0].id);
      resolve(
        existRoom.prepareUpdate(room => {
          room.custom_id = custom_id;
          room.name = name;
          room.username = username;
          room.token = token;
          room.phone = phone;
          room.roomId = roomId;
          room.last_message = msg ?? '';
          room.line_id = line_id ?? '';
          room.date = updatedAt ? parseInt(moment(updatedAt).unix()) : 0;
          room.avatar = avatar ?? '';
          room.unread = unread;
        }),
      );
    }
  });
};
export {readAll};
