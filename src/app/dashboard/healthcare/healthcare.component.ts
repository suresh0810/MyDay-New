import { Component, OnInit, ViewChild } from '@angular/core';
import * as chartsData from '../../shared/data/healthcare';

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
  selector: 'app-healthcare',
  templateUrl: './healthcare.component.html',
  styleUrls: ['./healthcare.component.scss']
})
export class HealthcareComponent implements OnInit {

  
  @ViewChild("chart-2") chart2: ChartComponent;
  @ViewChild("chart-3") chart3: ChartComponent;
  @ViewChild("chart-4") chart4: ChartComponent;
  @ViewChild("chart-5") chart5: ChartComponent;
  @ViewChild("chart-6") chart6: ChartComponent;


  public chart2Options: Partial<ChartOptions>;
  public chart3Options: Partial<ChartOptions>;
  public chart4Options: Partial<ChartOptions>;
  public chart5Options: Partial<ChartOptions>;
  public chart6Options: Partial<ChartOptions>;

  constructor() {
    
    // Chart 2 Options
    this.chart2Options = {
      
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
              show: false
            },
      foreColor: 'rgba(255, 255, 255, 0.65)',
      },
      plotOptions: {
          bar: {
            endingShape: 'rounded',
            distributed: true,
              horizontal: true,
          }
      },
      dataLabels: {
          enabled: true
      },
        series: [{
          name: 'Time',
            data: [20, 35, 30, 15, 28, 36, 42]
        }],
        xaxis: {
            categories: ['Cardiology', 'Dermatology', 'Gynaecology', 'Neurology', 'Oncology', 'Orthopaedics', 'Surgery'],
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                gradientToColors: [ '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityTo: 0.9,
      opacityFrom: 0.2,
                stops: [0, 100, 100, 100]
            },
        },
        colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
    grid:{
            show: true,
            borderColor: 'rgba(255, 255, 255, 0.15)',
        },
        tooltip: {
            theme: 'dark',
            x:{
              show: true,
            },
            y: {
                formatter: function (val) {
                    return "20Min"
                }
            }
        },
        legend: {
          show: false,
        }

    }

    
    // Chart 3 Options
    this.chart3Options = {
      
      chart: {
        height: 240,
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
            size: '85%',
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
              //color: 'rgba(246, 181, 49, 0.65)',
              opacity: 0.12
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.15)',
            strokeWidth: '30%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
			  //color: 'rgba(246, 181, 49, 0.65)',
              opacity: 0.12
            }
          },

          dataLabels: { 
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: '#fff',
              fontSize: '15px'
            },
            value: {
              formatter: function (val) {
						return val + "%";
					},
              color: '#fff',
              fontSize: '35px',
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
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [64],
      stroke: {
        //lineCap: 'round',
        dashArray: 4
      },
      labels: ['Excellent'],
    }

    
    // Chart 4 Options
    this.chart4Options = {
      
      chart: {
        height: 240,
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
            size: '85%',
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
              //color: 'rgba(209, 58, 223, 0.65)',
              opacity: 0.12
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.15)',
            strokeWidth: '30%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
			  //color: 'rgba(209, 58, 223, 0.65)',
              opacity: 0.12
            }
          },

          dataLabels: { 
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: '#fff',
              fontSize: '15px'
            },
            value: {
              formatter: function (val) {
						return val + "%";
					},
              color: '#fff',
              fontSize: '35px',
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
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [68],
      stroke: {
        //lineCap: 'round',
        dashArray: 4
      },
      labels: ['Good'],

    }

    // Chart 5 Options
    this.chart5Options = {

      
      chart: {
        height: 240,
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
            size: '85%',
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
              //color: 'rgba(209, 58, 223, 0.65)',
              opacity: 0.12
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.15)',
            strokeWidth: '30%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
			  //color: 'rgba(209, 58, 223, 0.65)',
              opacity: 0.12
            }
          },

          dataLabels: { 
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: '#fff',
              fontSize: '15px'
            },
            value: {
              formatter: function (val) {
						return val + "%";
					},
              color: '#fff',
              fontSize: '35px',
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
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [82],
      stroke: {
        //lineCap: 'round',
        dashArray: 4
      },
      labels: ['Positive'],

    }


    
    // Chart 6 Options
    this.chart6Options = {

      
      chart: {
        height: 240,
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
            size: '85%',
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
              //color: 'rgba(8, 165, 14, 0.65)',
              opacity: 0.12
            }
          },
          track: {
            background: 'rgba(255, 255, 255, 0.15)',
            strokeWidth: '30%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
			  //color: 'rgba(8, 165, 14, 0.65)',
              opacity: 0.12
            }
          },

          dataLabels: { 
            show: true,
            name: {
              offsetY: -20,
              show: true,
              color: '#fff',
              fontSize: '15px'
            },
            value: {
              formatter: function (val) {
						return val + "%";
					},
              color: '#fff',
              fontSize: '35px',
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
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      colors: ["#fff"],
      series: [74],
      stroke: {
        //lineCap: 'round',
        dashArray: 4
      },
      labels: ['Negative'],

      
    }


    

   }

  
  // Chart 1
  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;


  
  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }


  ngOnInit(): void {
  }

}
