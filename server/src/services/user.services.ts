import DocumentDefinition from "mongoose"
import UserModel, {IUser} from "@/models/auth"

export async function register(user: IUser): Promise<void> {
  try {
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(user: IUser) {
  try {
    const foundUser = await UserModel.findOne({
      name: user.name,
      password: user.password
    })
  } catch (error) {
    throw error;
  }
}