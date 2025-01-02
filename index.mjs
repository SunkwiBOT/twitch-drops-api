/**
 * This script queries drop and reward data from a Twitch Drops API,
 * saves it to local JSON files, and logs some basic metrics.
 *
 * Requirements:
 *   - Node.js 18+ (which includes built-in fetch) OR
 *   - Node.js < 18 with a fetch polyfill or third-party library like 'node-fetch'
 *
 * Usage:
 *   node fetchTwitchDrops.js
 */

import fs from 'fs';

/**
 * Writes JSON data to a specified file. Synchronously ensures the file
 * is fully written before continuing, but you can convert to async if needed.
 *
 * @param {string} filename - The file path or name to write
 * @param {unknown} data - JSON-serializable data
 */
function writeJsonFile(filename, data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonString, { encoding: 'utf-8' });
    console.log(`Successfully wrote data to "${filename}"`);
  } catch (err) {
    console.error(`Failed to write data to "${filename}". Error:`, err);
  }
}

/**
 * Fetches JSON from a given URL using the built-in global fetch (Node 18+)
 *
 * @param {string} url - The URL to request
 * @returns {Promise<any>} The JSON payload from the response
 * @throws If response is not OK or JSON cannot be parsed
 */
async function fetchJson(url) {
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status} - ${response.statusText}`);
  }

  // Attempt to parse JSON
  let body;
  try {
    body = await response.json();
  } catch (parseErr) {
    throw new Error(`Failed to parse JSON from response at ${url}: ${parseErr.message}`);
  }
  return body;
}

(async function main() {
  try {
    // 1. Fetch Drops
    const dropsUrl = 'https://twitch-drops-api.sunkwi.com/drops';
    const drops = await fetchJson(dropsUrl);

    // 2. Write Drops to disk
    writeJsonFile('drops.json', drops);

    // 3. Log some basic stats about drops
    const totalRewardsFromDrops = drops.reduce((acc, drop) => acc + drop.rewards.length, 0);
    console.log(
      `[${drops.length}] drop(s) fetched, with a total of [${totalRewardsFromDrops}] reward(s).`
    );

    // 4. Fetch Rewards (from campaigns, or separate endpoint)
    const rewardsUrl = 'https://twitch-drops-api.sunkwi.com/rewards';
    const rewards = await fetchJson(rewardsUrl);

    // 5. Write Rewards to disk
    writeJsonFile('rewards.json', rewards);

    // 6. Log some basic stats about rewards
    console.log(`[${rewards.length}] campaign-based reward(s) fetched successfully.`);

  } catch (err) {
    // Provide a clear, concise message for any error encountered
    console.error('Error while fetching or writing data:', err.message);
    process.exitCode = 1;  // non-zero exit for error handling in CI/CD
  }
})();
