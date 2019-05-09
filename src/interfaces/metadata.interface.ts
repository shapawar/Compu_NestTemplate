import * as moment from 'moment'

export interface apiResponse {
  requestURL: String,
  evUniqueID: String,
  requestTS: number,
  elapsedTimeInMS: (evUniqueID,errCode,errMsg) => Number
  apiServer: String,
  apiBuildVersion: String,
  errCode: Number,
  errMsg: String,
  tasks: Array<Object>
}

  // interface IEndMetaData {  
  //   evUniqueID: number;
  //   errCode: string;
  //   errMsg: string;

  // }
  // type AnyType = IEndMetaData 

  (evUniqueID,errCode,errMsg):Number => {  
    return this.elapsedTimeInMS = moment(Date.now()).diff(this.requestTS, 'milliseconds');
  }



