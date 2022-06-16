import { createRealmContext } from "@realm/react";
import { VisitorRealmObject } from "./visitor";

const config = {
    schema: [VisitorRealmObject],
    schemaVersion: 2,
};
export default createRealmContext(config);