import React from 'react';

function LeftPanel() {
  const rbcData = [
    { type: 'Angled Cells', count: 222, percentage: '67%' },
    { type: 'Borderline Ovalocytes', count: 50, percentage: '20%' },
    { type: 'Burr Cells', count: 87, percentage: '34%' },
  ];

  const wbcData = [
    { type: 'Basophil', count: 222, percentage: '67%' },
    { type: 'Eosinophil', count: 50, percentage: '20%' },
  ];

  return (
    <div>
      <h3>RBC</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Count</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {rbcData.map((item, index) => (
            <tr key={index}>
              <td>{item.type}</td>
              <td>{item.count}</td>
              <td>{item.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>WBC</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Count</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {wbcData.map((item, index) => (
            <tr key={index}>
              <td>{item.type}</td>
              <td>{item.count}</td>
              <td>{item.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeftPanel;
