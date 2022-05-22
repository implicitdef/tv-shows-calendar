import { getDb } from "./server.db";
import { DataFromDb } from "./structs";

export async function loadData(): Promise<DataFromDb> {
  const db = getDb();
  const row = await db
    .selectFrom("raw_json_data")
    .select("content")
    .orderBy("creation_time")
    .executeTakeFirst();
  if (!row) {
    throw new Error("No data in DB");
  }
  return JSON.parse(row.content) as DataFromDb;
}

export const defaultShowsIds = [
  // If you put too much of those, the first request starts to be a bit too long

  // To find ids of shows, look them up on the search field in the app
  // add them, and look in the network tab at the POST request

  1399, // Game of Thrones
  // 1402, // Walking dead
  // 63247, // Westworld
  66732, // Stranger things
  // 60059, // Better call saul
  // 1396, // Breaking bad
  // 1424, // Orange is the new black
  1412, // Arrow
  2190, // South park
  // 61733, // Empire,
  60625, // Rick and Morty
  // 38472, // jessica jones
  61889, // daredevil
  // 67136, // this is us
  42009, // black mirror
  65494, // The crown
  // 67744, // Mindhunter
  // 65708, // Taboo
  // 79242, // The chilling adventures of sabrina
  60622, // Fargo
  // 78191, // You
  // 75006, // The umbrella academy
  // 84977, // Russian doll
  82856, // The mandalorian
  60574, // Peaky blinders
  93405, // Squid game
  82596, // Emily in Paris
];
