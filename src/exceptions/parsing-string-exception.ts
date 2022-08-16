import { BaseError } from "./base";

export class ParsingStringException extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}
