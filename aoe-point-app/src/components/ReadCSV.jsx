import Papa from "papaparse";

// function to check if a string is alphanumeric
function isAlphaNumeric(str) {
  if (str === undefined) return false;
  // using regular expression to check for alphanumeric characters
  return /^[a-zA-Z0-9]+$/.test(str);
}

// Using current points
function midsemesterCheckInTemplate(row) {
  return `Hi ${row["Student"]}
          eid: ${row["SIS Login ID"]}
          chapter points: ${row["Chapter Current Points"]}
          professional points: ${row["Professional Current Points"]}
          sisterhood points: ${row["Sisterhood Current Points"]}
          philanthropy points: ${row["Philanthropic Current Points"]}
          academic points: ${row["Academic Current Points"]}
          dei points: ${row["DEI Current Points"]}
          interest meeting points: ${row["Interest Meetings Current Points"]}
          recruitment points: ${row["Recruitment Current Points"]}
          ritual points: ${row["Ritual Current Points"]}
          traditional points: ${row["Traditional Current Points"]}
          voting points: ${row["Voting Sessions Current Points"]}
          `;
}

export default function ReadCSV() {
  const handleFile = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // if it has an alphanumeric eid it's a valid student
        let data = results.data.filter((row) =>
          isAlphaNumeric(row["SIS Login ID"])
        );

        for (let row of data) {
          console.log(midsemesterCheckInTemplate(row));
        }
      },
    });
  };

  return <input type="file" accept=".csv" onChange={handleFile} />;
}
