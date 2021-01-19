import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../config/config.service';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { trdata, meterdata, meterdata2, matreq } from '../model/user.model';
import { AuthService } from '../config/auth.service';
import { HttpClient } from '@angular/common/http';
import { FileuploadService } from '../config/fileupload.service';
import { Chart } from 'chart.js';
import { MatSort } from '@angular/material/sort';
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
import { SummaryResolver } from '@angular/compiler';

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

export type ChartOptions3 = {
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
  selector: 'app-lvpro',
  templateUrl: './lvpro.component.html',
  styleUrls: ['./lvpro.component.scss']
})
export class LVProComponent implements OnInit {
  public pClsChart: Partial<ChartOptions2>;
  public chartOptions1: Partial<ChartOptions2>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;

  // myBarClsd: Chart;
  // BarMat: Chart;
  option = "2";
  displayedColumns = ['aoj', 'PEA_TR', 'kva', 'Location', 'PLoadTOT', 'minV', 'Ub', 'wbs', 'jobStatus', 'Status', 'RLoad', 'RVoltage', 'rundate', 'workstatus'];
  displayedColumns3 = ['matCode', 'matName', 'nMat', 'peaName'];

  public dataSource = new MatTableDataSource<trdata>();
  // public dataSource1 = new MatTableDataSource<meterdata>();
  // public dataSource2 = new MatTableDataSource<meterdata2>();
  public dataSource2 = new MatTableDataSource<matreq>();
  // displayedColumns1 = ['Feeder','PEA_Meter','CustName','SUBTYPECOD', 'kWh','rate','rateMeter','Voltage','Line_Type'];
  // displayedColumns2 = ['PEA_TR','Feeder','PEA_Meter','CustName','SUBTYPECOD', 'kWh','rate','rateMeter','Voltage','Line_Type'];
  //TRNo = "00-050333";
  @ViewChild('f', { static: true }) registerForm: NgForm;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // @ViewChild('paginator1', { static: false }) paginator1: MatPaginator;
  // @ViewChild('sort1', { static: false }) sort1: MatSort;

