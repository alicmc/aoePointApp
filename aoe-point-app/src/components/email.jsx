import emailjs from "@emailjs/browser";

const service_id = import.meta.env.VITE_SERVICE_ID;
const template_id = import.meta.env.VITE_TEMPLATE_ID;
const public_key = import.meta.env.VITE_PUBLIC_KEY;
const address = import.meta.env.VITE_ADDRESS;

emailjs.init(public_key);

const categories = [
  "Chapter",
  "Professional",
  "Sisterhood",
  "Philanthropy",
  "DEI",
  "Interest Meeting",
  "Ritual",
  "Voting",
  "Speed Dating", //temporary fix
  "Pref", //temporary fix
];

// Using current points
export function midsemesterCheckInTemplate(student) {
  getExcusedAbsences(student);
  return `Hi ${student["Student"]}
  eid: ${student["SIS Login ID"]}
  chapter points: ${student["Chapter Current Points"]}
  professional points: ${student["Professional Current Points"]}
  sisterhood points: ${student["Sisterhood Current Points"]}
  philanthropy points: ${student["Philanthropic Current Points"]}
  academic points: ${student["Academic Current Points"]}
  dei points: ${student["DEI Current Points"]}
  interest meeting points: ${student["Interest Meetings Current Points"]}
  recruitment points: ${student["Recruitment Current Points"]}
  ritual points: ${student["Ritual Current Points"]}
  traditional points: ${student["Traditional Current Points"]}
  voting points: ${student["Voting Sessions Current Points"]}
  sisterhood excuses: ${student["Sisterhood Excuses"]}
  `;
}

function getExcusedAbsences(student) {
  let current_category = "";
  for (let field in student) {
    for (let category of categories) {
      if (field.includes(category)) {
        current_category = category;
      }
    }
    if (student[field] === "EX") {
      student[`${current_category} Excuses`] =
        (student[`${current_category} Excuses`] || 0) + 1;
    }
  }
  console.log(student);
}

export async function sendMidsemesterCheckin(student) {
  var template_params = {
    title: "Midsemester Check-in",
    name: "AOE Secretary",
    message: midsemesterCheckInTemplate(student),
    email: address,
    time: Date.now(),
  };

  try {
    const result = await emailjs.send(service_id, template_id, template_params);
    console.log("Email sent!", result);
    return result;
  } catch (error) {
    if (error.status === 429) {
      console.error("Rate limit hit - wait before sending more");
    }
    console.error("Email error:", error);
    throw error;
  }
}
