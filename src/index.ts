import fs from "fs";

import { CommandParser } from "./classes/command-parser.class";
import { Plateau } from "./classes/plateau.class";

const rawCommand = fs.readFileSync("input.txt").toString("utf8");

const roversEntries = CommandParser.stringToRoverCommands(rawCommand);

const plateau = new Plateau();

roversEntries.forEach(({ facedTo, position, directions }) => {
  const rover = plateau.landNewRover({
    facedTo,
    position,
  });

  rover.applyBatchDirections(directions);
});

plateau.getRovers().forEach((i) => {
  const [x, y] = i.getCurrentPosition();
  const faceDirection = i.getFaceDirection();

  console.log(`${x} ${y} ${faceDirection}`);
});
