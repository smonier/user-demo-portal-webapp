import { faker } from '@faker-js/faker';
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const multiChartData = {
    contents : {
        title:"Multi Bars Annual Graph"
    },
    data : {
        datasets: [
            {
              type: 'line',
              label: 'Global Sales',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
              fill: false,
              data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            },
            {
              type: 'bar',
              label: 'Auto',
              backgroundColor: '#3490de',
              data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
              borderColor: 'white',
              borderWidth: 2,
            },
            {
              type: 'bar',
              label: 'Home',
              backgroundColor: '#2d2e87',
              data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            },
            {
              type: 'bar',
              label: 'Health',
              backgroundColor: '#9ac31c',
              data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            },
          ],
        labels: labels
    }
};
