import { Component, OnInit, ViewChild } from '@angular/core';
import * as chartsData from '../../shared/data/widgets-data';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';


import {
  ChartComponent,
  ApexChart,
  ApexAnnotations,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexStates,
  ApexTitleSubtitle,
  ApexTheme,
  ApexMarkers
} from "ng-apexcharts";


export type ChartOptions = {
    chart: ApexChart;
    annotations: ApexAnnotations;
    colors: string[];
    dataLabels: ApexDataLabels;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    stroke: ApexStroke;
    labels: string[];
    legend: ApexLegend;
    fill: ApexFill;
    tooltip: ApexTooltip;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    grid: ApexGrid;
    states: ApexStates;
    title: ApexTitleSubtitle;
    subtitle: ApexTitleSubtitle;
    theme: ApexTheme;
    markers: ApexMarkers
};




@Component({
  selector: 'app-data-widgets',
  templateUrl: './data-widgets.component.html',
  styleUrls: ['./data-widgets.component.scss']
})
export class DataWidgetsComponent implements OnInit {


  
  @ViewChild("chart-8") chart8: ChartComponent;
  @ViewChild("chart-13") chart13: ChartComponent;
  @ViewChild("chart-14") chart14: ChartComponent;
  @ViewChild("chart-15") chart15: ChartComponent;
  @ViewChild("chart-16") chart16: ChartComponent;
  @ViewChild("chart-17") chart17: ChartComponent;
  @ViewChild("chart-18") chart18: ChartComponent;
  @ViewChild("chart-19") chart19: ChartComponent;
  @ViewChild("chart-20") chart20: ChartComponent;
  @ViewChild("chart-21") chart21: ChartComponent;
  @ViewChild("chart-22") chart22: ChartComponent;
  @ViewChild("chart-23") chart23: ChartComponent;

