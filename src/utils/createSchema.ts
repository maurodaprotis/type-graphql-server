import { buildSchema } from "type-graphql";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { ConfirmUserResolver } from "../modules/user/Confirm";
import {
  CreateUserResolver,
  CreateProductResolver
} from "../modules/user/CreateUser";
import { ProfilePictureResolver } from "../modules/user/ProfilePicture";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ProfilePictureResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver,
      CreateProductResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
