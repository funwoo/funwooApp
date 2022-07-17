import {appSchema, tableSchema} from '@nozbe/watermelondb';
import {MESSAGES_TABLE} from './Message';
import {ROOMS_TABLE} from './Room';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: ROOMS_TABLE,
      columns: [
        {name: 'custom_id', type: 'string', isIndexed: true},
        {name: 'name', type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'token', type: 'string'},
        {name: 'avatar', type: 'string', isOptional: true},
        {name: 'date', type: 'number', isOptional: true},
        {name: 'line_id', type: 'string', isOptional: true},
        {name: 'last_message', type: 'string', isOptional: true},
        {name: 'unread', type: 'number', isOptional: true},
        {name: 'phone', type: 'string', isOptional: true},
        {name: 'roomId', type: 'string'},
      ],
    }),
    tableSchema({
      name: MESSAGES_TABLE,
      columns: [
        {name: 'message_id', type: 'string', isIndexed: true},
        {name: 'text', type: 'string', isOptional: true},
        {name: 'name', type: 'string', isOptional: true},
        {name: 'username', type: 'string'},
        {name: 'avatar', type: 'string'},
        {name: 'date', type: 'number', isOptional: true},
        {name: 'type', type: 'string'},
        {name: 'image', type: 'string', isOptional: true},
        {name: 'isEarliest', type: 'boolean', isOptional: true},
        {name: 'userId', type: 'string', isOptional: true},
        {name: 'roomId', type: 'string'},
      ],
    }),
  ],
});
