import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Chart } from 'chart.js';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { jobRemain, jobRemain2 } from '../model/user.model';
import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip,
  ApexFill,
  
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
  fill: ApexFill;

};
export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};
@Component({
  selector: 'app-roic',
  templateUrl: './roic.component.html',
  styleUrls: ['./roic.component.scss']
})
export class RoicComponent implements OnInit {
  public pClsChart: Partial<ChartOptions2>;
  public chartOptions1: Partial<ChartOptions2>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  budjets = [
    { value: ['', ''], viewValue: 'ทั้งหมด' },
    { value: ['I-60-B', '.BY.'], viewValue: 'I60.BY' },
    { value: ['I-62-B', '.BY.'], viewValue: 'I62.BY' },
    { value: ['I-62-B', '.TR.'], viewValue: 'I62.TR' },
  ];
  unit=' kVA';
  myBarClsd: Chart;
  myBar3: Chart;
  peaname = {};
  peaname2 = [];
  selBudjet = ['', ''];
  selPea = '';
  selPeaName = 'กฟน.2';
  selPeapeaCode = '';
  selPeapeaCode2 = 'B000';
  currentMatherPea = "";
  currentPea = "";
  peaCode = "";
  peaNum: string;
  progressBar: Chart;
  progressBarN2: Chart;
  progressWorkCostBar: Chart;
  progressMatCostBar: Chart;
  trBar: Chart;
  trBarN2: Chart;
  roicp = {};
  kvaPlnTotal = 0;
  kvaTotal = 0;
  kvaD1Total = 0;
  graphChoice='kva';
  workCostActTRTotal: number;
  workCostActBYTotal: number;
  workCostActTotal: number;
  workCostPlnTotal: number;
  matCostActTotal: number;
  matCostPlnTotal: number;
  roicdate: string;
  car:string;
  displayedColumns = ['wbs', 'jobName', 'workCostPln', 'workCostAct', 'percent', 'jobStatus', 'userStatus'];
  displayedColumns2 = ['wbs', 'jobName', 'workCostPln', 'workCostAct', 'percent', 'jobStatus', 'userStatus'];
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('paginator2', { static: false }) paginator2: MatPaginator;
  @ViewChild('sort', { static: true }) sort: MatSort;
  @ViewChild('sort2', { static: false }) sort2: MatSort;

  public dataSource = new MatTableDataSource<jobRemain>();
  public dataSource2 = new MatTableDataSource<jobRemain2>();

