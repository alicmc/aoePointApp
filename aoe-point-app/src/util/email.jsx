import emailjs from "@emailjs/browser";
import { renderToStaticMarkup } from "react-dom/server";
import { PointTable } from "./emailTemplates";

const service_id = import.meta.env.VITE_SERVICE_ID;
const template_id = import.meta.env.VITE_TEMPLATE_ID;
const public_key = import.meta.env.VITE_PUBLIC_KEY;
const address = import.meta.env.VITE_ADDRESS;

emailjs.init(public_key);
export async function sendMidsemester(student) {
  var template_params = {
    student_name: student["Student"],
    point_table: renderToStaticMarkup(<PointTable student={student} />),
    title: "Midsemester Check-in",
    email: address,
  };

  try {
    const result = await emailjs.send(service_id, template_id, template_params);
    console.log("Email sent!", result);
    return result;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

export async function sendEndSemester(student) {
  return;
}
