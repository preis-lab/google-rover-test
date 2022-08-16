import { Plateau } from "./plateau.class";
import { FaceDirection, MovingDirection, Position } from "../types";
import { movingMap, SpinSequence } from "../config";

import {
  CrashingRoverException,
  OutOfLimitsRoverException,
} from "../exceptions";

interface ICreateRover {
  facedTo: FaceDirection;
  position: Position;
  plateau: Plateau;
}

export class Rover {
  private plateau: Plateau;
  private position: Position;

  private facedTo: FaceDirection;

  // Private constructor, we use the factory to create the instance
  private constructor() {}

  /**
   * Factory that creates the rover instance, it's good for validations and even if you need async things
   */
  static factory(input: ICreateRover): Rover {
    const rover = new this();

    rover.position = input.position;
    rover.facedTo = input.facedTo;
    rover.plateau = input.plateau;

    return rover;
  }

  moveTo(direction: MovingDirection): Position {
    if (direction === MovingDirection.Forward) {
      this.moveForward();
    }

    if ([MovingDirection.Right, MovingDirection.Left].includes(direction)) {
      this.turnFace(direction);
    }

    return this.position;
  }

  getFaceDirection(): FaceDirection {
    return this.facedTo;
  }

  getCurrentPosition(): Position {
    return this.position;
  }

  private moveForward(): Position {
    const [x, y] = movingMap[this.facedTo];

    const moveTo: Position = [this.position[0] + x, this.position[1] + y];

    const isOnLimits = this.plateau.isInsidePlateau(moveTo);

    if (!isOnLimits) {
      throw new OutOfLimitsRoverException(moveTo);
    }

    const hasRover = !!this.plateau.hasRoverInPosition(moveTo);

    if (hasRover) {
      throw new CrashingRoverException(this.position);
    }

    this.position = moveTo;

    return this.position;
  }

  private turnFace(direction: MovingDirection): void {
    const currentFaceIndex = SpinSequence.findIndex((i) => i === this.facedTo);

    if (direction === MovingDirection.Right) {
      if (currentFaceIndex + 1 >= SpinSequence.length) {
        this.facedTo = SpinSequence[0];
        return;
      }

      this.facedTo = SpinSequence[currentFaceIndex + 1];
    }

    if (direction === MovingDirection.Left) {
      if (currentFaceIndex - 1 === -1) {
        this.facedTo = SpinSequence[SpinSequence.length - 1];
        return;
      }

      this.facedTo = SpinSequence[currentFaceIndex - 1];
    }
  }

  applyBatchDirections(directions: MovingDirection[]): void {
    directions.forEach((i) => this.moveTo(i));
  }
}
