import { Rover } from "./rover.class";
import { FaceDirection, Position } from "../types";

import {
  CrashingRoverException,
  OutOfLimitsRoverException,
} from "../exceptions";

/**
 * [X, Y]
 */
interface ILandRover {
  facedTo: FaceDirection;
  position?: Position;
}

export class Plateau {
  private rovers: Rover[] = [];
  private boundaries: Position;

  constructor(boundaries?: Position) {
    this.boundaries = boundaries || [Infinity, Infinity];
  }

  getRovers(): Rover[] {
    return this.rovers;
  }

  landNewRover({ facedTo, position: inputPosition }: ILandRover): Rover {
    const position = inputPosition || [0, 0];

    if (!this.isInsidePlateau(position)) {
      throw new OutOfLimitsRoverException(position);
    }

    if (this.hasRoverInPosition(position)) {
      throw new CrashingRoverException(position);
    }

    const rover = Rover.factory({
      plateau: this,
      facedTo,
      position,
    });

    this.rovers.push(rover);

    return rover;
  }

  hasRoverInPosition(position: Position): boolean {
    const rover = this.rovers.find((i) => {
      const currentPosition = i.getCurrentPosition();
      return (
        currentPosition[0] === position[0] && currentPosition[1] === position[1]
      );
    });

    return !!rover;
  }

  isInsidePlateau(position: Position): boolean {
    return (
      (position[0] <= this.boundaries[0] && position[1] <= this.boundaries[0]) && (position[0] >= 0 && position[1] >= 0)
    );
  }
}
