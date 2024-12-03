import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'

const ExerciseProgressChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.exerciseName),
    datasets: [
      {
        label: 'Progreso de Ejercicio',
        data: data.map((entry) => entry.description),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  }

  return (
    <div>
      <h2>Progreso de Ejercicio</h2>
      <CChartLine data={chartData} />
    </div>
  )
}

export default ExerciseProgressChart
