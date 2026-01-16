import "./UploadButton.css";
import Papa from "papaparse";
import { isAlphaNumeric } from "../util/miscUtil";
import { categories } from "../util/miscUtil";

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
}

export function UploadButton({ setStudents, setChecked }) {
  const handleFile = (e) => {
    const file = e.target.files[0];

    // parsing csv
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // if it has an alphanumeric eid it's a valid student
        let data = results.data.filter((student) =>
          isAlphaNumeric(student["SIS Login ID"])
        );

        data.forEach((student) => {
          getExcusedAbsences(student);
        });

        // setting the array of all studentss
        setStudents(data);

        // setting the array for the checkboxes
        let checkedArr = new Array(data.length);
        checkedArr.fill(true);
        setChecked(checkedArr);
      },
    });
  };

  return (
    <>
      <div className="input-container">
        <label className="file-button">
          Choose File
          <input type="file" accept=".csv" onChange={handleFile} hidden />
        </label>
      </div>
    </>
  );
}
