import { UserDatabase } from "../database/UserDatabase";
import {
  DeleteUserInputDTO,
  DeleteUserOutputDTO,
} from "../dtos/user/deleteUser.dto";
import {
  GetUserIdInputDTO,
  GetUserIdOutputDTO,
} from "../dtos/user/getUserId.dto";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/user/getUsers.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { TokenPayload, USER_ROLES, User, UserDB } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  public getUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {
    const { q, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new BadRequestError("somente admins podem acessar");
    }

    const usersDB = await this.userDatabase.findUsers(q);

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      );

      return user.toBusinessModel();
    });

    const output: GetUsersOutputDTO = users;

    return output;
  };

  public getUserId = async (
    input: GetUserIdInputDTO
  ): Promise<GetUserIdOutputDTO> => {
    const { token, id } = input;

    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new BadRequestError("Não existe user.");
    }

    const userDB = await this.userDatabase.findUserById(id);

    if (!userDB) {
      throw new BadRequestError("Usuário não encontrado.");
    }

    if (tokenPayload.role !== USER_ROLES.ADMIN) {
      if (tokenPayload.id !== userDB.id) {
        throw new BadRequestError(
          "somente admins podem acessar ou usuário pode acessar."
        );
      }
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    );

    const userReturn = user.toBusinessModel();

    return userReturn;
  };

  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name, email, password } = input;

    const id = this.idGenerator.generate();
    const hashedPassword = await this.hashManager.hash(password);

    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    const newUserDB = newUser.toDBModel();
    await this.userDatabase.insertUser(newUserDB);

    const tokenPayload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    };

    const token = this.tokenManager.createToken(tokenPayload);

    const output: SignupOutputDTO = {
      message: "Cadastro realizado com sucesso",
      token: token,
    };

    return output;
  };

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new NotFoundError("'email' não encontrado");
    }

    const hashedPassword = userDB.password;

    const isPasswordCorrect = await this.hashManager.compare(
      password,
      hashedPassword
    );

    if (!isPasswordCorrect) {
      throw new BadRequestError("'email' ou 'password' incorretos");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    );

    const tokenPayload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole(),
    };

    const token = this.tokenManager.createToken(tokenPayload);

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token: token,
    };

    return output;
  };

  deleteUser = async ({
    id,
    token,
  }: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> => {
    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new BadRequestError("User não existe.");
    }

    const userDB = await this.userDatabase.findUserById(id);

    if (!userDB) {
      throw new BadRequestError("user não existe");
    }

    if (tokenPayload.role !== USER_ROLES.ADMIN) {
      if (tokenPayload.id !== userDB.id) {
        throw new BadRequestError(
          "Somente o próprio usuário ou um admin pode deletar um usuário"
        );
      }
    }

    await this.userDatabase.deleteUser(id);

    return {
      message: "usuário excluido com sucesso!",
    };
  };
}
