import { Plateau } from "../src/classes/plateau.class";
import { Rover } from "../src/classes/rover.class";
import { FaceDirection, MovingDirection } from "../src/types";

describe("Spin rover", () => {
  let plateau: Plateau;

  beforeEach(() => {
    plateau = new Plateau([5, 5]);
  });

  it("should create a rover instance", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.North,
    });

    const position = rover.getCurrentPosition();

    expect(position[0]).toBe(0);
    expect(position[1]).toBe(0);

    expect(rover).toBeInstanceOf(Rover);
  });

  it("should turn the rover to the left", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.North,
    });

    rover.moveTo(MovingDirection.Left);

    const facedTo = rover.getFaceDirection();

    expect(rover).toBeInstanceOf(Rover);
    expect(facedTo).toBe(FaceDirection.West);
  });

  it("should turn the rover to the right", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.North,
    });

    rover.moveTo(MovingDirection.Right);

    const facedTo = rover.getFaceDirection();

    expect(rover).toBeInstanceOf(Rover);
    expect(facedTo).toBe(FaceDirection.East);
  });

  it("should turn the rover in 180", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.North,
    });

    rover.moveTo(MovingDirection.Right);
    rover.moveTo(MovingDirection.Right);

    const facedTo = rover.getFaceDirection();

    expect(rover).toBeInstanceOf(Rover);
    expect(facedTo).toBe(FaceDirection.South);
  });

  it("should perform a 360 spin by turning right", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.East,
    });

    rover.moveTo(MovingDirection.Right);
    rover.moveTo(MovingDirection.Right);
    rover.moveTo(MovingDirection.Right);
    rover.moveTo(MovingDirection.Right);

    const facedTo = rover.getFaceDirection();

    expect(rover).toBeInstanceOf(Rover);
    expect(facedTo).toBe(FaceDirection.East);
  });

  it("should perform a 360 spin by turning left", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.West,
    });

    rover.moveTo(MovingDirection.Left);
    rover.moveTo(MovingDirection.Left);
    rover.moveTo(MovingDirection.Left);
    rover.moveTo(MovingDirection.Left);

    const facedTo = rover.getFaceDirection();

    expect(rover).toBeInstanceOf(Rover);
    expect(facedTo).toBe(FaceDirection.West);
  });
});
