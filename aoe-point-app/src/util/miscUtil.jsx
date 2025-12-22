// function to check if a string is alphanumeric
export function isAlphaNumeric(str) {
  if (str === undefined) return false;
  // using regular expression to check for alphanumeric characters
  return /^[a-zA-Z0-9]+$/.test(str);
}

const categories = [
  "Chapter",
  "Professional",
  "Sisterhood",
  "Philanthropy",
  "DEI",
  "Interest Meeting",
  "Ritual",
  "Voting Sessions/", // edit csv
  "Recruitment", //edit csv
  "Pref", //edit csv
];
