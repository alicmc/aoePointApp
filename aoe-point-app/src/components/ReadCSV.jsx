import Papa from "papaparse";

// function to check if a string is alphanumeric
function isAlphaNumeric(str) {
  if (str === undefined) return false;
  // using regular expression to check for alphanumeric characters
  return /^[a-zA-Z0-9]+$/.test(str);
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
        let students = data.map((row) => row["Student"]);
        let eids = data.map((row) => row["SIS Login ID"]);
        console.log(students);
        console.log(eids);
      },
    });
  };

  return <input type="file" accept=".csv" onChange={handleFile} />;
}
