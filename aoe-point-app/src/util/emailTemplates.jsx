import { categories, pointReqs } from "./miscUtil";

// need inline HTML for the email to render correctly
// if u wanna do it differently we can try it out tho
export function PointTable({ student }) {
  const thStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
    background: "#f2f2f2",
    fontWeight: "bold",
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
  };

  return (
    <div style={{ margin: "16px 0" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Point Category</th>
            <th style={thStyle}>Point Requirement</th>
            <th style={thStyle}>Points Earned*</th>
            <th style={thStyle}>Excuses</th>
            <th style={thStyle}>Remaining Needed</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category}>
              <td style={tdStyle}>{category}</td>
              <td style={tdStyle}>{pointReqs[category]}</td>
              <td style={tdStyle}>
                {Number(student[`${category} Current Points`]) || 0}
              </td>
              <td style={tdStyle}>{student[`${category} Excuses`] ?? 0}</td>
              <td style={tdStyle}>
                {Math.max(
                  0,
                  pointReqs[category] -
                    (student[`${category} Current Points`] ?? 0) -
                    (student[`${category} Excuses`] ?? 0)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
