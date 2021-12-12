
// Data-weidgets-Chart 1
export var dwChart1Options: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
      labels: {
      fontColor: '#ddd',  
      boxWidth:40
      }
    },
    tooltips: {
        enabled:false,
        displayColors:false,
      },
    scales: {
      xAxes: [{
        display: false,
        stacked: true,
        
      ticks: {
        beginAtZero:true,
        fontColor: '#ddd'
      },
      gridLines: {
        display: false ,
        color: "rgba(221, 221, 221, 0.08)"
      },
      
      }],
      
      yAxes: [{
        stacked: true,
        display: false,
        ticks: {
          beginAtZero:true,
          fontColor: '#ddd'
        },
        gridLines: {
          display: false ,
          color: "rgba(221, 221, 221, 0.08)"
        },
        }]
       
    }
  
  };
  export var dwChart1Labels: string[] = ['01', '02', '03', '04', '05', '06', '07', '08'];
  export var dwChart1Type = 'bar';
  export var dwChart1Legend = false;
  
  export var dwChart1Data: any[] = [
    { barPercentage: .4, data: [39, 19, 25, 16, 31, 39, 23, 20], label: 'Google' },
    { barPercentage: .4, data: [27, 12, 26, 15, 21, 27, 13, 25], label: 'Facebook' }
  ];
  
  export var dwChart1Colors: Array<any> = [
    
    {
  
      backgroundColor: "#fff",
    },
    {
  
      backgroundColor: "rgba(255, 255, 255, 0.20)",
    },
    
  ];


// Data-weidgets-Chart 2
export var dwChart2Data: Array<any> = [

    { data: [39, 19, 25, 16, 31, 39, 23, 20], label: 'Total Orders' },
  
  ];
  export var dwChart2Labels: Array<any> = ['01', '02', '03', '04', '05', '06', '07', '08'];
  export var dwChart2Options: any = {
    animation: {
      duration: 1000, // general animation time
      easing: 'easeOutBack'
    },
    hover: {
      animationDuration: 1000, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 1000, // animation duration after a resize
    responsive: true,
    tooltips: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
          color: "#f3f3f3",
          drawTicks: false,
        },
        scaleLabel: {
          display: false,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        ticks: {
        beginAtZero:true,
        fontColor: '#4e4e4e'
      },
        display: false,
        gridLines: {
          color: "#f3f3f3",
          drawTicks: false,
        },
        scaleLabel: {
          display: false,
          labelString: 'Value'
        }
      }]
    },
  };
  export var dwChart2Colors: Array<any> = [
  
  
    {
  
      backgroundColor: 'transparent',
      borderColor: '#fff',
      pointRadius :"0",
      pointHoverRadius:"0",
      borderWidth: 5
    },
  
  ];
  export var dwChart2Legend = false;
  export var dwChart2Type = 'line';

  

// Data-weidgets-Chart 3
export var dwChart3Options: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
    labels: {
    fontColor: '#ddd',  
    boxWidth:40
    }
  },
  tooltips: {
      enabled:false,
      displayColors:false,
    },
  scales: {
    xAxes: [{
      display: false,
      stacked: true,
      
    ticks: {
      beginAtZero:true,
      fontColor: '#ddd'
    },
    gridLines: {
      display: false ,
      color: "rgba(221, 221, 221, 0.08)"
    },
    
    }],
    
    yAxes: [{
      stacked: true,
      display: false,
      ticks: {
        beginAtZero:true,
        fontColor: '#ddd'
      },
      gridLines: {
        display: false ,
        color: "rgba(221, 221, 221, 0.08)"
      },
      }]
     
  }

};
export var dwChart3Labels: string[] = ['01', '02', '03', '04', '05', '06', '07', '08'];
export var dwChart3Type = 'bar';
export var dwChart3Legend = false;

export var dwChart3Data: any[] = [
  { barPercentage: .4, data: [27, 12, 26, 15, 21, 27, 13, 25], label: 'Facebook' }
];

export var dwChart3Colors: Array<any> = [
  {

    backgroundColor: "rgba(255, 255, 255, 0.20)",
  },
  
];



// Data-weidgets-Chart 4
export var dwChart4Data: Array<any> = [

  { data: [39, 19, 35, 25, 31, 45], label: 'Total Orders' },

];
export var dwChart4Labels: Array<any> = ['01', '02', '03', '04', '05', '06'];
export var dwChart4Options: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  tooltips: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      ticks: {
      beginAtZero:true,
      fontColor: '#4e4e4e'
    },
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Value'
      }
    }]
  },
};
export var dwChart4Colors: Array<any> = [


  {

    backgroundColor: 'rgba(255, 255, 255, 0.2',
    borderColor: '#fff',
    pointRadius :"0",
    pointHoverRadius:"0",
    borderWidth: 5
  },

];
export var dwChart4Legend = false;
export var dwChart4Type = 'line';


