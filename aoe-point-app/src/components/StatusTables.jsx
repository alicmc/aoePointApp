import { metRequirements } from "../util/miscUtil";

export function StatusTables(students) {
  return (
    <div className="status-table">
      <h3>Sister Status</h3>

      <div className="wrapper" id="status-wrapper">
        {/* table listing active sisters */}
        <table>
          <thead>
            <tr>
              <th>Active Status</th>
            </tr>
          </thead>

          <tbody>
            {students
              .filter((student) => metRequirements(student))
              .map((student, index) => (
                <tr key={index}>
                  <td>{student.Student}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* table listing passive restricted sisters */}
        <table>
          <thead>
            <tr>
              <th>Passive Restricted Status</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) => !metRequirements(student))
              .map((student, index) => (
                <tr key={index}>
                  <td>{student.Student}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
