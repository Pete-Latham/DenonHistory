import * as fs from "fs";
import tracks from "./files/input.json" assert { type: "json" };

const trackList = tracks.map(( track, index) => {
  console.log(`${index+1}. - ${track.artist} - ${track.title}`);

  return `${index+1}. ${track.artist} - ${track.title}`;
});

let outputString = "";

for (const track of trackList) {
  outputString += track + '\n';
}

fs.writeFileSync("./files/output.txt", outputString);
