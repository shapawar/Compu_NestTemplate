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
  endMetaData:

}

  interface IEndMetaData {  
    evUniqueID: number;
    errCode: string;
    errMsg: string;

  }
  type AnyType = IEndMetaData 

   function end(update: AnyType) {  
     this.elapsedTimeInMS = moment(Date.now()).diff(this.requestTS, 'milliseconds');
  }



