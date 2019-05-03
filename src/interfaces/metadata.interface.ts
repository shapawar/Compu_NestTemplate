import * as moment from 'moment'

export interface apiResponse {
    requestURL: String,
    evUniqueID: String,
    requestTS: Number,
    elapsedTimeInMS: Number,
    apiServer: String,
    apiBuildVersion: String,
    errCode: Number,
    errMsg: String,
    tasks: Array<Object>,
    endMetadata: (evUniqueID, errCode, errMessage) => {
       
        //get error info
        // errInfo = ErrorCodeSvc.getErrorInformation(evUniqueID, errCode, errMessage);

        // set the task information
        this.elapsedTimeInMS = moment(Date.now()).diff(this.requestTS, 'milliseconds');
        this.errCode = errInfo.code;
        this.errMsg = errInfo.message;
        
      }      
}