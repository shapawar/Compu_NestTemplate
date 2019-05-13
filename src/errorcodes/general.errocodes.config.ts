
/* 
* Define and add general error codes
*/
export class GeneralCodes {

    ErrorCodes = [
        { "code": 0, "message": 'OK', "description": 'Success', "type": 'SUCCESS', "canOverrideMessage": true },
        { "code": 1, "message": 'Internal Error', "description": 'Unexpected error encountered', "type": 'ERROR', "canOverrideMessage": true },
        { "code": 2, "message": 'Missing Input', "description": 'Missing one or more required parameters', "type": 'ERROR', "canOverrideMessage": true },
        { "code": 3, "message": 'Invalid Input', "description": 'Invalid input value(s)', "type": 'ERROR', "canOverrideMessage": true },
        { "code": 4, "message": 'Invalid URL', "description": 'URL not found', "type": 'ERROR', "canOverrideMessage": true },
        { "code": 5, "message": 'Invalid Configuration', "description": 'Invalid configuration value(s)', "type": 'ERROR', "canOverrideMessage": false }
    ];
}