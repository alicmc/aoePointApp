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
  "Philanthropic",
  "DEI",
  "Interest Meetings",
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
  Philanthropic: 2,
  DEI: 2,
  "Interest Meetings": 1,
  Ritual: 3,
  "Voting Sessions": 2,
  Recruitment: 2,
  Traditional: 7,
};

function getPoints(student, category) {
  return (
    (student[`${category} Final Points`] ?? 0) +
    (student[`${category} Excuses`] ?? 0)
  );
}

function categoryMet(student, category) {
  if (category === "Chapter" || category === "Traditional") {
    return getPoints(student, category) >= pointReqs[category] - 2;
  } else {
    if (!(getPoints(student, category) >= pointReqs[category] / 2)) {
      //console.log(getPoints(student, category));
      //console.log("frffr");
      return false;
    }
  }
  return true;
}

export function metRequirements(student) {
  if (!categoryMet(student, "Chapter")) {
    return false;
  } else {
    let missingReqs = 0;
    for (let category of categories) {
      if (missingReqs >= 2) {
        return false;
      }
      if (!categoryMet(student, category)) {
        //console.log(student["Student"], category);
        missingReqs += 1;
      }
    }
  }
  return true;
}
