import { UserModel } from "../../models/User";
import z from "zod";

export interface GetUserIdInputDTO {
  id: string;
  token: string;
}

export type GetUserIdOutputDTO = UserModel;

export const GetUserIdScheme = z.object({
  id: z.string().min(1),
  token: z.string().min(1),
});
