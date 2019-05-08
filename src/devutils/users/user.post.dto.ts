import { ApiModelProperty } from "@nestjs/swagger";

export class UserPostDTO {
     @ApiModelProperty()
     username: string;

     @ApiModelProperty()
     email: string;
     
     @ApiModelProperty()
     mobile: string;
     
     @ApiModelProperty()
     password: string;
     
     @ApiModelProperty()
     address: string;
}



