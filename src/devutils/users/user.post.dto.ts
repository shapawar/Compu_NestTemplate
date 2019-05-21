/* 
* NEST & Third party imports
*/
import { ApiModelProperty } from "@nestjs/swagger";


/* Data transfer object for user entitty */
export class UserPostDTO {
     @ApiModelProperty()
     username: string;
     
     @ApiModelProperty()
     email: string;
     
     @ApiModelProperty()
     mobile: number;
     
     @ApiModelProperty()
     password: string;

     @ApiModelProperty()
     address: string;
}

