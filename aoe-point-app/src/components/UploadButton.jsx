import './UploadButton.css';
import Papa from "papaparse";
import { sendEndSemester, sendMidsemester } from "../util/email";
import { isAlphaNumeric } from "../util/stringUtil";


export default function UploadButton({ setStudents }) {
  const handleFile = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // if it has an alphanumeric eid it's a valid student
        let data = results.data.filter((row) =>
          isAlphaNumeric(row["SIS Login ID"])
        );

        setStudents(data);

        // use these function for the other buttons
        // for (let row of data) {
        //   console.log(sendMidsemester(row));
        //   console.log(sendEndSemester(row));
        // }
      },
    });
  };

  return (
    <>
    <div className="input-container">
      <label className="file-button">
        Choose File
        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          hidden
        />
      </label>
    </div>
      
    </>
    
  );
}
