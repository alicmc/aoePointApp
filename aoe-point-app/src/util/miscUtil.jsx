// function to check if a string is alphanumeric
export function isAlphaNumeric(str) {
  if (str === undefined) return false;
  // using regular expression to check for alphanumeric characters
  return /^[a-zA-Z0-9]+$/.test(str);
}

export const categories = [
  "Chapter",
  "Professional",
  "Academic",
  "Sisterhood",
  "Philanthropy",
  "DEI",
  "Interest Meeting",
  "Ritual",
  "Voting Sessions", // edit csv
  "Recruitment", //edit csv
  "Traditional", //edit csv
];

export const pointReqs = {
  Chapter: 12,
  Professional: 2,
  Academic: 1,
  Sisterhood: 2,
  Philanthropy: 2,
  DEI: 2,
  "Interest Meeting": 1,
  Ritual: 3,
  "Voting Sessions": 2, // edit csv
  Recruitment: 2, //edit csv
  Traditional: 7, //edit csv
};
