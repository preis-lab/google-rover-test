import { ParsingStringException } from "../exceptions";
import { IRemoteRoverCommands, MovingDirection, FaceDirection } from "../types";

export class CommandParser {
  static stringToRoverCommands(rawInput: string): IRemoteRoverCommands[] {
    const rovers: IRemoteRoverCommands[] = rawInput
      .split("\n")
      .filter((i) => i.length > 0)
      .map((i) => i.replace(new RegExp(" ", "g"), "").toUpperCase())
      .reduce((acc, curr, index, array) => {
        if (curr.length === 3) {
          const [x, y, facedTo] = curr.split("");

          const directions: MovingDirection[] = array[index + 1].split(
            ""
          ) as MovingDirection[];

          const everyDirectionsExists = directions.every((i) =>
            Object.values(MovingDirection).includes(i)
          );

          if (!everyDirectionsExists) {
            throw new ParsingStringException(
              `String "${array[index + 1]}" contains not recognized commands.`
            );
          }

          const faceCommandExists = Object.values(FaceDirection).includes(
            facedTo as any
          );

          if (!faceCommandExists) {
            throw new ParsingStringException(
              `String "${facedTo}" is not an available option for ${FaceDirection}.`
            );
          }

          return [
            ...acc,
            {
              facedTo,
              position: [Number(x), Number(y)],
              directions,
            },
          ];
        }
        return acc;
      }, <any[]>[]);

    return rovers;
  }
}
