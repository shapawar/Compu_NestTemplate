import * as moment from 'moment'

export interface apiResponse<T> {
  requestURL: String,
  evUniqueID: String,
  requestTS: number,
  elapsedTimeInMS: Number,
  apiServer: String,
  apiBuildVersion: String,
  errCode: Number,
  errMsg: String,
  tasks: Array<Object>,
}

  // interface IEndMetaData {  
  //   evUniqueID: number;
  //   errCode: string;
  //   errMsg: string;

  // }
  // type AnyType = IEndMetaData 

  //  function end(update: AnyType) {  
  //    this.elapsedTimeInMS = moment(Date.now()).diff(this.requestTS, 'milliseconds');
  // }



