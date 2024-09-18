import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Chart.js plaginlarini ro'yxatdan o'tkazamiz
ChartJS.register(LineElement, CategoryScale, LinearScale);

const SalesChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/admin/orders/sales-data');
        const { data } = result;

        setChartData({
          labels: data.map(item => item.date), // Kunlar
          datasets: [
            {
              label: 'Total Sales',
              data: data.map(item => item.totalSales), // Sotuv miqdorlari
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Sales Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default SalesChart;