  constructor(private configService: ConfigService) {

    this.getpeaList();
    this.getpeaList2();

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;

    this.dataSource.sort = this.sort;
    this.dataSource2.sort = this.sort2;
    
    this.peaCode = localStorage.getItem('peaCode');
    this.peaNum = this.peaCode.substr(1, 5);
    this.selPeapeaCode = this.peaCode.substr(0, 4);
 
    this.getinfo();
    this.getRemianBY();
    //this.getJobClsdPea();
    this.dataSource.paginator = this.paginator;

  }
  getinfo() {
    this.configService.postdata2('roic/rdInfo.php', { data: 'roicdate' }).subscribe((data => {
      if (data['status'] == 1) {
        this.roicdate = data['data'][0].info;
        //--------------------------------
        //this.roicdate="31 พ.ค. 2563";
      } else {
        alert(data['data']);
      }

    }));

  }
  getRemianData() {

    this.configService.getJobRemain('roic/rdJobRemain.php?filter1=' + this.selBudjet[0] + '&filter2=' + this.selBudjet[1] + '&peaCode=' + this.selPeapeaCode)
      //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
      .subscribe(res => {
        this.dataSource.data = res as jobRemain[];
      })
  }
  getRemianBY() {

    this.configService.getBYRemain('roic/rdBYRemain.php?filter1=' + this.selBudjet[0] + '&filter2=' + this.selBudjet[1] + '&peaCode=' + this.selPeapeaCode2)
      //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
      .subscribe(res => {
        this.dataSource2.data = res as jobRemain2[];
      })
  }
  applyFilter(filterValue: string) {

    this.dataSource.filter = (filterValue).trim().toLowerCase();
  }
  applyFilter2(filterValue: string) {

    this.dataSource2.filter = (filterValue).trim().toLowerCase();
  }
  callData() {
    this.getJobProgressPea();
    //this.getTrPea();
    //this.getBudgetPea();
    this.getRemianData();
  }
  getpeaList() {
    this.configService.postdata2('phase/rdpeaall.php', {}).subscribe((data => {
      console.log(data);
      
      if (data["status"] == 1) {
        data["data"].forEach(element => {
          this.peaname[element.peaCode] = element.peaName;

        });
        this.callData();
        this.currentPea = this.peaname[this.peaCode.substring(0, 6)];
        if (this.peaCode == "B00000") {
          this.currentMatherPea = this.peaname[this.peaCode.substring(0, 6)];
        } else {
          this.currentMatherPea = this.peaname[this.peaCode.substring(0, 4)];
        }

      } else {
        alert(data["data"]);
      }
      
    }))


  }
  getpeaList2() {
    this.configService.postdata2('roic/rdpeaall.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        //console.log(data['data']);
        this.peaname2 = data['data'];
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))

  }
  selectPea(event) {
    this.selPea = event.value[0];
    this.selPeaName = event.value[2];
    this.selPeapeaCode = event.value[1];
    this.currentMatherPea = this.peaname[this.selPeapeaCode];
    this.getRemianData();
    //this.getJobClsdPea();
    this.getJobProgressPea();

  }
  selectPea2(event) {
    this.selPeapeaCode2 = event.value[1];
    this.getRemianBY();
    //this.getTrPea();
  }
  getJobProgressPea() {
    //จำนวนงานคงค้าง %เบิกจ่าย
    //this.getRoicP();
    this.configService.postdata2('roic/rdRoicProgress.php', { peaCode: this.selPeapeaCode, filter1: this.selBudjet[0], filter2: this.selBudjet[1], Choice:this.graphChoice }).subscribe((data => {
      if (data['status'] == 1) {
        var Pea = [];
        var kva = [];
        var kvaObj=[];
        this.kvaTotal = 0;
        var kvaPln = [];
        var kvaPercent = [];
        this.kvaPlnTotal = 0;
        
        if (this.graphChoice=='kva'){
          this.unit=' kVA';
        }else if (this.graphChoice=='nJob'){
          this.unit=' งาน';
        }else if (this.graphChoice=='workCost'){
          this.unit=' ล้านบาท';
        }else if (this.graphChoice=='matCost'){
          this.unit=' ล้านบาท';
        }
        var unit=this.unit;
        data['data'].forEach(element => {
          kvaObj[element.Pea] = Number(element.totaltr);
          this.kvaTotal = this.kvaTotal + Number(element.totaltr);   
        });

        data['dataP'].forEach(element => {
          Pea.push(this.peaname["B" + element.Pea]);
          kvaPln.push(element.totaltr);
          this.kvaPlnTotal = this.kvaPlnTotal + Number(element.totaltr);
          if (kvaObj[element.Pea]){
            kva.push(kvaObj[element.Pea]);
            kvaPercent.push(kvaObj[element.Pea]/element.totaltr*100)
          }else{
            kva.push(0);
            kvaPercent.push(0);
          }
          
     
        });

        //this.kvaTotal=505;
        //APEX CHART
        
        this.chartOptions1 = {
          series: [this.kvaTotal / this.kvaPlnTotal * 100],
          chart: {
            height: 400,
            type: "radialBar",
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: 0,
              endAngle: 360,
              hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                image: undefined,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24
                }
              },
              track: {
                background: "#fff",
                strokeWidth: "67%",
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
                  color: "#888",
                  fontSize: "17px"
                },
                value: {
                  formatter: function (val) {
                    return parseInt(val.toString(), 10).toString() + "%";
                  },
                  color: "#111",
                  fontSize: "36px",
                  show: true
                }
              }
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: ["#ABE5A1"],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100]
            }
          },
          stroke: {
            lineCap: "round"
          },
          labels: ["ผลการดำเนินการ"]
        };
        //กราฟแท่ง ราย กฟฟ
        this.chartOptions2 = {
          series: [
            {
              name: "ปิดงาน",
              data: kva
            },
            {
              name: "แผนงาน",
              data: kvaPln
            }
          ],
          chart: {
            type: "bar",
            height: 650,
            toolbar: {
              show: false
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: "top"
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val,index) {
              var reslt;
              //return Math.abs(kva[index.dataPointIndex]) + " kVA";
              //return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if(index.seriesIndex==0){
                reslt=val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+unit+" , "+Math.abs(kvaPercent[index.dataPointIndex]).toFixed(0)+ "%";
              }else{
                reslt=val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+unit;
              }
              return reslt;
            },
            offsetX: 70,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          tooltip: {
            x: {
              formatter: function (val) {
                return val.toString();
              }
            },
            y: {
              formatter: function (val, index) {
                //console.log(index);
                //return Math.abs(kva[index.dataPointIndex]) + " kVA";
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' kVA';
              }
            }
          },
          xaxis: {
            categories: Pea,
            labels: {
              formatter: function (val, index) {
                //console.log(index);
                //return Math.abs(kva[index.dataPointIndex]) + " kVA";
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' kVA'},
              style: {
                fontSize: "14px",
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "14px",
              }
            }
          },
        };

        
        //===================================================================
        /*
               chartTitle = 'ผลการดำเนินการปรับปรุงและติดตั้งหม้อแปลงไฟฟ้าและระบบจำหน่ายแรงต่ำ กฟฟ. ในสังกัด';
               chartData = {
                 type: 'bar',
                 labels: Pea,
                 datasets: [
                   {
                     type: 'bar',
                     label: 'แผนงาน',
                     data: kvaPln,
                     backgroundColor: '#f7a6da',
                   },
                   {
                     label: 'ผลดำเนินการ(D1-F4)',
                     data: kva,
                     backgroundColor: '#daf7a6',
                   },
                   {
                     type: 'bar',
                     label: 'ผลดำเนินการ(D2-F4)',
                     data: kvaD1,
                     backgroundColor: '#a6daf7',
                   },
       
                 ]
               };
       
       
       
       
               if (this.progressBar) this.progressBar.destroy();
       
               this.progressBar = new Chart('progressBar', {
                 type: 'bar',
                 data: chartData,
                 options: {
                   // Elements options apply to all of the options unless overridden in a dataset
                   // In this case, we are setting the border of each horizontal bar to be 2px wide
                   elements: {
                     rectangle: {
                       borderWidth: 2,
                     }
                   },
                   responsive: true,
                   legend: {
                     position: 'bottom',
                     display: true,
       
                   },
                   title: {
                     display: true,
                     text: chartTitle
                   },
                   scales: {
                     yAxes: [{
                       ticks: {
                         beginAtZero: true,
                         userCallback: function (value, index, values) {
                           value = value.toString();
                           value = value.split(/(?=(?:...)*$)/);
                           value = value.join(',');
                           return value;
                         }
                       },
                       scaleLabel: {
                         display: true,
                         labelString: 'kVA'
                       },
       
                     }]
                   },
                   tooltips: {
                     callbacks: {
                       label: function (tooltipItem, data) {
                         return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                       },
                     },
                   },
                 },
       
               });
       
       
               chartTitle = 'ผลการดำเนินการปรับปรุงและติดตั้งหม้อแปลงไฟฟ้าและระบบจำหน่ายแรงต่ำ กฟน.2';
               chartData = {
                 type: 'bar',
                 labels: ['กฟน.2'],
                 datasets: [
                   {
                     type: 'bar',
                     label: 'แผนงานรวมปี 62',
                     data: [49520],
                     backgroundColor: '#f7a6da',
                   },
                   {
                     label: 'ผลดำเนินการ(D1-F4)',
                     data: [this.kvaTotal],
                     backgroundColor: '#daf7a6',
                   },
                   {
                     type: 'bar',
                     label: 'ผลดำเนินการ(D2-F4)',
                     data: [this.kvaTotal - this.kvaD1Total],
                     backgroundColor: '#a6daf7',
                   },
       
                 ]
               };
               if (this.progressBarN2) this.progressBarN2.destroy();
       
               this.progressBarN2 = new Chart('progressBarN2', {
                 type: 'bar',
                 data: chartData,
                 options: {
                   // Elements options apply to all of the options unless overridden in a dataset
                   // In this case, we are setting the border of each horizontal bar to be 2px wide
                   elements: {
                     rectangle: {
                       borderWidth: 2,
                     }
                   },
                   responsive: true,
                   legend: {
                     position: 'bottom',
                     display: true,
       
                   },
                   title: {
                     display: true,
                     text: chartTitle
                   },
                   scales: {
                     yAxes: [{
                       ticks: {
                         beginAtZero: true,
                         userCallback: function (value, index, values) {
                           value = value.toString();
                           value = value.split(/(?=(?:...)*$)/);
                           value = value.join(',');
                           return value;
                         }
                       },
                       scaleLabel: {
                         display: true,
                         labelString: 'kVA'
                       },
                     }]
                   },
                   tooltips: {
                     callbacks: {
                       label: function (tooltipItem, data) {
                         return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                       },
                     },
                   },
       
                 },
       
               });
       */
      } else {
        alert(data['data']);
      }

    }));

  }
  /*
  getTrPea() {
    //จำนวนงานคงค้าง %เบิกจ่าย
    this.getRoicP();
    this.configService.postdata2('roic/rdTrProgress.php', { peaCode: this.selPeapeaCode2 }).subscribe((data => {
      if (data['status'] == 1) {
        var Pea = [];
        var workCostActTR = [];
        var workCostPlnTR = [];
        var workCostActBY = [];
        this.workCostActTRTotal = 0;
        this.workCostActBYTotal = 0;
        var chartData: any;
        var chartTitle: string;



        data['data'].forEach(element => {
          this.workCostActTRTotal = this.workCostActTRTotal + Number(element.workCostActTR);
          this.workCostActBYTotal = this.workCostActBYTotal + Number(element.workCostActBY);
          Pea.push(this.peaname["B" + element.Pea]);
          workCostActTR.push(Number(element.workCostActTR));
          workCostPlnTR.push(Number(element.workCostPlnTR));
          workCostActBY.push(Number(element.workCostActBY));

        });

        chartTitle = 'ผลการเบิกจ่ายค่าใช้จ่ายหน้างานงบ I-62.TR กฟฟ. ในสังกัด';
        chartData = {
          type: 'bar',
          labels: Pea,
          datasets: [
            {
              label: 'คชจ.หน้างานอนุมัติ งบ TR',
              data: workCostPlnTR,
              backgroundColor: '#f7a6da',
            },
            {
              label: 'ผลการเบิกงบ TR',
              data: workCostActTR,
              backgroundColor: '#daf7a6',
            },
            {
              label: 'รอโอนงบจากงาน BY',
              data: workCostActBY,
              backgroundColor: '#a6daf7',
            },

          ]
        };




        if (this.trBar) this.trBar.destroy();

        this.trBar = new Chart('trBar', {
          type: 'bar',
          data: chartData,
          options: {
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              rectangle: {
                borderWidth: 2,
              }
            },
            onClick: function (event, value) {
              console.log(value[0]._view.label);
            },
            responsive: true,
            legend: {
              position: 'bottom',
              display: true,

            },
            title: {
              display: true,
              text: chartTitle
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);
                    value = value.join(',');
                    return value;
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'บาท'
                },

              }]
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var label = data['data']sets[tooltipItem.datasetIndex].label || '';

                  if (label) {
                    label += ': ';
                  }
                  label += Math.round(tooltipItem.yLabel * 100) / 100;
                  return label;
                }
              }
            },
          },

        });


        chartTitle = 'ผลการเบิกจ่ายค่าใช้จ่ายหน้างานงบ I-62.TR กฟน.2';
        chartData = {
          type: 'bar',
          labels: ['กฟน.2'],
          datasets: [
            {
              type: 'bar',
              label: 'เป้าหมายการเบิกจ่าย',
              data: [30e6],
              backgroundColor: '#f7a6da',
            },
            {
              label: 'ผลการเบิกงบ TR',
              data: [this.workCostActTRTotal],
              backgroundColor: '#daf7a6',
            },
            {
              type: 'bar',
              label: 'รอโอนงบจากงาน BY',
              data: [this.workCostActBYTotal],
              backgroundColor: '#a6daf7',
            },

          ]
        };
        if (this.trBarN2) this.trBarN2.destroy();

        this.trBarN2 = new Chart('trBarN2', {
          type: 'bar',
          data: chartData,
          options: {
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              rectangle: {
                borderWidth: 2,
              }
            },
            responsive: true,
            legend: {
              position: 'bottom',
              display: true,

            },
            title: {
              display: true,
              text: chartTitle
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);
                    value = value.join(',');
                    return value;
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'บาท'
                },
              }]
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var label = data['data']sets[tooltipItem.datasetIndex].label || '';

                  if (label) {
                    label += ': ';
                  }
                  label += Math.round(tooltipItem.yLabel * 100) / 100;
                  return label;
                }
              }
            },
          },

        });

      } else {
        alert(data['data']);
      }

    }));
  }
 */
  
  /*
 getBudgetPea() {
   //จำนวนงานคงค้าง %เบิกจ่าย
   this.getRoicP();
   this.configService.postdata2('roic/rdBudgetProgress.php', { peaCode: 'B000' }).subscribe((data => {
     if (data['status'] == 1) {
       var Pea = [];
       var workCostAct = [];
       var workCostPln = [];
       var matCostAct = [];
       var matCostPln = [];
       var chartData: any;
       var chartTitle: string;
       this.workCostActTotal = 0;
       this.workCostPlnTotal = 0;
       this.matCostActTotal = 0;
       this.matCostPlnTotal = 0;


       data['data'].forEach(element => {
         Pea.push(this.peaname["B" + element.Pea]);
         workCostAct.push(Number(element.workCostAct));
         workCostPln.push(Number(element.workCostPln));
         matCostAct.push(Number(element.matCostAct) + Number(element.matCostInAct));
         matCostPln.push(Number(element.matCostPln) + Number(element.matCostInPln));
         this.workCostActTotal = this.workCostActTotal + Number(element.workCostAct);
         this.workCostPlnTotal = this.workCostPlnTotal + Number(element.workCostPln);
         this.matCostActTotal = this.matCostActTotal + Number(element.matCostAct) + Number(element.matCostInAct);
         this.matCostPlnTotal = this.matCostPlnTotal + Number(element.matCostPln) + Number(element.matCostInPln);

       });

       chartTitle = 'ผลการเบิกจ่ายค่าใช้จ่ายหน้างาน ROIC กฟฟ. ในสังกัด';
       chartData = {
         type: 'bar',
         labels: Pea,
         datasets: [
           {
             label: 'คชจ.หน้างานอนุมัติ',
             data: workCostPln,
             backgroundColor: '#f7a6da',
           },
           {
             label: 'ผลการเบิกงบ',
             data: workCostAct,
             backgroundColor: '#daf7a6',
           },
           /*
           {
             label: 'รอโอนงบจากงาน BY',
             data: matCostPln,
             backgroundColor: '#a6daf7',
           },
           {
             label: 'รอโอนงบจากงาน BY',
             data: matCostAct,
             backgroundColor: '#a6daf7',
           },
         ]
       };




       if (this.progressWorkCostBar) this.progressWorkCostBar.destroy();

       this.progressWorkCostBar = new Chart('progressWorkCostBar', {
         type: 'bar',
         data: chartData,
         options: {
           // Elements options apply to all of the options unless overridden in a dataset
           // In this case, we are setting the border of each horizontal bar to be 2px wide
           elements: {
             rectangle: {
               borderWidth: 2,
             }
           },
           onClick: function (event, value) {
             console.log(value[0]._view.label);
           },
           responsive: true,
           legend: {
             position: 'bottom',
             display: true,

           },
           title: {
             display: true,
             text: chartTitle
           },
           scales: {
             yAxes: [{
               ticks: {
                 beginAtZero: true,
                 userCallback: function (value, index, values) {
                   value = value.toString();
                   value = value.split(/(?=(?:...)*$)/);
                   value = value.join(',');
                   return value;
                 }
               },
               scaleLabel: {
                 display: true,
                 labelString: 'บาท'
               },

             }]
           },
           tooltips: {
             callbacks: {
               label: function (tooltipItem, data) {
                 var label = data['data']sets[tooltipItem.datasetIndex].label || '';

                 if (label) {
                   label += ': ';
                 }
                 label += Math.round(tooltipItem.yLabel * 100) / 100;
                 return label;
               }
             }
           },
         },

       });


       chartTitle = 'ผลการเบิกจ่ายค่าพัสดุ ROIC กฟฟ. ในสังกัด';
       chartData = {
         type: 'bar',
         labels: Pea,
         datasets: [
           {
             label: 'ค่าพัสดุอนุมัติ',
             data: matCostPln,
             backgroundColor: '#f7a6da',
           },
           {
             label: 'ผลการเบิกงบ',
             data: matCostAct,
             backgroundColor: '#daf7a6',
           },

         ]
       };




       if (this.progressMatCostBar) this.progressMatCostBar.destroy();

       this.progressMatCostBar = new Chart('progressMatCostBar', {
         type: 'bar',
         data: chartData,
         options: {
           // Elements options apply to all of the options unless overridden in a dataset
           // In this case, we are setting the border of each horizontal bar to be 2px wide
           elements: {
             rectangle: {
               borderWidth: 2,
             }
           },
           onClick: function (event, value) {
             console.log(value[0]._view.label);
             console.log("6666");
             this.Test();
           },
           responsive: true,
           legend: {
             position: 'bottom',
             display: true,

           },
           title: {
             display: true,
             text: chartTitle
           },
           scales: {
             yAxes: [{
               ticks: {
                 beginAtZero: true,
                 userCallback: function (value, index, values) {
                   value = value.toString();
                   value = value.split(/(?=(?:...)*$)/);
                   value = value.join(',');
                   return value;
                 }
               },
               scaleLabel: {
                 display: true,
                 labelString: 'บาท'
               },

             }]
           },
           tooltips: {
             callbacks: {
               label: function (tooltipItem, data) {
                 var label = data['data']sets[tooltipItem.datasetIndex].label || '';

                 if (label) {
                   label += ': ';
                 }
                 label += Math.round(tooltipItem.yLabel * 100) / 100;
                 return label;
               }
             }
           },
         },

       });


     } else {
       alert(data['data']);
     }

   }));
 }
*/

  onValChange(val){
    this.graphChoice=val;
    this.getJobProgressPea();

  }
  selectBudget(event) {
    this.selBudjet = event.value;
    this.getRemianData();
    //this.getJobClsdPea();
    this.getJobProgressPea();
  }
  exportAsXLSX(): void {
    this.configService.exportAsExcelFile(this.dataSource.data, 'งานคงค้าง');
  }
}
