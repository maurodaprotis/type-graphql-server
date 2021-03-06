import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExists } from "./IsEmailAlreadyExists";
import { PasswordMixin } from "../../shared/PasswordMixin";

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExists({
    message: "Email already in use"
  })
  email: string;
}
