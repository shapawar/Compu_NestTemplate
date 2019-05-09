import { tasksData } from "./tasks.interface";

/* 
* Defind res object interface
*/
export interface apiResponse {
    requestURL: String,
    evUniqueID: String,
    requestTS: number,
    elapsedTimeInMS: number,
    apiServer: String,
    apiBuildVersion: String,
    errCode: Number,
    errMsg: String,
    tasks: Array<tasksData>
}