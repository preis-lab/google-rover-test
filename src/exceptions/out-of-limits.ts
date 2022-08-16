import { Position } from "../types";
import { PlateauBoundsException } from "./plateau-bounds";

export class OutOfLimitsRoverException extends PlateauBoundsException {
  constructor(position: Position) {
    super(`Rover went out of the plateau limits at position ${position}`);
  }
}
