import z, { TypeOf } from "zod";

// export interface DeleteUserInputDTO {
//   id: string;
//   token: string;
// }

// export interface DeleteUserOutputDTO {
//   message: string;
// }

export const deleteSchema = z.object({
  id: z.string().min(1),
  token: z.string().min(1),
});

export type DeleteUserInputDTO = z.infer<typeof deleteSchema>;

export const deleteSchemaOutput = z.object({
  message: z.string().min(1),
});

export type DeleteUserOutputDTO = z.infer<typeof deleteSchemaOutput>;
