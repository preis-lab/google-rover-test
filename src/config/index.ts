import { FaceDirection } from "../types";

// It's a map with the instructions to moving the rover to a direction
export const movingMap = {
  [FaceDirection.North]: [0, 1],
  [FaceDirection.East]: [1, 0],
  [FaceDirection.South]: [0, -1],
  [FaceDirection.West]: [-1, 0],
};

// It's a map with the instructions to spinning the rover on its own spot
export const SpinSequence = [
  FaceDirection.North,
  FaceDirection.East,
  FaceDirection.South,
  FaceDirection.West,
];
