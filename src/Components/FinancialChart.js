import React , { Component } from 'react'
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'

class FinancialChart extends Component {
    render() {
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Stock A',
                data: [10, 8, 12, 9, 11, 13, 15, 14, 16, 18, 20, 22],
                borderColor: '#3e95cd',
                fill: false,
              },
              {
                label: 'Stock B',
                data: [7, 9, 11, 10, 8, 12, 14, 15, 13, 16, 17, 19],
                borderColor: '#8e5ea2',
                fill: false,
              },
              {
                label: 'Stock C',
                data: [5, 6, 7, 9, 10, 12, 14, 15, 16, 17, 18, 19],
                borderColor: '#3cba9f',
                fill: false,
              },
            ],
          };
          
          
  
      const options = {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM D'
              }
            }
          }
        }
      };
  
      return (
        <div>
          <Line data={data} options={options} />
        </div>
      );
    }
  }

  export default FinancialChart
  