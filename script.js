const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        };
    });
};

const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.75
})



document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelectorAll('section')

    content.forEach((item) => {
        observer.observe(item)
    });
})

const refresh = () => {
    document.getElementsByTagName('section')[0].scrollIntoView({behavior:"smooth"})
}




let url = "https://raw.githubusercontent.com/rafaelmelom-dev/diabete_website/main/diabetes.json"

fetch(url)
.then(res => res.json())
.then(data => {
  var labels = []
   
  for (let i = 0; i < data.Pregnancies.length; i ++) {

    if (!labels.includes(data.Pregnancies[i])) {
      labels.push(data.Pregnancies[i])
    }
    labels = labels.sort((a, b) => a - b)

  };

  const OutcomeData = {0:[], 1:[]};

  const filterData = (out, preg) => {

    const filteredData = data.Pregnancies.filter((_, index) => {
      return data.Outcome[index] === out && data.Pregnancies[index] === preg;
    });

    return filteredData.length
  }

  labels.forEach((i) => {
    for (let j = 0; j < 2; j ++) {
      OutcomeData[j].push(filterData(j, i))
    }
  })
  
  
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
  const setup = {
  type:'bar',
  data: {
    labels: labels,
    datasets: [
      {
        label: "Não-diabetes(0)",
        data: OutcomeData[0],
        backgroundColor: "rgba(149, 55, 204, 0.7)",
        borderColor: "rgba(229, 52, 235, 1)"
      },
      {
        label:"Diabetes(1)",
        data: OutcomeData[1],
        backgroundColor: "rgba(229, 52, 235, 0.7)",
        borderColor: "rgba(149, 55, 204, 1)"
      }
    ]
  },
  options: {
    indexAxis:'y',
    responsive: true,
    plugins: {
      legend : {
        position: "bottom"
      },
      title :{
        display: true,
        text: "Pregnancies by Outcome",
        color:'rgb(149, 55, 204)'
      },
      tooltip:{
        callbacks :{
          title: function(item, data) {
            return "Gravidez: " + item[0].label
          }
        }
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'X Label'
        }
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Y Label'
        }
      }
    }
  }
}

if (screenWidth > 550) {
  setup.options.indexAxis = null
}

const myChart = new Chart(
  document.getElementById('chartdiv').getContext('2d'),
  setup
  )
});
