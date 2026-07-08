import { expect, test } from "vitest";
import ClientSearchDB from "./lib/search-client";

// Clean, realistic mock data for sorting and searching
const testData = [
  { nameL: "Banana", lo: "NY" },
  { nameL: "Apple", lo: "LA" },
  { nameL: "Cherry", lo: "SF" },
  { nameL: "apricot", lo: "NY" }, // lowercase to test case-insensitive sorting
  { nameL: "Zebra", lo: "LA" , description: "al"}
];
  const search = new ClientSearchDB(testData);

test("filtering data by location", () => {

  
  // Filter for just NY locations
  search.filter({ lo: "NY" });
  const filtered = search.getData();
  
  // It should only return Banana and apricot
  expect(filtered.length).toBe(2);
  expect(filtered).toStrictEqual([
    { nameL: "Banana", lo: "NY" },
    { nameL: "apricot", lo: "NY" }
  ]);
});

test("alphabetical sorting by nameL", () => {

   const search = new ClientSearchDB(testData);
  // Assuming your class has a sort method, e.g., search.sort("nameL")
  // If your method name is different, change it here!
  search.alphaSort("nameL"); 
  const sorted = search.getData();
  console.log("op\nooooooooooooooo", JSON.stringify(sorted))
  // Check if they are in perfect A-Z order
  // Note: Modern sort tests usually check if 'apple'/'apricot' come before 'Banana'
  expect(sorted[0].nameL.toLowerCase()).toBe("apple");
  expect(sorted[1].nameL.toLowerCase()).toBe("apricot");
  expect(sorted[4].nameL.toLowerCase()).toBe("zebra");

  
});
test("search.search", ()=>{
    const results = search.search("al" )
  console.log(results);

  expect(results.map(i=>i.item)).toStrictEqual([ { nameL: "Zebra", lo: "LA" , description: "al"}])
})