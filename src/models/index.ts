import { createRealmContext } from "@realm/react";
import { LivechatRoomRealmObject } from "./livechatRoom";

const config = {
    schema: [LivechatRoomRealmObject],
    schemaVersion: 6,
};
export default createRealmContext(config);