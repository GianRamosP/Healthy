import React from 'react'
import { CChartPie } from '@coreui/react-chartjs'

const DietCaloriesChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.foodName),
    datasets: [
      {
        data: data.map((entry) => entry.calories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#36A2EB'],
      },
    ],
  }

  return (
    <div>
      <h2>Distribución de Calorías</h2>
      <CChartPie data={chartData} />
    </div>
  )
}

export default DietCaloriesChart
