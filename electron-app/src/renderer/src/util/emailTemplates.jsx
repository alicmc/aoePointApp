import { categories, pointReqs } from './miscUtil'

// need inline HTML for the email to render correctly
// if u wanna do it differently we can try it out tho
export function PointTable({ student }) {
  const thStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
    background: '#f2f2f2',
    fontWeight: 'bold'
  }

  const tdStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#d2d1d1ff'
  }

  return (
    <div style={{ margin: '16px 0' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px'
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
              <td style={tdStyle}>{Number(student[`${category} Current Points`]) || 0}</td>
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
  )
}

export function MidSemTemplate({ student_name, point_table }) {
  return `<div style="max-width:600px;margin:0 auto;padding:24px;font-family:Arial,sans-serif;background:#ffffff;color:#000;">
  <div style="margin-bottom:24px;">
    <p style="margin-bottom:16px;">Hello ${student_name},</p>
    <p style="margin-bottom:16px;">
      Below is a summary of your current point status in each category:
    </p>
  </div>

  ${point_table}

  <div style="font-size:12px;line-height:1.5;margin-top:16px;">
    <p>*points earned includes bonus points</p>
    <p>
      **academic point of 1 means you have earned all 15, check GCM for your
      current total
    </p>

    <p style="margin-top:16px;">
      Please keep this in mind for the final point check at the end of the
      semester:
    </p>

    <p>
      In order for a category to count as excused,
      <strong>
        the number of points earned + the number of events excused must equal
        the total number of events hosted.
      </strong>
      For example, there were 4 professional events. To reach the point
      requirement, you had to attend 3 of these events. If you only attended
      2 events, you would need to have submitted excuses for the other 2
      events in order to excuse this category.
    </p>

    <p style="margin-top:16px;">
      If you have any questions, please feel free to email
      <a href="mailto:jmuaoesecretary@gmail.com" style="color:#0066cc;">
        jmuaoesecretary@gmail.com
      </a>
      or text me
    </p>

    <p style="margin-top:16px;">Best,</p>
    <div style="margin-top:8px;">
      <p>Secretary,</p>
      <p>Gamma Alpha Chapter of Alpha Omega Epsilon</p>
    </div>
  </div>
</div>
`
}

export function EndSemTemplate({ student_name, point_table, met_reqs }) {
  return `<div style="max-width: 600px; margin: 0 auto; padding: 24px; font-family: Arial,sans-serif; background: #ffffff; color: #000;">
<div style="margin-bottom: 24px;">
<p style="margin-bottom: 16px;">Hello ${student_name},</p>
<p style="margin-bottom: 16px;">Below is a summary of your current point status in each category:</p>
</div>
${point_table}
<div style="font-size: 12px; line-height: 1.5; margin-top: 16px;">
<p>*points earned includes bonus points</p>
<p>**academic point of 1 means you have earned all 15, check GCM for your current total</p>
<p>${met_reqs}</p>
<p>Excessive unexcused absences are defined as missing half or more of the required points for two or more categories OR not reaching the Chapter point requirements. <strong>One semester of excessive unexcused absences will result in an automatic Active-Passive (Restricted) status for that semester.</strong></p>
<p>In order for a category to count as excused, <strong> the number of points earned + the number of events excused must equal the total number of events hosted. </strong> For example, there were 4 professional events. To reach the point requirement, you had to attend 3 of these events. If you only attended 2 events, you would need to have submitted excuses for the other 2 events in order to excuse this category.</p>
<p style="margin-top: 16px;">If you have any questions, please feel free to email <a style="color: #0066cc;" href="mailto:jmuaoesecretary@gmail.com"> jmuaoesecretary@gmail.com </a> or text me</p>
<p style="margin-top: 16px;">Best,</p>
<div style="margin-top: 8px;">
<p>Secretary,</p>
<p>Gamma Alpha Chapter of Alpha Omega Epsilon</p>
</div>
</div>
</div>`
}
