import axios from "axios";
import fs from "fs";

async function updateDrops() {
  try {
    const { data } = await axios("https://drops-api.sunkwi.com/drops", {
      method: "GET",
    });

    const jsonString = JSON.stringify(data, null, 2);

    fs.writeFileSync("drops.json", jsonString);

    console.log(
      `[${data.length}] drop(s) and [${data.reduce(
        (acc, curr) => acc + curr.rewards.length,
        0
      )}] reward(s) updated`
    );
  } catch (e) {
    console.error("Error while fetching data:", e);
  }
}

updateDrops();
