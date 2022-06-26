import { Realm } from "@realm/react";


export class LivechatRoomRealmObject extends Realm.Object {
    id!: string;
    name!: string;
    username!: string;
    token!: string;
    avatar?: string;
    date?: string;
    phone!: string[];
    line_id?: string;
    roomId!: string
    msg!: string;
    unread!: number
    static generate(props: {
        id: string,
        name: string,
        username: string,
        token: string,
        avatar?: string,
        date?: string,
        phone: string[],
        line_id?: string,
        roomId: string,
        msg: string,
        unread: number
    }) {
        return {
            ...props
        };
    }
    static schema = {
        name: "livechatRoom",
        properties: {
            id: "string",
            name: "string",
            username: "string",
            avatar: "string?",
            date: "string?",
            token: "string",
            phone: "string[]",
            line_id: "string",
            roomId: "string",
            msg: "string",
            unread: "int"
        },
        primaryKey: "id",
    };
}
