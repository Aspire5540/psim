import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ConfigService } from '../config/config.service';

import {MatTableDataSource,MatPaginator} from '@angular/material';
import { trdata,meterdata,meterdata2} from '../model/user.model';
import { AuthService } from '../config/auth.service';
import { HttpClient} from '@angular/common/http';
import {FileuploadService} from '../config/fileupload.service';
import {Chart} from 'chart.js';
import {MatSort} from '@angular/material/sort';
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
  selector: 'app-lvpro',
  templateUrl: './lvpro.component.html',
  styleUrls: ['./lvpro.component.scss']
})
export class LVProComponent implements OnInit {
  public pClsChart: Partial<ChartOptions2>;
  public chartOptions1: Partial<ChartOptions2>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  myBarClsd: Chart;
  myBar3: Chart;
  option = "1";
  displayedColumns = ['PEA_TR','Location','PLoadTOT','minV','Ub', 'wbs','jobStatus','Status','RLoad','RVoltage','rundate','workstatus'];
  // displayedColumns1 = ['Feeder','PEA_Meter','CustName','SUBTYPECOD', 'kWh','rate','rateMeter','Voltage','Line_Type'];
  // displayedColumns2 = ['PEA_TR','Feeder','PEA_Meter','CustName','SUBTYPECOD', 'kWh','rate','rateMeter','Voltage','Line_Type'];
  //TRNo = "00-050333";
  @ViewChild('f', { static: true }) registerForm: NgForm;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('paginator1', { static: true }) paginator1: MatPaginator;
  @ViewChild('sort1', { static: true }) sort1: MatSort;
  @ViewChild('paginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('sort2', { static: true }) sort2: MatSort;
  condition = 0;
  peaCode = ""; 
  myDonut: Chart;
  myDonut200: Chart;
  myDonut80: Chart;
  myDonutWBS4: Chart;
  myDonutWBS5: Chart;
  myDonutWBS6: Chart;
  PEA_TR0:number;
  PEA_TR1:number;
  PEA_TR2:number;
  PEA_TR3:number;
  WBS4:number;
  WBS5:number;
  WBS6:number;
  PEA_TR1perPEA_TR0:number;
  PEA_TR2perPEA_TR0:number;
  PEA_TR3perPEA_TR0:number;
  WBS4perPEA_TR1:number;
  WBS5perPEA_TR2:number;
  WBS6perPEA_TR3:number;
  meterdata=[];

  peaname = {};
  peaname2 = [];
  selBudjet = ['', ''];
  selPea = '';
  selPeaName = 'กฟน.2';
  selPeapeaCode = '';
  selPeapeaCode2 = 'B000';
  currentMatherPea = "";
  currentPea = "";
  TrTotal=0;
  TrPlnTal=0;

  Statuss= [
    {value: '-'},
    {value: 'อยู่ระหว่างตรวจสอบ'},
    {value: 'อยู่ระหว่างสำรวจประมาณการ'},
    {value: 'อยู่ระหว่างแก้ไขข้อมูล GIS'},
    {value: 'ไม่พบปัญหา'}
  ];

  
  Conditions= [
    //{value: 0,viewvalue: 'หม้อแปลงทั้งหมด'},
    {value: 2,viewvalue: 'แรงดัน<200 Volt'},
    {value: 1,viewvalue: 'โหลด>100%'},
    {value: 3,viewvalue: 'โหลด 80-100%'},
    {value: 4,viewvalue: 'โหลด<30%'},
    {value: 5,viewvalue: '%UB>25%'},
    {value: 6,viewvalue: 'ทั้งหมด'}
    
  ];
  
  public dataSource = new MatTableDataSource<trdata>();
  public dataSource1 = new MatTableDataSource<meterdata>();
  public dataSource2 = new MatTableDataSource<meterdata2>();



  constructor(private configService :ConfigService,public authService: AuthService,private http: HttpClient,private uploadService : FileuploadService) {
    this.getpeaList();
    this.getpeaList2();

  }
  ngOnInit() {
  //this.peaCode = localStorage.getItem('peaCode');
  this.getTrData();
  this.getStatus();
  this.getJobProgressPea();
  //this.getMeterData();
  
  this.dataSource.paginator = this.paginator; 
  this.dataSource1.paginator = this.paginator1; 
  this.dataSource2.paginator = this.paginator2; 
  this.dataSource.sort = this.sort;
  this.dataSource1.sort = this.sort1;
  this.dataSource2.sort = this.sort2;
  this.peaCode = localStorage.getItem('peaCode');
  //this.peaNum = this.peaCode.substr(1, 5);
  this.selPeapeaCode = this.peaCode.substr(0, 4);
  }
  checkwbs(wbs){
    if (wbs ==null){
      return 1;
    }else if (wbs.length==0){
      return 1;
    }else{
      return 0;
    }
    
  }

  checkAoj(Aoj){

    if (Aoj.substring(2,7) == this.peaCode.substring(1,6)){
      return true;
    }else{
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
        var kvaObj=[];
        this.TrTotal = 0;
        var kvaPln = [];
        var kvaPercent = [];
        this.TrPlnTal = 0;
        var unit=" เครื่อง";
        var newKva=0;
        data['data'].forEach(element => {
          kvaObj[element.Pea] = Number(element.totalTr);
          this.TrTotal = this.TrTotal + Number(element.totalTr);   
        });

        data['dataP'].forEach(element => {
          Pea.push(this.peaname["B" + element.Pea]);
          kvaPln.push(element.totalTr);
          this.TrPlnTal = this.TrPlnTal + Number(element.totalTr);
          //this.TrTotal = this.TrTotal + element.totalTr; 
          //------------new------
          // newKva=Math.floor(element.totalTr*0.7)+Math.floor(element.totalTr*0.2*Math.random());
          // kva.push(newKva);
          // this.TrPlnTal = this.TrPlnTal + Number(element.totalTr);
          // this.TrTotal = this.TrTotal + newKva;   
          // kvaPercent.push(newKva/element.totalTr*100)
            //--------------------------
          if (kvaObj[element.Pea]){
            kva.push(kvaObj[element.Pea]);
            kvaPercent.push(kvaObj[element.Pea]/element.totalTr*100)
          }else{
            kva.push(0);
            kvaPercent.push(0);
          }
          
     
        });
        
        //this.kvaTotal=505;
        //APEX CHART
        
        this.chartOptions1 = {
          series: [this.TrTotal / this.TrPlnTal * 100],
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
              name: "มี WBS/ใบสั่ง แล้ว",
              data: kva
            },
            {
              name: "หม้อแปลงทั้งหมด",
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
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' เครื่อง';
              }
            }
          },
          xaxis: {
            categories: Pea,
            labels: {
              formatter: function (val, index) {
                //console.log(index);
                //return Math.abs(kva[index.dataPointIndex]) + " kVA";
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+''},
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
    
    this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+this.peaCode)
    //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
    .subscribe(res => {
      this.dataSource.data = res as trdata[];
    })
  }


  public getMtData = (PEA_TR) => {
    
    this.configService.getMeter('Meter.php?PEA_TR='+PEA_TR)
    //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
    .subscribe(res => {
      this.dataSource1.data = res as meterdata[];
    })
  }
  applyFilter(filterValue: string) {
    console.log((filterValue+" "+localStorage.getItem('peaEng')).trim().toLowerCase());
    this.dataSource.filter = (filterValue).trim().toLowerCase();
  }
  applyFilter1(filterValue: string) {
    
    this.dataSource1.filter = (filterValue).trim().toLowerCase();
  }
  applyWBS(event) {
    this.configService.postdata2('wriWBS.php',{TRNumber:event[1].PEA_TR,WBS :event[0]}).subscribe((data=>{
      if(data['status']==1){
         this.getTrData();
        //  this.getStatus();
         this.getJobProgressPea();
        //console.log(this.peaname);
      }else{
        alert(data['data']);
      }
  
    }))  
  }

  applyRLoad(event) {
    console.log(event);
    this.configService.postdata2('wriRLoad.php',{TRNumber:event[1].PEA_TR,RLoad :event[0]}).subscribe((data=>{
      if(data['status']==1){
         this.getTrData();
        //console.log(this.peaname);
      }else{
        alert(data['data']);
      }
  
    }))  
  }

  applyRVoltage(event) {
    console.log(event);
    this.configService.postdata2('wriRVoltage.php',{TRNumber:event[1].PEA_TR,RVoltage :event[0]}).subscribe((data=>{
      if(data['status']==1){
         console.log(data['data']);
         this.getTrData();
        //console.log(this.peaname);
      }else{
        alert(data['data']);
      }
  
    }))  
  }

  selectStatus(event){
    console.log(event);
    this.configService.postdata2('wristatus.php',{TRNumber:event.value[1].PEA_TR,status :event.value[0]}).subscribe((data=>{
      if(data['status']==1){
         console.log(data['data']);
         this.getTrData();
        //console.log(this.peaname);
      }else{
        alert(data['data']);
      }
  
    }))
  }

  selectCondition(event){
    this.condition=event.value[0];
    this.getTrData();

  }


  onSubmit() {

    /*if(data['status']==1){
      this.registerForm.resetForm();
      this.getData();
      alert("เก็บข้อมูลแล้วเสร็จ");
    }else{
    alert(data.data);
    }*/

    this.configService.getmeterdata2('serchmeter.php?PEA_Meter='+this.registerForm.value.PEAMeter)
    //this.configService.getTr('TR.php?condition='+this.condition+'&peaCode0='+'B00000')
    .subscribe(res => {
      this.registerForm.resetForm();  
      this.dataSource2.data = res as meterdata2[];
      
    })
  }

  getStatus(){
    this.configService.postdata2('rdstat.php',{peaCode : localStorage.getItem('peaCode')}).subscribe((data=>{
      if(data['status']==1){
        this.PEA_TR0 =data['data'][0];
        this.PEA_TR1 =data['data'][1];
        this.PEA_TR2 =data['data'][2];
        this.PEA_TR3 =data['data'][3];
        this.WBS4 =data['data'][4];
        this.WBS5 =data['data'][5];
        this.WBS6 =data['data'][6];
        this.PEA_TR1perPEA_TR0=Number(data['data'][1])/Number(data['data'][0])*100;
        this.PEA_TR2perPEA_TR0=Number(data['data'][2])/Number(data['data'][0])*100;
        this.PEA_TR3perPEA_TR0=Number(data['data'][3])/Number(data['data'][0])*100;
        this.WBS4perPEA_TR1=Number(data['data'][4])/Number(data['data'][1])*100;
        this.WBS5perPEA_TR2=Number(data['data'][5])/Number(data['data'][2])*100;
        this.WBS6perPEA_TR3=Number(data['data'][6])/Number(data['data'][3])*100;

        console.log (this.PEA_TR0);

        //this.nwbsMR =data.data.MR.nwbs;
        //this.workCostPerMR=Number(data.data.MR.workCostAct)/Number(data.data.MR.workCostPln)*100;
        //this.nwbsBY =data.data.BY.nwbs;
        //this.workCostPerBY=Number(data.data.BY.workCostAct)/Number(data.data.BY.workCostPln)*100;
        //this.nwbsAll =data.data.BY.All;
        //this.workCostPerAll=Number(data.data.All.workCostAct)/Number(data.data.All.workCostPln)*100;
        //this.nwbs=data.data.nwbs;
        //this.WorkCostPercent=Number(data.data.workCostAct)/Number(data.data.workCostPln*0.8)*100;
        if (this.myDonut) this.myDonut.destroy();
  
        this.myDonut = new Chart('myDonut', {
          type: 'doughnut',
          data:  {
            datasets: [{
              data: [this.PEA_TR1perPEA_TR0.toFixed(2),(100-this.PEA_TR1perPEA_TR0).toFixed(2)
              ],
              backgroundColor: [
                "#FFC300","#a68fe8",
              ],
            }],
            labels: [
              ' แรงดันต่ำกว่า 200 Volt และโหลดเกิน 80% : '+ [this.PEA_TR1perPEA_TR0.toFixed(2)]+' %',
              ' '+[(100-this.PEA_TR1perPEA_TR0).toFixed(2)]+' %',]
          },plugins: [{
            beforeDraw: function(chart) {
              var width = chart.chart.width,
                  height = chart.chart.height,
                  ctx = chart.chart.ctx;
                  //text =chart.config.data.dataset[0].data[0];
              
              ctx.restore();
              var fontSize = (height / 120).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#FFFEFF";
              var text = chart.config.data.datasets[0].data[0]+"%",
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height / 2;
          
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
        }],
        options: {
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function(tooltipItems, data) {
                return data.labels[tooltipItems.index];
              }
            }
          },
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: false,
          legend: {
            position: 'bottom',
            display: false,
          
          },
          title: {
            display: false,
            text: "tst"
          }
        } 
      });

      if (this.myDonut200) this.myDonut200.destroy();
  
        this.myDonut200 = new Chart('myDonut200', {
          type: 'doughnut',
          data:  {
            datasets: [{
              data: [this.PEA_TR2perPEA_TR0.toFixed(2),(100-this.PEA_TR2perPEA_TR0).toFixed(2)
              ],
              backgroundColor: [
                "#FFC300","#ea73b2",
              ],
            }],
            labels: [
              ' แรงดันต่ำกว่า 200 Volt : '+ [this.PEA_TR2perPEA_TR0.toFixed(2)]+' %',
              ' '+[(100-this.PEA_TR2perPEA_TR0).toFixed(2)]+' %',]
          },plugins: [{
            beforeDraw: function(chart) {
              var width = chart.chart.width,
                  height = chart.chart.height,
                  ctx = chart.chart.ctx;
                  //text =chart.config.data.dataset[0].data[0];
              
              ctx.restore();
              var fontSize = (height / 120).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#FFFEFF";
              var text = chart.config.data.datasets[0].data[0]+"%",
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height / 2;
          
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
        }],
        options: {
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function(tooltipItems, data) {
                return data.labels[tooltipItems.index];
              }
            }
          },
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: true,
          legend: {
            position: 'bottom',
            display: false,
          
          },
          title: {
            display: false,
            text: "tst"
          }
        } 
      });

      if (this.myDonut80) this.myDonut80.destroy();
  
        this.myDonut80 = new Chart('myDonut80', {
          type: 'doughnut',
          data:  {
            datasets: [{
              data: [this.PEA_TR3perPEA_TR0.toFixed(2),(100-this.PEA_TR3perPEA_TR0).toFixed(2)
              ],
              backgroundColor: [
                "#FFC300","#55bae0",
              ],
            }],
            labels: [
              'โหลดเกิน 80% : '+ [this.PEA_TR3perPEA_TR0.toFixed(2)]+' %',
              ' '+[(100-this.PEA_TR3perPEA_TR0).toFixed(2)]+' %',]
          },
          plugins: [{
            beforeDraw: function(chart) {
              var width = chart.chart.width,
                  height = chart.chart.height,
                  ctx = chart.chart.ctx;
                  //text =chart.config.data.dataset[0].data[0];
              
              ctx.restore();
              var fontSize = (height / 120).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#FFFEFF";
              var text = chart.config.data.datasets[0].data[0]+"%",
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height / 2;
          
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
        }],
        options: {
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function(tooltipItems, data) {
                return data.labels[tooltipItems.index];
              }
            }
          },
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: true,
          legend: {
            position: 'bottom',
            display: false,
          
          },
          title: {
            display: false,
            text: "tst"
          }
        } 
      });

      if (this.myDonutWBS4) this.myDonutWBS4.destroy();
  
        this.myDonutWBS4 = new Chart('myDonutWBS4', {
          type: 'doughnut',
          data:  {
            datasets: [{
              data: [this.WBS4perPEA_TR1.toFixed(2),(100-this.WBS4perPEA_TR1).toFixed(2)
              ],
              backgroundColor: [
                "#FFC300","#a68fe8",
              ],
            }],
            labels: [
              'WBS จาก แรงดันต่ำกว่า 200 Volt และโหลดเกิน 80% : '+ [this.WBS4perPEA_TR1.toFixed(2)] + '%',
              ' '+ [(100-this.WBS4perPEA_TR1).toFixed(2)]+ '%',]
          },plugins: [{
            beforeDraw: function(chart) {
              var width = chart.chart.width,
                  height = chart.chart.height,
                  ctx = chart.chart.ctx;
                  //text =chart.config.data.dataset[0].data[0];
              
              ctx.restore();
              var fontSize = (height / 120).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#FFFEFF";
              var text = chart.config.data.datasets[0].data[0]+"%",
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height / 2;
          
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
        }],
        options: {
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function(tooltipItems, data) {
                return data.labels[tooltipItems.index];
              }
            }
          },
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: true,
          legend: {
            position: 'bottom',
            display: false,
          
          },
          title: {
            display: false,
            text: "tst"
          }
        } 
      });

      if (this.myDonutWBS5) this.myDonutWBS5.destroy();
  
        this.myDonutWBS5 = new Chart('myDonutWBS5', {
          type: 'doughnut',
          data:  {
            datasets: [{
              data: [this.WBS5perPEA_TR2.toFixed(2),(100-this.WBS5perPEA_TR2).toFixed(2)
              ],
              backgroundColor: [
               "#FFC300", "#ea73b2",
              ],
            }],
            labels: [
              'WBS จาก แรงดันต่ำกว่า 200 Volt : '+ [this.WBS5perPEA_TR2.toFixed(2)] + '%',
              ' '+ [(100-this.WBS5perPEA_TR2).toFixed(2)]+ '%',]
          },plugins: [{
            beforeDraw: function(chart) {
              var width = chart.chart.width,
                  height = chart.chart.height,
                  ctx = chart.chart.ctx;
                  //text =chart.config.data.dataset[0].data[0];
              
              ctx.restore();
              var fontSize = (height / 120).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#FFFEFF";
              var text = chart.config.data.datasets[0].data[0]+"%",
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height / 2;
          
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
        }],
        options: {
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function(tooltipItems, data) {
                return data.labels[tooltipItems.index];
              }
            }
          },
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: true,
          legend: {
            position: 'bottom',
            display: false,
          
          },
          title: {
            display: false,
            text: "tst"
          }
        } 
      });

      if (this.myDonutWBS6) this.myDonutWBS6.destroy();
  
        this.myDonutWBS6 = new Chart('myDonutWBS6', {
          type: 'doughnut',
          data:  {
            datasets: [{
              data: [this.WBS6perPEA_TR3.toFixed(2),(100-this.WBS6perPEA_TR3).toFixed(2)
              ],
              backgroundColor: [
                "#FFC300","#55bae0",
              ],
            }],
            labels: [
              'WBS จาก โหลดเกิน 80% : '+ [this.WBS6perPEA_TR3.toFixed(2)] + '%',
              ' '+ [(100-this.WBS6perPEA_TR3).toFixed(2)]+ '%',]
          },plugins: [{
            beforeDraw: function(chart) {
              var width = chart.chart.width,
                  height = chart.chart.height,
                  ctx = chart.chart.ctx;
                  //text =chart.config.data.dataset[0].data[0];
              
              ctx.restore();
              var fontSize = (height / 120).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#FFFEFF";
              var text = chart.config.data.datasets[0].data[0]+"%",
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height / 2;
          
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
        }],
        options: {
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function(tooltipItems, data) {
                return data.labels[tooltipItems.index];
              }
            }
          },
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: true,
          legend: {
            position: 'bottom',
            display: false,
          
          },
          title: {
            display: false,
            text: "tst"
          }
        } 
      });


    
      }else{
        alert(data['data']);
      }

      
  
    }));
    
    
  
  }
  exportAsXLSX():void {
    this.configService.exportAsExcelFile(this.dataSource.data, 'TRdata');
 }
 exportAsXLSX2():void {
  this.configService.exportAsExcelFile(this.dataSource1.data, 'MeterData');
}
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


