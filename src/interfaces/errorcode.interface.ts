
/* 
* Define error code interface
*/
export interface errorCodes {
    code: number,
    message: String,
    description: String,
    type: String,
    canOverrideMessage: Boolean
}