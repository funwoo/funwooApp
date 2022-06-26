import { createRealmContext } from "@realm/react";
import { LivechatRoomRealmObject } from "./livechatRoom";

const config = {
    schema: [LivechatRoomRealmObject],
    schemaVersion: 5,
};
export default createRealmContext(config);