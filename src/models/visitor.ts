import { Realm } from "@realm/react";


export class VisitorRealmObject extends Realm.Object {
    _id!: string;
    name!: string;
    username!: string;
    avatar?: string;
    date?: Date;
    static generate(_id: string, name: string, username: string, avatar?: string) {
        return {
            _id,
            name,
            username,
            date: new Date(),
            avatar,
        };
    }
    static schema = {
        name: "visitor",
        properties: {
            _id: "string",
            name: "string",
            username: "string",
            avatar: "string?",
            date: "date?"
        },
        primaryKey: "_id",
    };
}
