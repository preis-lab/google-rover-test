import { Plateau } from "../src/classes/plateau.class";
import {
  CrashingRoverException,
  OutOfLimitsRoverException,
} from "../src/exceptions";
import { FaceDirection, MovingDirection } from "../src/types";

describe("Move rover forward", () => {
  let plateau: Plateau;

  beforeEach(() => {
    plateau = new Plateau([5, 5]);
  });

  it("should move the rover 1 block to the North", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.North,
    });

    const position = rover.moveTo(MovingDirection.Forward);
    const currentPosition = rover.getCurrentPosition();

    expect(position[0]).toBe(0);
    expect(position[1]).toBe(1);

    expect(currentPosition[0]).toBe(0);
    expect(currentPosition[1]).toBe(1);
  });

  it("should move the rover 5 blocks to the North", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.North,
    });

    rover.moveTo(MovingDirection.Forward);
    rover.moveTo(MovingDirection.Forward);
    rover.moveTo(MovingDirection.Forward);

    const position = rover.moveTo(MovingDirection.Forward);

    const currentPosition = rover.getCurrentPosition();

    expect(position[0]).toBe(0);
    expect(position[1]).toBe(4);

    expect(currentPosition[0]).toBe(0);
    expect(currentPosition[1]).toBe(4);
  });

  it("should move the rover 1 block to the East and another to the West", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.North,
    });

    rover.moveTo(MovingDirection.Right);

    rover.moveTo(MovingDirection.Forward);
    let currentPosition = rover.getCurrentPosition();

    expect(currentPosition[0]).toBe(1);
    expect(currentPosition[1]).toBe(0);

    rover.moveTo(MovingDirection.Left);
    rover.moveTo(MovingDirection.Left);

    rover.moveTo(MovingDirection.Forward);

    currentPosition = rover.getCurrentPosition();
    expect(currentPosition[0]).toBe(0);
    expect(currentPosition[1]).toBe(0);
  });

  it("should throw an error when the rover is going out of the boundaries", () => {
    try {
      const rover = plateau.landNewRover({
        facedTo: FaceDirection.North,
        position: [5, 5],
      });

      rover.moveTo(MovingDirection.Forward);
      rover.moveTo(MovingDirection.Forward);
    } catch (error) {
      expect(error).toBeInstanceOf(OutOfLimitsRoverException);
    }
  });

  it("should throw an error when crashing 2 rovers", () => {
    try {
      plateau.landNewRover({
        facedTo: FaceDirection.North,
        position: [2, 2],
      });

      const rover = plateau.landNewRover({
        facedTo: FaceDirection.North,
        position: [1, 2],
      });

      rover.moveTo(MovingDirection.Forward);
    } catch (error) {
      expect(error).toBeInstanceOf(CrashingRoverException);
    }
  });
});
