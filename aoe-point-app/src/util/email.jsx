import emailjs from "@emailjs/browser";
import { renderToStaticMarkup } from "react-dom/server";
import { PointTable } from "./emailTemplates";
import { metRequirements } from "./miscUtil";

const service_id = import.meta.env.VITE_SERVICE_ID;
const midsem_id = import.meta.env.VITE_MIDSEM_ID;
const endsem_id = import.meta.env.VITE_ENDSEM_ID;
const public_key = import.meta.env.VITE_PUBLIC_KEY;
const address = import.meta.env.VITE_ADDRESS;

emailjs.init(public_key);
export async function sendMidsemester(student) {
  var template_params = {
    student_name: student["Student"],
    point_table: renderToStaticMarkup(<PointTable student={student} />),
    title: "Midsemester Check-in",
    recipient: `${student["SIS Login ID"]}@dukes.jmu.edu`,
  };

  try {
    const result = await emailjs.send(service_id, midsem_id, template_params);
    console.log("Email sent!", result);
    return result;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

export async function sendEndSemester(student) {
  var template_params = {
    student_name: student["Student"],
    point_table: renderToStaticMarkup(<PointTable student={student} />),
    title: "Midsemester Check-in",
    recipient: `${student["SIS Login ID"]}@dukes.jmu.edu`,
    met_requirements: `<strong>You have ${
      metRequirements(student) ? "" : "not"
    } met requirements for this semester.</strong>`,
  };

  try {
    const result = await emailjs.send(service_id, endsem_id, template_params);
    console.log("Email sent!", result);
    return result;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}
