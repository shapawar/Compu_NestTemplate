import { tasksData } from "./tasks.interface";
export interface apiResponse {
    requestURL: String;
    evUniqueID: String;
    requestTS: number;
    elapsedTimeInMS: number;
    apiServer: String;
    apiBuildVersion: String;
    errCode: Number;
    errMsg: String;
    timestamp: String;
    tasks: Array<tasksData>;
}
