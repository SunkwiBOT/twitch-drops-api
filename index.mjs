import fs from "fs";

(async () => {
  try {
    const dropsResponse = await fetch(
      "https://twitch-drops-api.sunkwi.com/drops",
      {
        method: "GET",
      }
    );

    if (!dropsResponse.ok) {
      throw new Error(
        `Failed to fetch drops: ${dropsResponse.status} ${dropsResponse.statusText}`
      );
    }

    const drops = await dropsResponse.json();

    fs.writeFileSync("drops.json", JSON.stringify(drops, null, 2));

    console.log(
      `[${drops.length}] drop(s) and [${drops.reduce(
        (acc, curr) => acc + curr.rewards.length,
        0
      )}] reward(s) from drops updated`
    );

    const rewardsResponse = await fetch(
      "https://twitch-drops-api.sunkwi.com/rewards",
      {
        method: "GET",
      }
    );

    if (!rewardsResponse.ok) {
      throw new Error(
        `Failed to fetch rewards: ${rewardsResponse.status} ${rewardsResponse.statusText}`
      );
    }

    const rewards = await rewardsResponse.json();

    fs.writeFileSync("rewards.json", JSON.stringify(rewards, null, 2));

    console.log(`[${rewards.length}] reward(s) from campaigns updated`);
  } catch (e) {
    console.error("Error while fetching data:", e.message);
  }
})();
