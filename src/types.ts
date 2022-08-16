export enum FaceDirection {
  North = "N",
  East = "E",
  West = "W",
  South = "S",
}

export enum MovingDirection {
  Forward = "M",
  Left = "L",
  Right = "R",
}

export interface IRemoteRoverCommands {
  position: Position;
  directions: MovingDirection[];
  facedTo: FaceDirection;
}

export type Position = [number, number];
