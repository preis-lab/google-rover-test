import { Position } from "../types";
import { PlateauBoundsException } from "./plateau-bounds";

export class CrashingRoverException extends PlateauBoundsException {
  constructor(position: Position) {
    super(`There's another rover in the position ${position}`);
  }
}
