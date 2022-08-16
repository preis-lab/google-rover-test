import { BaseError } from "./base";

export class PlateauBoundsException extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}
