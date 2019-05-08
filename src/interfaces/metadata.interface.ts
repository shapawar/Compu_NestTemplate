
/* 
* Defind res object interface
*/
export interface apiResponse {
    requestURL: String,
    evUniqueID: String,
    requestTS: Number,
    elapsedTimeInMS: Number,
    apiServer: String,
    apiBuildVersion: String,
    errCode: Number,
    errMsg: String,
    tasks: Array<Object>
}