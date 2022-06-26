import { Realm } from "@realm/react";


export class MessageRealmObject extends Realm.Object {
    _id!: string;
    text?: string;
    name?: string;
    username!: string;
    avatar?: string;
    date?: string;
    //text,image,file
    type!: string
    image?: string
    isEarliest!: boolean
    userId?: string
    roomId!: string
    static generate(props: {
        _id: string;
        text?: string;
        name: string;
        username: string;
        avatar?: string;
        date?: string;
        //text,image,file
        type: string
        image?: string
        isEarliest: boolean
        userId?: string,
        roomId: string
    }) {
        return {
            ...props
        };
    }
    static schema = {
        name: "message",
        properties: {
            _id: "string",
            text: "string?",
            name: "string?",
            username: "string",
            avatar: "string?",
            date: "string?",
            type: "string",
            image: "string?",
            isEarliest: "bool",
            userId: "string?",
            roomId: "string"
        },
        primaryKey: "_id",
    };
}
