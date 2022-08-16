import { CommandParser } from "../src/classes/command-parser.class";
import { ParsingStringException } from "../src/exceptions";
import { FaceDirection } from "../src/types";

describe("Command parser", () => {
  it("should parse 2 lines of command", () => {
    const input = `1 2 N
    LMLMLMLMM`;

    const [commands] = CommandParser.stringToRoverCommands(input);

    expect(commands.directions).toHaveLength(9);
    expect(commands.position).toEqual([1, 2]);
    expect(commands.facedTo).toBe(FaceDirection.North);
  });

  it("should parse 4 lines of command for 2 rovers", () => {
    const input = `  1 2 N
      LMLMLMLMM
      3 3 E
      MRRMMRMRRM
      `;

    const [first, second] = CommandParser.stringToRoverCommands(input);

    expect(first.directions).toHaveLength(9);
    expect(first.position).toEqual([1, 2]);
    expect(first.facedTo).toBe(FaceDirection.North);

    expect(second.directions).toHaveLength(10);
    expect(second.position).toEqual([3, 3]);
    expect(second.facedTo).toBe(FaceDirection.East);
  });

  it("should throw an error for not recognized command", () => {
    const input = `  1 2 N
      ABSCD
      3 3 E
      MRRMMRMRRM
      `;

    try {
      CommandParser.stringToRoverCommands(input);
    } catch (error) {
      expect(error).toBeInstanceOf(ParsingStringException);
    }
  });

  it("should throw an error for not recognized facing option", () => {
    const input = `  1 2 G
      MRRMMRMRRM
      `;

    try {
      CommandParser.stringToRoverCommands(input);
    } catch (error) {
      expect(error).toBeInstanceOf(ParsingStringException);
    }
  });
});
