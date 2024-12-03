// DietProgressChart.js
import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'

const DietProgressChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: 'Ingesta Calórica',
        data: data.map((entry) => entry.calories),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  }

  return (
    <div>
      <h2>Progreso de la Dieta</h2>
      <CChartLine data={chartData} />
    </div>
  )
}

export default DietProgressChart
