/* 
* NEST & Third party imports
*/
import { ApiModelProperty } from "@nestjs/swagger";
import { tasksData } from "src/interfaces/tasks.interface";


/* Data transfer object for user entitty */
export class responseMetadataDTO {
    @ApiModelProperty()
    requestURL: string;

    @ApiModelProperty()
    evUniqueID: string;

    @ApiModelProperty()
    requestTS: string;

    @ApiModelProperty()
    elapsedTimeInMS: number;

    @ApiModelProperty()
    apiServer: string;

    @ApiModelProperty()
    apiBuildVersion: string;

    @ApiModelProperty()
    errCode: Number;

    @ApiModelProperty()
    errMsg: string;

    @ApiModelProperty()
    errName: string;

    @ApiModelProperty()
    timestamp: string;

    @ApiModelProperty()
    tasks: Array<tasksData>;
}
