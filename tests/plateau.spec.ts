import { Plateau } from "../src/classes/plateau.class";
import { FaceDirection } from "../src/types";

import {
  CrashingRoverException,
  OutOfLimitsRoverException,
} from "../src/exceptions";

describe("Plateau with multiple rovers", () => {
  let plateau: Plateau;

  beforeEach(() => {
    plateau = new Plateau([5, 5]);
  });

  it("should land a new rover in a specific spot", () => {
    const rover = plateau.landNewRover({
      facedTo: FaceDirection.North,
      position: [1, 2],
    });

    expect(rover.getCurrentPosition()[0]).toBe(1);
  });

  it("should show the spot is busy", () => {
    plateau.landNewRover({
      facedTo: FaceDirection.North,
      position: [1, 2],
    });

    expect(plateau.hasRoverInPosition([1, 2])).toBe(true);
    expect(plateau.hasRoverInPosition([0, 2])).toBe(false);
  });

  it("should check if the position is inside plateau", () => {
    expect(plateau.isInsidePlateau([1, 2])).toBe(true);
    expect(plateau.isInsidePlateau([500, 500])).toBe(false);
  });

  it("should throw an error when trying to land a rover outside the plateau limits", () => {
    try {
      plateau.landNewRover({
        facedTo: FaceDirection.North,
        position: [999, 999],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(OutOfLimitsRoverException);
    }
  });

  it("should throw an error when trying to land a rover above another rover", () => {
    try {
      plateau.landNewRover({
        facedTo: FaceDirection.North,
        position: [0, 0],
      });
      plateau.landNewRover({
        facedTo: FaceDirection.East,
        position: [0, 0],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CrashingRoverException);
    }
  });
});
