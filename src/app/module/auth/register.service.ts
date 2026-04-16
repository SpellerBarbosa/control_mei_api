import User from "../user/user.model.js";
import { Roles } from "../common/constants.js";

type Role = (typeof Roles)[number];

interface RegisterResponse {
  message: string;
  statusCode: number;
}

const registerService = async (
  username: string,
  password: string,
  role: Role,
): Promise<RegisterResponse> => {
  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      return {
        statusCode: 409,
        message: "Usuário já cadastrado",
      };
    }

    const newUser = new User({
      username,
      password,
      role,
    });

    await newUser.save();

    return {
      statusCode: 201,
      message: "Usuário cadastrado com sucesso.",
    };
  } catch (error: unknown) {
    console.error(error);

    const isDuplicateKeyError =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000;

    if (isDuplicateKeyError) {
      return {
        statusCode: 409,
        message: "Usuário já cadastrado.",
      };
    }

    return {
      statusCode: 500,
      message: "Erro ao tentar criar usuario, tente novamente mais tarde.",
    };
  }
};

export default registerService;
