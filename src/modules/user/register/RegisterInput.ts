import { Length, IsEmail, MinLength } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExists } from "./IsEmailAlreadyExists";

@InputType()
export class RegisterInput {
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

  @Field()
  @MinLength(8)
  password: string;
}
