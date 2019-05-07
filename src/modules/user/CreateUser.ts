import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  InputType,
  Field
} from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { Product } from "../../entity/Product";

function createBaseResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    async create(@Arg("input", () => inputType) input: typeof inputType) {
      return entity.create(input).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @Field()
  name: string;
}

const BaseCreateUser = createBaseResolver("User", User, RegisterInput, User);
const BaseCreateProduct = createBaseResolver(
  "Product",
  Product,
  ProductInput,
  Product
);

@Resolver()
export class CreateUserResolver extends BaseCreateUser {
  /* @Mutation(() => User)
  async createUser(@Arg("input") input: RegisterInput) {
    return User.create(input).save();
  } */
}

@Resolver()
export class CreateProductResolver extends BaseCreateProduct {}
