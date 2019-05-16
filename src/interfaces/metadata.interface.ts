/* 
* Custom interface
*/
import { tasksData } from "./tasks.interface";

/* 
* Defind res object interface
*/
export interface apiResponse {
    requestURL: string,
    evUniqueID: string,
    requestTS: string,
    elapsedTimeInMS: number,
    apiServer: string,
    apiBuildVersion: string,
    errCode: Number,
    errMsg: string,
    timestamp: string,
    tasks: Array<tasksData>
}