import { renderToStaticMarkup } from 'react-dom/server'
import { EndSemTemplate, MidSemTemplate, PointTable } from './emailTemplates'
import { metRequirements } from './miscUtil'

const backend_url = 'http://localhost:4000'

export async function sendMidsemester(student) {
  const html = renderToStaticMarkup(<PointTable student={student} />)
  const to = `${student['SIS Login ID']}@dukes.jmu.edu`

  try {
    const response = await fetch(`${backend_url}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        subject: 'Midsemester Check-in',
        html: MidSemTemplate({
          student_name: student['Student'],
          point_table: html
        })
      })
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const result = await response.json()
    console.log('Email sent!', result)
    return result
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}

export async function sendEndSemester(student) {
  const html = renderToStaticMarkup(<PointTable student={student} />)
  const to = `${student['SIS Login ID']}@dukes.jmu.edu`
  const metReqs = metRequirements(student)

  try {
    const response = await fetch(`${backend_url}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        subject: 'End of Semester Check-in',
        html: EndSemTemplate({
          student_name: student['Student'],
          point_table: html,
          met_reqs: `<p><strong>You have ${metReqs ? '' : 'not'} met requirements for this semester.</strong></p>`
        })
      })
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const result = await response.json()
    console.log('Email sent!', result)
    return result
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}
