import { Validation } from "./validation.interface";

export class ValidationError extends Error {}

export function validator(todo: any) {
  if (!(todo as Validation).id) throw new ValidationError("id is required");
  if (!(todo as Validation).title)
    throw new ValidationError("title is required");
  if (!(todo as Validation).note) throw new ValidationError("note is required");
}
