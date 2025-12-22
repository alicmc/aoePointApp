const service_id = import.meta.env.SERVICE_ID;
const template_id = import.meta.env.TEMPLATE_ID;
const address = import.meta.env.ADDRESS;

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
export default function midsemesterCheckInTemplate(student) {
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
  // code fragment
  var data = {
    service_id: service_id,
    template_id: template_id,
    user_id: "YOUR_PUBLIC_KEY",
    template_params: {
      title: "Midsemester Check-in",
      name: "AOE Secretary",
      message: midsemesterCheckInTemplate(student),
      email: address,
      time: Date.now(),
    },
  };

  $.ajax("https://api.emailjs.com/api/v1.0/email/send", {
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
  })
    .done(function () {
      alert("Your mail is sent!");
    })
    .fail(function (error) {
      alert("Oops... " + JSON.stringify(error));
    });
  // code fragment
}