  public chart8Options: Partial<ChartOptions>;
  public chart13Options: Partial<ChartOptions>;
  public chart14Options: Partial<ChartOptions>;
  public chart15Options: Partial<ChartOptions>;
  public chart16Options: Partial<ChartOptions>;
  public chart17Options: Partial<ChartOptions>;
  public chart18Options: Partial<ChartOptions>;
  public chart19Options: Partial<ChartOptions>;
  public chart20Options: Partial<ChartOptions>;
  public chart21Options: Partial<ChartOptions>;
  public chart22Options: Partial<ChartOptions>;
  public chart23Options: Partial<ChartOptions>;

  
  // Data-weidgets-Chart 1
  public dwChart1Data = chartsData.dwChart1Data;
  public dwChart1Labels = chartsData.dwChart1Labels;
  public dwChart1Options = chartsData.dwChart1Options;
  public dwChart1Colors = chartsData.dwChart1Colors;
  public dwChart1Legend = chartsData.dwChart1Legend;
  public dwChart1Type = chartsData.dwChart1Type;

  
  // Data-weidgets-Chart 2
  public dwChart2Data = chartsData.dwChart2Data;
  public dwChart2Labels = chartsData.dwChart2Labels;
  public dwChart2Options = chartsData.dwChart2Options;
  public dwChart2Colors = chartsData.dwChart2Colors;
  public dwChart2Legend = chartsData.dwChart2Legend;
  public dwChart2Type = chartsData.dwChart2Type;


  
  // Data-weidgets-Chart 4
  public dwChart4Data = chartsData.dwChart4Data;
  public dwChart4Labels = chartsData.dwChart4Labels;
  public dwChart4Options = chartsData.dwChart4Options;
  public dwChart4Colors = chartsData.dwChart4Colors;
  public dwChart4Legend = chartsData.dwChart4Legend;
  public dwChart4Type = chartsData.dwChart4Type;

  
  // Data-weidgets-Chart 5
  public dwChart5Data = chartsData.dwChart5Data;
  public dwChart5Labels = chartsData.dwChart5Labels;
  public dwChart5Options = chartsData.dwChart5Options;
  public dwChart5Colors = chartsData.dwChart5Colors;
  public dwChart5Legend = chartsData.dwChart5Legend;
  public dwChart5Type = chartsData.dwChart5Type;


  
  // Data-weidgets-Chart 9
  public dwChart9Data = chartsData.dwChart9Data;
  public dwChart9Labels = chartsData.dwChart9Labels;
  public dwChart9Options = chartsData.dwChart9Options;
  public dwChart9Colors = chartsData.dwChart9Colors;
  public dwChart9Legend = chartsData.dwChart9Legend;
  public dwChart9Type = chartsData.dwChart9Type;


  
  // Data-weidgets-Chart 10
  public dwChart10Data = chartsData.dwChart10Data;
  public dwChart10Labels = chartsData.dwChart10Labels;
  public dwChart10Options = chartsData.dwChart10Options;
  public dwChart10Colors = chartsData.dwChart10Colors;
  public dwChart10Legend = chartsData.dwChart10Legend;
  public dwChart10Type = chartsData.dwChart10Type;

  
  // Data-weidgets-Chart 11
  public dwChart11Data = chartsData.dwChart11Data;
  public dwChart11Labels = chartsData.dwChart11Labels;
  public dwChart11Options = chartsData.dwChart11Options;
  public dwChart11Colors = chartsData.dwChart11Colors;
  public dwChart11Legend = chartsData.dwChart11Legend;
  public dwChart11Type = chartsData.dwChart11Type;


  
  // Data-weidgets-Chart 12
  public dwChart12Data = chartsData.dwChart12Data;
  public dwChart12Labels = chartsData.dwChart12Labels;
  public dwChart12Options = chartsData.dwChart12Options;
  public dwChart12Colors = chartsData.dwChart12Colors;
  public dwChart12Legend = chartsData.dwChart12Legend;
  public dwChart12Type = chartsData.dwChart12Type;

  

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  constructor() {

    
    // Chart 8 Options
    this.chart8Options = {
      chart: {
          width: 300,
          type: 'pie',
          foreColor: 'rgba(255, 255, 255, 0.85)',
      },
      dataLabels: {
          enabled: true
      },
      series: [90, 85, 70, 65],
      tooltip: {
            enabled: false,
            theme: 'dark',
        },
      colors: ["#ffffff", "rgba(255, 255, 255, 0.55)", 'rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.15)'],
      legend: {
        show:false,
          formatter: function(val, opts) {
              return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
      },
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 280
              },
              legend: {
                  position: 'bottom'
              }
          }
      }]

    }

    
    // Chart 13 Options
    this.chart13Options = {

      
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
           hollow: {
            margin: 0,
            size: '70%',
            background: 'rgba(255, 255, 255, 0.0)',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.12)',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#fff',
              fontSize: '17px'
            },
            value: {
              formatter: function(val) {
                return "75";
              },
              color: '#fff',
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#fff'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [75],
      stroke: {
        lineCap: 'round'
      },
      labels: ['Percent'],
    }

    
    // Chart 14 Options
    this.chart14Options = {
      
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -240,
          endAngle: 120,
           hollow: {
            margin: 0,
            size: '70%',
			//background: '#000',
            image: 'assets/images/products/clock.png',
		    imageWidth: 64,
		    imageHeight: 64,
			imageClipped: false
          },
          track: {
            background: 'rgba(255, 255, 255, 0.12)',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: false,
              color: '#fff',
              fontSize: '17px'
            },
            value: {
              color: '#fff',
              fontSize: '36px',
              show: false,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#fff'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [75],
      stroke: {
        lineCap: 'round'
      },
      labels: ['Percent'],

    }

    
    // Chart 15 Options
    this.chart15Options = {
      
      chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
  hollow: {
    margin: 10,
    size: '50%',
    background: 'rgba(0, 0, 0, 0.0)'
    },
            startAngle: -225,
            endAngle: 135,
            dataLabels: {
                name: {
                    fontSize: '14px',
                    color: '#fff',
                    offsetY: -10
                },
                value: {
                    offsetY: 0,
                    fontSize: '22px',
                    color: '#fff',
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            },
            track: {
              background: '#fff',
              strokeWidth: '0%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
        },
    },
    stroke: {
        dashArray: 4
    },
    fill: {
      type: 'gradient',
      gradient: {
      shade: 'dark',
      type: 'horizontal',//
      shadeIntensity: 0.5,//0.15
      gradientToColors: ['#fff'],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91]

    }
 }, colors: ["#fff"],
    series: [87],
    labels: ['Median Ratio'],
    
      
    }

    
    // Chart 16 Options
    this.chart16Options = {
      
      chart: {
        height: 220,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          //startAngle: -100,
          //endAngle: 260,
           hollow: {
            margin: 0,
            size: '70%',
            background: 'transparent',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.12)',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
			  color: 'rgba(242, 14, 108, 0.65)',
              opacity: 0.5
            }
          },

          dataLabels: { 
            show: true,
            name: {
              offsetY: -5,
              show: true,
              color: '#fff',
              fontSize: '14px'
            },
            value: {
              formatter: function (val) {
						return val + "%";
					},
              color: '#fff',
              fontSize: '20px',
              show: true,
			  offsetY: 10,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#fff'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [80],
      stroke: {
        lineCap: 'round'
      },
      labels: ['Total'],
      
    }

    
    // Chart 17 Options
    this.chart17Options = {
      
      chart: {
        height: 220,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          //startAngle: -135,
          //endAngle: 225,
           hollow: {
            margin: 0,
            size: '70%',
            background: 'transparent',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,

              opacity: 0.24
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.12)',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
			  color: 'rgba(0, 169, 255, 0.65)',
              opacity: 0.35
            }
          },

          dataLabels: { 
            show: true,
            name: {
              offsetY: -5,
              show: true,
              color: '#fff',
              fontSize: '14px'
            },
            value: {
              formatter: function (val) {
						return val + "%";
					},
              color: '#fff',
              fontSize: '20px',
              show: true,
			  offsetY: 10,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#fff'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [55],
      stroke: {
        lineCap: 'round'
      },
      labels: ['Total'],
      
    }

    
    // Chart 18 Options
    this.chart18Options = {
      
      chart: {
        height: 220,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          //startAngle: -135,
          //endAngle: 225,
           hollow: {
            margin: 0,
            size: '70%',
            background: 'transparent',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.12)',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
			  color: 'rgba(254, 197, 7, 0.55)',
              opacity: 0.55
            }
          },

          dataLabels: { 
            show: true,
            name: {
              offsetY: -5,
              show: true,
              color: '#fff',
              fontSize: '14px'
            },
            value: {
              formatter: function (val) {
						return val + "%";
					},
              color: '#fff',
              fontSize: '20px',
              show: true,
			  offsetY: 10,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#fff'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [65],
      stroke: {
        lineCap: 'round'
      },
      labels: ['Total'],
      
    }

    
    // Chart 19 Options
    this.chart19Options = {
      
      chart: {
        height: 220,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
         // startAngle: -135,
          //endAngle: 225,
           hollow: {
            margin: 0,
            size: '70%',
            background: 'transparent',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.12)',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
			  color: 'rgba(0, 128, 0, 0.56)',
              opacity: 0.35
            }
          },

          dataLabels: { 
            show: true,
            name: {
              offsetY: -5,
              show: true,
              color: '#fff',
              fontSize: '14px'
            },
            value: {
              formatter: function (val) {
						return val + "%";
					},
              color: '#fff',
              fontSize: '20px',
              show: true,
			  offsetY: 10,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#fff'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [75],
      stroke: {
        lineCap: 'round'
      },
      labels: ['Total'],
      
    }

    
    // Chart 20 Options
    this.chart20Options = {
      
      chart: {
        height: 250,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            //startAngle: -135,
            //endAngle: 135,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: 'rgba(255, 255, 255, 0.12)',
              strokeWidth: '0%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
                name: {
                    fontSize: '14px',
                    color: '#fff',
                    offsetY: -5
                },
                value: {
                    offsetY: 0,
                    fontSize: '20px',
                    color: '#fff',
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
  gradientToColors: ['#fff'],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
    },
    stroke: {
        dashArray: 4
    },
colors: ["#fff"],
    series: [82],
    labels: ['Total'],
      
    }

    
    // Chart 21 Options
    this.chart21Options = {

      
      chart: {
        height: 250,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            //startAngle: -135,
            //endAngle: 135,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: 'rgba(255, 255, 255, 0.12)',
              strokeWidth: '0%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
                name: {
                    fontSize: '14px',
                    color: '#fff',
                    offsetY: -10
                },
                value: {
                    offsetY: 0,
                    fontSize: '20px',
                    color: '#fff',
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            gradientToColors: ['#fff'],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
    },
    stroke: {
        dashArray: 4
    },
    colors: ["#fff"],
    series: [85],
    labels: ['Total'],
      
    }


    
    // Chart 22 Options
    this.chart22Options = {

      
      chart: {
        height: 250,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            //startAngle: -135,
            //endAngle: 135,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: 'rgba(255, 255, 255, 0.12)',
              strokeWidth: '0%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
                name: {
                    fontSize: '14px',
                    color: '#fff',
                    offsetY: -10
                },
                value: {
                    offsetY: 0,
                    fontSize: '20px',
                    color: '#fff',
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            gradientToColors: ['#fff'],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
    },
    stroke: {
        dashArray: 4
    },
    colors: ["#fff"],
    series: [79],
    labels: ['Total'],
      
    }

    
    // Chart 23 Options
    this.chart23Options = {
      
      
      chart: {
        height: 250,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            //startAngle: -135,
            //endAngle: 135,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: 'rgba(255, 255, 255, 0.12)',
              strokeWidth: '0%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
                name: {
                    fontSize: '14px',
                    color: '#fff',
                    offsetY: -10
                },
                value: {
                    offsetY: 0,
                    fontSize: '20px',
                    color: '#fff',
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            gradientToColors: ['#fff'],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
    },
    stroke: {
        dashArray: 4
    },
    colors: ["#fff"],
    series: [90],
    labels: ['Total'],
    }


   }

  ngOnInit() {
    $.getScript('./assets/js/data-widgets.js');

  }

}