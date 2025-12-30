import { metRequirements } from "../util/miscUtil";
import "./StatusTables.css";
import { useState } from "react";

export function StatusTables({ students }) {
  const [isDisplayedActive, setIsDisplayedActive] = useState(false);
  const [isDisplayedPassive, setIsDisplayedPassive] = useState(false);


  function displaySisters() {
    if (!isDisplayed) {
      const tableBody = document.querySelector('tbody');
            tableBody.style.display = 'flex';
    }
  }
  
  
  return (
    <div className="status-table">
      <h3>Sister Status</h3>

      <div className="wrapper" id="status-wrapper">
        {/* table listing active sisters */}
        <table>
          <thead>
            <tr>
              <th>
                <div className = "wrapper-header">
                    <div className = "label">
                      Active Status
                    </div>
                    <div className = "button-container">
                      <button onClick = {() => setIsDisplayedActive(!isDisplayedActive)}>Show Sisters</button>
                    </div>
                </div>
                
              </th>
            </tr>
          </thead>
        { isDisplayedActive &&
          (<tbody>
            {students
              .filter((student) => metRequirements(student))
              .map((student, index) => (
                <tr key={index}>
                  <td>{student.Student}</td>
                </tr>
              ))}
          </tbody>)
        }
          
        </table>

        {/* table listing passive restricted sisters */}
        <table>
          <thead>
            <tr>
              <th>
                <div className = "wrapper-header">
                    <div className = "label">
                      Passive-Restricted Status
                    </div>
                    <div className = "button-container">
                      <button onClick = {() => setIsDisplayedPassive(!isDisplayedPassive)} >Show Sisters</button>
                    </div>
                </div>
              </th>
            </tr>
          </thead>
          
          { isDisplayedPassive && 
            (<tbody>
              {students
                .filter((student) => !metRequirements(student))
                .map((student, index) => (
                  <tr key={index}>
                    <td>{student.Student}</td>
                  </tr>
                ))}
            </tbody>)}
        </table>
      </div>
    </div>
  );
}