// Data-weidgets-Chart 5
export var dwChart5Data: Array<any> = [

  { data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630], label: 'Total Orders' },

];
export var dwChart5Labels: Array<any> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
export var dwChart5Options: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  tooltips: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      ticks: {
      beginAtZero:true,
      fontColor: '#4e4e4e'
    },
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Value'
      }
    }]
  },
};
export var dwChart5Colors: Array<any> = [


  {

    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: '#fff',
    pointRadius :"0",
    pointHoverRadius:"0",
    borderWidth: 5
  },

];
export var dwChart5Legend = false;
export var dwChart5Type = 'line';


// Data-weidgets-Chart 9
export var dwChart9Data: Array<any> = [

  { data: [50, 150, 100, 190, 130, 90, 100, 190, 120, 140], label: 'Total Orders' },

];
export var dwChart9Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
export var dwChart9Options: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  tooltips: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      ticks: {
      beginAtZero:true,
      fontColor: '#4e4e4e'
    },
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Value'
      }
    }]
  },
};
export var dwChart9Colors: Array<any> = [


  {

    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: '#fff',
    pointBackgroundColor:'#000',
    pointHoverBackgroundColor:'#fff',
    pointBorderColor :'#fff',
    pointHoverBorderColor :'#fff',
    //lineTension: "5",
    pointBorderWidth :2,
    pointRadius :0,
    pointHoverRadius :4,
    borderWidth: 2,
  },

];
export var dwChart9Legend = false;
export var dwChart9Type = 'line';


// Data-weidgets-Chart 10
export var dwChart10Data: Array<any> = [

  { data: [50, 150, 100, 190, 130, 90, 100, 190, 120, 140], label: 'Total Orders' },

];
export var dwChart10Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
export var dwChart10Options: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  tooltips: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      ticks: {
      beginAtZero:true,
      fontColor: '#4e4e4e'
    },
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Value'
      }
    }]
  },
};
export var dwChart10Colors: Array<any> = [


  {

    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: '#fff',
    pointBackgroundColor:'#000',
    pointHoverBackgroundColor:'#fff',
    pointBorderColor :'#fff',
    pointHoverBorderColor :'#fff',
    //lineTension: "5",
    pointBorderWidth :2,
    pointRadius :0,
    pointHoverRadius :4,
    borderWidth: 2,
  },

];
export var dwChart10Legend = false;
export var dwChart10Type = 'line';



// Data-weidgets-Chart 11
export var dwChart11Data: Array<any> = [

  { data: [50, 150, 100, 190, 130, 90, 100, 190, 120, 140], label: 'Total Orders' },

];
export var dwChart11Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
export var dwChart11Options: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  tooltips: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      ticks: {
      beginAtZero:true,
      fontColor: '#4e4e4e'
    },
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Value'
      }
    }]
  },
};
export var dwChart11Colors: Array<any> = [


  {

    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: '#fff',
    pointBackgroundColor:'#000',
    pointHoverBackgroundColor:'#fff',
    pointBorderColor :'#fff',
    pointHoverBorderColor :'#fff',
    //lineTension: "5",
    pointBorderWidth :2,
    pointRadius :0,
    pointHoverRadius :4,
    borderWidth: 2,
  },

];
export var dwChart11Legend = false;
export var dwChart11Type = 'line';



// Data-weidgets-Chart 12
export var dwChart12Data: Array<any> = [

  { data: [50, 150, 100, 190, 130, 90, 100, 190, 120, 140], label: 'Total Orders' },

];
export var dwChart12Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
export var dwChart12Options: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  tooltips: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      ticks: {
      beginAtZero:true,
      fontColor: '#4e4e4e'
    },
      display: false,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Value'
      }
    }]
  },
};
export var dwChart12Colors: Array<any> = [


  {

    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: '#fff',
    pointBackgroundColor:'#000',
    pointHoverBackgroundColor:'#fff',
    pointBorderColor :'#fff',
    pointHoverBorderColor :'#fff',
    //lineTension: "5",
    pointBorderWidth :2,
    pointRadius :0,
    pointHoverRadius :4,
    borderWidth: 2,
  },

];
export var dwChart12Legend = false;
export var dwChart12Type = 'line';