  @ViewChild('paginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('sort2', { static: true }) sort2: MatSort;

  // @ViewChild('paginator3', { static: true }) paginator3: MatPaginator;
  // @ViewChild('sort3', { static: true }) sort3: MatSort;

  condition = 0;
  peaCode = "";
  nDate = "15 วัน";
  // myDonut: Chart;
  // myDonut200: Chart;
  // myDonut80: Chart;
  // myDonutWBS4: Chart;
  // myDonutWBS5: Chart;
  // myDonutWBS6: Chart;
  chartResult: Chart;
  chartMat: Chart;
  // PEA_TR0: number;
  // PEA_TR1: number;
  // PEA_TR2: number;
  // PEA_TR3: number;
  // WBS4: number;
  // WBS5: number;
  // WBS6: number;
  // PEA_TR1perPEA_TR0: number;
  // PEA_TR2perPEA_TR0: number;
  // PEA_TR3perPEA_TR0: number;
  // WBS4perPEA_TR1: number;
  // WBS5perPEA_TR2: number;
  // WBS6perPEA_TR3: number;
  meterdata = [];

  peaname = {};
  peaname2 = [];
  selBudjet = ['', ''];
  selPea = '';
  selPeaName = 'กฟน.2';
  selPeapeaCode = 'B00000';
  selPeapeaCode2 = 'B000';
  currentMatherPea = "";
  currentPea = "";
  TrTotal = 0;
  TrPlnTal = 0;

  Statuss = [
    { value: '-' },
    { value: 'อยู่ระหว่างตรวจสอบ' },
    { value: 'อยู่ระหว่างสำรวจประมาณการ' },
    // { value: 'อยู่ระหว่างแก้ไขข้อมูล GIS' },
    { value: 'แก้ไขข้อมูล GIS แล้ว' },
    { value: 'ไม่พบปัญหา' },
    { value: 'อื่นๆ โปรดระบุ' },
  ];


  Conditions = [
    //{value: 0,viewvalue: 'หม้อแปลงทั้งหมด'},
    { value: 2, viewvalue: 'แรงดัน<200 Volt' },
    { value: 7, viewvalue: 'แรงดัน 200-210 Volt' },
    { value: 1, viewvalue: 'โหลด>100%' },
    { value: 9, viewvalue: 'โหลด 90-100%' },
    { value: 8, viewvalue: 'โหลด 80-90%' },
    { value: 4, viewvalue: 'โหลด<30%' },
    { value: 11, viewvalue: '%UB>50%' },
    { value: 10, viewvalue: '%UB 25-50%' },
    { value: 6, viewvalue: 'ทั้งหมด' }

  ];




  constructor(private configService: ConfigService, public authService: AuthService, private http: HttpClient, private uploadService: FileuploadService) {
    this.getpeaList();
    this.getpeaList2();

  }

  ngOnInit() {
    //this.peaCode = localStorage.getItem('peaCode');
    // this.getTrData();
    // this.getStatus();
    this.getMat("1");
    this.getJobProgressPea();
    this.getMatReq();
    //this.getMeterData();

    // this.dataSource.paginator = this.paginator;
    // this.dataSource1.paginator = this.paginator1;
    // this.dataSource2.paginator = this.paginator2;
    // this.dataSource3.paginator = this.paginator3;
    // this.dataSource.sort = this.sort;
    // this.dataSource1.sort = this.sort1;
    // this.dataSource2.sort = this.sort2;
    // this.dataSource3.sort = this.sort3;
    // this.dataSource.paginator = this.paginator1;
    // this.dataSource.sort = this.sort1;
    this.peaCode = localStorage.getItem('peaCode');
    //this.peaNum = this.peaCode.substr(1, 5);
    this.selPeapeaCode = this.peaCode.substr(0, 4);
  }

  onOther(value, trdata) {
    this.configService.postdata2('ldcad/wriNote.php', { TRNumber: trdata, note: value }).subscribe((data => {
      if (data['status'] == 1) {
        this.getTrData();
        //  this.getStatus();
        this.getJobProgressPea();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))
    console.log(value);
  }
  checkSelect(selected) {

    if (selected != undefined) {
      // console.log(selected);
      if (selected.includes("อื่นๆ")) {
        return 0;
      } else if (selected.includes("ไม่พบปัญหา")) {
        return 0;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }
  checkwbs(wbs, Status) {
    if (Status != null) {
      //console.log(Status, Status.includes("แก้ไขข้อมูล GIS แล้ว"));
      if (Status.includes("แก้ไขข้อมูล GIS แล้ว")) {
        return 0;
      } else if (Status.includes("ไม่พบปัญหา")) {
        return 0;
      }
    }
    if (wbs == null) {
      return 1;
    } else if (wbs.length == 0) {
      return 1;
    } else {
      return 0;
    }

  }

  checkAoj(Aoj) {

    if (Aoj.substring(2, 5) == this.peaCode.substring(1, 4) && this.peaCode.slice(-1) == "1") {
      return true;
    } else if (this.peaCode == "B00000") {
      return true;
    } else if (Aoj.substring(2, 7) == this.peaCode.substring(1, 6)) {
      return true;
    } else {
      return false;
    }

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
  onValChange(val) {
    this.option = val;
    this.getJobProgressPea();

  }
  selectPea(event) {
    this.selPea = event.value[0];
    this.selPeaName = event.value[2];
    this.selPeapeaCode = event.value[1];
    this.currentMatherPea = this.peaname[this.selPeapeaCode];
    this.getJobProgressPea();
    //this.getJobClsdPea();


  }
  getJobProgressPea() {
    //จำนวนงานคงค้าง %เบิกจ่าย
    //this.getRoicP();
    this.configService.postdata2('ldcad/rdLoad.php', { peaCode: this.selPeapeaCode, option: this.option }).subscribe((data => {
      if (data['status'] == 1) {

        var Pea = [];
        var kva = [];
        var GIS = [];
        var CLSD = [];
        var No = [];
        var Volt = [];
        var kvaObj = [];
        this.TrTotal = 0;
        var kvaPln = [];
        var kvaPercent = [];
        this.TrPlnTal = 0;
        var unit = " เครื่อง";
        var GISObj = [];
        var NoObj = [];
        var CLSDObj = [];
        var VoltObj = [];
        var totalClsd = 0;

        data['data'].forEach(element => {
          kvaObj[element.Pea] = Number(element.totalTr);
          this.TrTotal = this.TrTotal + Number(element.totalTr);
        });
        data['dataGIS'].forEach(element => {
          GISObj[element.Pea] = Number(element.totalTr);
          this.TrTotal = this.TrTotal + Number(element.totalTr);
          totalClsd = totalClsd + Number(element.totalTr);
        });
        data['dataNo'].forEach(element => {
          NoObj[element.Pea] = Number(element.totalTr);
          this.TrTotal = this.TrTotal + Number(element.totalTr);
          totalClsd = totalClsd + Number(element.totalTr);
        });

        data['dataCLSD'].forEach(element => {
          CLSDObj[element.Pea] = Number(element.totalTr);
          totalClsd = totalClsd + Number(element.totalTr);
        });

        if (this.option == '6') {
          data['dataVoltage'].forEach(element => {
            VoltObj[element.Pea] = Number(element.totalTr);
          });
        }
        data['dataP'].forEach(element => {
          Pea.push(this.peaname["B" + element.Pea]);
          if (this.option != '6') {
            kvaPln.push(element.totalTr);
          } else {
            kvaPln.push(element.totalTr - VoltObj[element.Pea]);
          }

          this.TrPlnTal = this.TrPlnTal + Number(element.totalTr);
          //this.TrTotal = this.TrTotal + element.totalTr; 
          //------------new------
          // newKva=Math.floor(element.totalTr*0.7)+Math.floor(element.totalTr*0.2*Math.random());
          // kva.push(newKva);
          // this.TrPlnTal = this.TrPlnTal + Number(element.totalTr);
          // this.TrTotal = this.TrTotal + newKva;   
          // kvaPercent.push(newKva/element.totalTr*100)
          //--------------------------
          if (kvaObj[element.Pea]) {
            kva.push(kvaObj[element.Pea]);
            kvaPercent.push(kvaObj[element.Pea] / element.totalTr * 100)
          } else {
            kva.push(0);
            kvaPercent.push(0);
          }

          if (GISObj[element.Pea]) {
            GIS.push(GISObj[element.Pea]);
            // kvaPercent.push(kvaObj[element.Pea] / element.totalTr * 100)
          } else {
            GIS.push(0);
            // kvaPercent.push(0);
          }

          if (NoObj[element.Pea]) {
            No.push(NoObj[element.Pea]);
            // kvaPercent.push(kvaObj[element.Pea] / element.totalTr * 100)
          } else {
            No.push(0);
            // kvaPercent.push(0);
          }

          if (CLSDObj[element.Pea]) {
            CLSD.push(CLSDObj[element.Pea]);
            // kvaPercent.push(kvaObj[element.Pea] / element.totalTr * 100)
          } else {
            CLSD.push(0);
            // kvaPercent.push(0);
          }


          if (this.option == '6') {
            if (VoltObj[element.Pea]) {
              Volt.push(VoltObj[element.Pea]);
              // kvaPercent.push(kvaObj[element.Pea] / element.totalTr * 100)
            } else {
              Volt.push(0);
              // kvaPercent.push(0);
            }
          }

        });

        //this.kvaTotal=505;
        //APEX CHART

        this.chartOptions1 = {
          series: [this.TrTotal / this.TrPlnTal * 100, totalClsd / this.TrPlnTal * 100],
          chart: {
            height: 400,
            type: "radialBar",
            stacked: true,
            toolbar: {
              show: false
            }
          },
          fill: {
            colors: ['#118ab2', '#06d6a0'],
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
                total: {
                  show: true,
                  label: 'ผลการตรวจสอบ',
                  formatter: function (val) {
                    return parseInt(val.config.series[0].toString(), 10).toString() + "%";;
                  }
                  // formatter: function () {
                  //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  //   return 249
                  // }
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
          stroke: {
            lineCap: "round"
          },
          labels: ["ผลการตรวจสอบ", "ผลการปิดงาน"]
        };


        //กราฟแท่ง ราย กฟฟ
        // this.chartOptions2 = {
        //   series: [
        //     {
        //       name: "มี WBS/ใบสั่ง แล้ว",
        //       data: kva
        //     },
        //     {
        //       name: "หม้อแปลงทั้งหมด",
        //       data: kvaPln
        //     }
        //   ],
        //   chart: {
        //     type: "bar",
        //     height: 650,
        //     toolbar: {
        //       show: false
        //     },
        //   },
        //   plotOptions: {
        //     bar: {
        //       horizontal: true,
        //       dataLabels: {
        //         position: "top"
        //       }
        //     }
        //   },
        //   dataLabels: {
        //     enabled: true,
        //     formatter: function (val, index) {
        //       var reslt;
        //       //return Math.abs(kva[index.dataPointIndex]) + " kVA";
        //       //return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //       if (index.seriesIndex == 0) {
        //         reslt = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + unit + " , " + Math.abs(kvaPercent[index.dataPointIndex]).toFixed(0) + "%";
        //       } else {
        //         reslt = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + unit;
        //       }
        //       return reslt;
        //     },
        //     offsetX: 70,
        //     style: {
        //       fontSize: "12px",
        //       colors: ["#304758"]
        //     }
        //   },
        //   tooltip: {
        //     x: {
        //       formatter: function (val) {
        //         return val.toString();
        //       }
        //     },
        //     y: {
        //       formatter: function (val, index) {
        //         //console.log(index);
        //         //return Math.abs(kva[index.dataPointIndex]) + " kVA";
        //         return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' เครื่อง';
        //       }
        //     }
        //   },
        //   xaxis: {
        //     categories: Pea,
        //     labels: {
        //       formatter: function (val, index) {
        //         //console.log(index);
        //         //return Math.abs(kva[index.dataPointIndex]) + " kVA";
        //         return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ''
        //       },
        //       style: {
        //         fontSize: "14px",
        //       }
        //     }
        //   },
        //   yaxis: {
        //     labels: {
        //       style: {
        //         fontSize: "14px",
        //       }
        //     }
        //   },
        // };

        // Chart JS ====================================
        if (this.option != '6') {
          var chartData = {
            labels: Pea,
            datasets: [
              {
                label: 'ปิด WBS/ใบสั่ง แล้ว',
                stack: 'Stack 1',
                data: CLSD,
                backgroundColor: '#7209b7',
              },
              {
                label: 'แก้ไข GIS',
                stack: 'Stack 1',
                data: GIS,
                backgroundColor: '#ffd166',
              },
              {
                label: 'ไม่พบปัญหา',
                stack: 'Stack 1',
                data: No,
                backgroundColor: '#ffd166',
              },
              {
                label: 'มี WBS/ใบสั่ง แล้ว',
                stack: 'Stack 2',
                data: kva,
                backgroundColor: '#118ab2',
              },
              {
                label: 'แก้ไข GIS',
                stack: 'Stack 2',
                data: GIS,
                backgroundColor: '#ffd166',
              },
              {
                label: 'ไม่พบปัญหา',
                stack: 'Stack 2',
                data: No,
                backgroundColor: '#ffd166',
              },
              {
                label: 'หม้อแปลงทั้งหมด',
                stack: 'Stack 3',
                data: kvaPln,
                backgroundColor: '#06d6a0',
              },
            ]
          };
        } else {
          var chartData = {
            labels: Pea,
            datasets: [
              {
                label: 'ปิด WBS/ใบสั่ง แล้ว',
                stack: 'Stack 1',
                data: CLSD,
                backgroundColor: '#7209b7',
              },
              {
                label: 'มี WBS/ใบสั่ง แล้ว',
                stack: 'Stack 2',
                data: kva,
                backgroundColor: '#118ab2',
              },
              {
                label: 'แก้ไข GIS',
                stack: 'Stack 2',
                data: GIS,
                backgroundColor: '#ffd166',
              },
              {
                label: 'ไม่พบปัญหา',
                stack: 'Stack 2',
                data: No,
                backgroundColor: '#f4a261',
              },
              {
                label: 'แรงดัน 200-204 V',
                stack: 'Stack 3',
                data: Volt,
                backgroundColor: '#ef476f',
              },
              {
                label: 'แรงดัน 205-210 V',
                stack: 'Stack 3',
                data: kvaPln,
                backgroundColor: '#06d6a0',
              },
            ]
          };
        }

        if (this.chartResult) this.chartResult.destroy();
        this.chartResult = new Chart('chartResult', {
          type: 'horizontalBar',
          data: chartData,
          options: {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              bar: {
                borderWidth: 2,
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              filter: function (tooltipItem, data) {
                  var label = data.datasets[tooltipItem.datasetIndex].label;
                  if ((label.includes('GIS') || label.includes('ไม่พบปัญหา')) && tooltipItem.datasetIndex > 2) {
                    return false;
                  } else {
                    return true;
                  }
              }
           },
            legend: {
              labels: {
                filter: function (item, chart) {
                  var show = true;
                  if ((item.text.includes('GIS') || item.text.includes('ไม่พบปัญหา') && item.datasetIndex > 2)) {
                    show = false;
                  }
                  return show;
                }
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  fontSize: 16
                }
              }]
            },
            animation: {
              onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.fillStyle = "black";
                ctx.textAlign = 'left';
                ctx.textBaseline = 'center';
                console.log(this.data.datasets);
                var sum = [];
                var psum = [];
                var pclsd = [];
                if (this.data.datasets.length == 5) {
                  for (var i = 0; i < this.data.datasets[1].data.length; i++) {
                    sum.push(this.data.datasets[1].data[i] + this.data.datasets[2].data[i] + this.data.datasets[3].data[i])
                    psum.push(Math.round(sum[i] / this.data.datasets[4].data[i] * 100));
                    pclsd.push(Math.round(this.data.datasets[0].data[i] / this.data.datasets[1].data[i] * 100));
                  }

                  this.data.datasets.forEach(function (dataset) {
                    for (var i = 0; i < dataset.data.length; i++) {
                      for (var key in dataset._meta) {
                        var model = dataset._meta[key].data[i]._model;
                        if (model.datasetLabel.includes("หม้อแปลงทั้งหมด")) {
                          ctx.fillText(dataset.data[i] + " เครื่อง", model.x + 10, model.y);
                        } else if (model.datasetLabel.includes("ไม่พบปัญหา")) {
                          ctx.fillText(sum[i] + " เครื่อง , " + psum[i] + "%", model.x + 10, model.y);
                        } else if (model.datasetLabel.includes("ปิด WBS/ใบสั่ง")) {
                          ctx.fillText(dataset.data[i] + " เครื่อง , " + pclsd[i] + "%", model.x + 10, model.y);
                        }
                        // console.log(model);
                      }

                    }
                  });
                } else {
                  var total = []
                  for (var i = 0; i < this.data.datasets[1].data.length; i++) {
                    total.push(this.data.datasets[4].data[i] + this.data.datasets[5].data[i]);
                  }
                  for (var i = 0; i < this.data.datasets[1].data.length; i++) {
                    sum.push(this.data.datasets[1].data[i] + this.data.datasets[2].data[i] + this.data.datasets[3].data[i])
                    psum.push(Math.round(sum[i] / total[i] * 100));
                    pclsd.push(Math.round(this.data.datasets[0].data[i] / this.data.datasets[1].data[i] * 100));
                  }

                  this.data.datasets.forEach(function (dataset) {
                    for (var i = 0; i < dataset.data.length; i++) {
                      for (var key in dataset._meta) {
                        var model = dataset._meta[key].data[i]._model;
                        if (model.datasetLabel.includes("แรงดัน 205-210")) {
                          ctx.fillText(total[i] + " เครื่อง", model.x + 10, model.y);
                        } else if (model.datasetLabel.includes("ไม่พบปัญหา")) {
                          ctx.fillText(sum[i] + " เครื่อง , " + psum[i] + "%", model.x + 10, model.y);
                        } else if (model.datasetLabel.includes("ปิด WBS/ใบสั่ง")) {
                          ctx.fillText(dataset.data[i] + " เครื่อง , " + pclsd[i] + "%", model.x + 10, model.y);
                        }
                        // console.log(model);
                      }

                    }
                  });

                }
              }
            }
          }

        });

        // ====================================================

      } else {
        alert(data['data']);
      }

    }));

  }
  callData() {
    this.getJobProgressPea();
    //this.getTrPea();
    //this.getBudgetPea();
    //this.getRemianData();
  }
  public getTrData = () => {

    this.configService.getTr('TR.php?condition=' + this.condition + '&peaCode0=' + this.peaCode)
      //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
      .subscribe(res => {
        // this.dataSource.paginator = this.paginator1;
        // this.dataSource.sort = this.sort1;
        this.dataSource.data = res as trdata[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }
  getMatReq() {
    this.configService.getMatReq('ldcad/getmatreq.php')
      //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
      .subscribe(res => {
        this.dataSource2.data = res as matreq[];
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      })


  }


  getMat(choice) {
    this.configService.postdata2('ldcad/rdMat.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        // console.log(data);
        var label = ["30 kVA", "50 kVA", "100  kVA", "160  kVA"];
        var TRStock = [data["nStock"]["30"], data["nStock"]["50"], data["nStock"]["100"], data["nStock"]["160"]];
        var TR15 = [data["nTR"]["15"]["30"], data["nTR"]["15"]["50"], data["nTR"]["15"]["100"], data["nTR"]["15"]["160"]];
        var TR45 = [data["nTR"]["45"]["30"], data["nTR"]["45"]["50"], data["nTR"]["45"]["100"], data["nTR"]["45"]["160"]];
        var TRStock2 = [TRStock[0] - TR15[0], TRStock[1] - TR15[1], TRStock[2] - TR15[2], TRStock[3] - TR15[3]];
        if (choice == "1") {
          this.nDate = "15 วัน";
          var chartData = {
            labels: label,
            datasets: [
              {
                label: 'หม้อแปลงที่ต้องการใช้งาน',
                data: TR15,
                backgroundColor: '#e36414',
              },
              {
                label: 'หม้อแปลงคงคลัง',
                data: TRStock,
                backgroundColor: '#9a031e',
              }
            ]
          };
        } else {
          this.nDate = "45 วัน";
          var chartData = {
            labels: label,
            datasets: [
              {
                label: 'หม้อแปลงที่ต้องการใช้งาน',
                data: TR45,
                backgroundColor: '#e36414',
              },
              {
                label: 'หม้อแปลงคงคลัง',
                data: TRStock2,
                backgroundColor: '#9a031e',
              }
            ]
          };


        }
        if (this.chartMat) this.chartMat.destroy();
        this.chartMat = new Chart('chartMat', {
          type: 'horizontalBar',
          data: chartData,
          options: {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              bar: {
                borderWidth: 2,
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: 'bottom',
              display: true,
              defaultFontSize: 30,

            },
            scales: {
              yAxes: [{
                ticks: {
                  fontSize: 16
                }
              }]
            },
            animation: {
              onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.fillStyle = "black";
                ctx.textAlign = 'left';
                ctx.textBaseline = 'center';
                this.data.datasets.forEach(function (dataset) {
                  for (var i = 0; i < dataset.data.length; i++) {
                    for (var key in dataset._meta) {
                      var model = dataset._meta[key].data[i]._model;
                      ctx.fillText(dataset.data[i] + " เครื่อง", model.x + 10, model.y);
                    }

                  }
                });

              }
            }
          }

        });


      } else {
        alert(data['data']);
      }

    }));

  }
  // public getMtData = (PEA_TR) => {

  //   this.configService.getMeter('Meter.php?PEA_TR=' + PEA_TR)
  //     //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
  //     .subscribe(res => {
  //       this.dataSource1.data = res as meterdata[];
  //     })
  // }
  applyFilter(filterValue: string) {
    // console.log((filterValue + " " + localStorage.getItem('peaEng')).trim().toLowerCase());
    this.dataSource.filter = (filterValue).trim().toLowerCase();
  }
  // applyFilter1(filterValue: string) {

  //   this.dataSource1.filter = (filterValue).trim().toLowerCase();
  // }
  applyWBS(event) {
    this.configService.postdata2('wriWBS.php', { TRNumber: event[1].PEA_TR, WBS: event[0] }).subscribe((data => {
      if (data['status'] == 1) {
        this.getTrData();
        //  this.getStatus();
        this.getJobProgressPea();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }));
  }
  // applyNote(event) {
  //   this.configService.postdata2('wriNote.php', { TRNumber: event[1].PEA_TR, note: event[0] }).subscribe((data => {
  //     if (data['status'] == 1) {
  //       this.getTrData();
  //       //  this.getStatus();
  //       this.getJobProgressPea();
  //       //console.log(this.peaname);
  //     } else {
  //       alert(data['data']);
  //     }

  //   }))
  // }
  applyRLoad(event) {
    // console.log(event);
    this.configService.postdata2('wriRLoad.php', { TRNumber: event[1].PEA_TR, RLoad: event[0] }).subscribe((data => {
      if (data['status'] == 1) {
        this.getTrData();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))
  }

  applyRVoltage(event) {
    // console.log(event);
    this.configService.postdata2('wriRVoltage.php', { TRNumber: event[1].PEA_TR, RVoltage: event[0] }).subscribe((data => {
      if (data['status'] == 1) {
        // console.log(data['data']);
        this.getTrData();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))
  }

  selectStatus(event) {
    // console.log(event);
    this.configService.postdata2('wristatus.php', { TRNumber: event.value[1].PEA_TR, status: event.value[0] }).subscribe((data => {
      if (data['status'] == 1) {
        // console.log(data['data']);
        this.getTrData();
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))
  }

  selectCondition(event) {
    this.condition = event.value[0];
    this.getTrData();

  }


  onSubmit() {
    var input = this.registerForm.value;
    input["user"] = localStorage.getItem('name');
    input["peaCode"] = localStorage.getItem('peaCode');
    console.log(this.registerForm.value);
    this.configService.postdata2('ldcad/wriMat.php', this.registerForm.value).subscribe((data => {
      if (data['status'] == 1) {
        //this.getTrData();
        this.getMatReq();
        this.registerForm.resetForm();
      } else {
        alert(data['data']);
      }

    }));

    // this.configService.getmeterdata2('serchmeter.php?PEA_Meter=' + this.registerForm.value.PEAMeter)
    //   //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
    //   .subscribe(res => {
    //     this.registerForm.resetForm();
    //     this.dataSource2.data = res as meterdata2[];

    // })
  }


  exportAsXLSX(): void {
    this.configService.exportAsExcelFile(this.dataSource.data, 'TRdata');
  }
  // exportAsXLSX2(): void {
  //   this.configService.exportAsExcelFile(this.dataSource1.data, 'MeterData');
  // }
  /*
  getTrData(){ 
    this.configService.postdata2('TR.php',{TRNumber:this.TRNo}).subscribe((data=>{
      if(data['status']==1){
         console.log(data.data);
        
        //console.log(this.peaname);
      }else{
        alert(data.data);
      }
  
    }))
    
  } 
*/
}


