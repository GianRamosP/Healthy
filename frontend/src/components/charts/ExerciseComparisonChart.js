import React from 'react'
import { CChartBar } from '@coreui/react-chartjs'

const ExerciseComparisonChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.exerciseName),
    datasets: [
      {
        label: 'Descripción de Ejercicio',
        backgroundColor: '#f87979',
        data: data.map((entry) => entry.description),
      },
    ],
  }

  return (
    <div>
      <h2>Comparación de Ejercicios</h2>
      <CChartBar data={chartData} />
    </div>
  )
}

export default ExerciseComparisonChart
