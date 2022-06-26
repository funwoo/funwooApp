import { createRealmContext } from "@realm/react";
import { LivechatRoomRealmObject } from "./livechatRoom";
import { MessageRealmObject } from "./message";

const config = {
    schema: [LivechatRoomRealmObject, MessageRealmObject],
    schemaVersion: 9,
};
export default createRealmContext(config);