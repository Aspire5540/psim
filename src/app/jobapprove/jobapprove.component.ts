import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { jobreq, appJob } from '../model/user.model';
import { MatSort } from '@angular/material/sort';
import { Chart } from 'chart.js';
import { ConfirmationDialog } from '../sumtable/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-jobapprove',
  templateUrl: './jobapprove.component.html',
  styleUrls: ['./jobapprove.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
    ]),
  ],
})
export class JobapproveComponent implements OnInit {
  public dataSource = new MatTableDataSource<jobreq>();
  public dataSource1 = new MatTableDataSource<appJob>();
  @ViewChild('f', { static: false }) registerForm: NgForm;
  expandedElement: jobreq | null;
  selPeapeaCode = 'B000';
  projectName = '';
  WorkCost = 0;
  WorkCostPercent = 0;
  WorkCostApp = 0;
  projectBudget = 0;
  nwbs = 0;
  nwbsArr = [];
  nwbsApp = [];
  peaname = [];
  peaCode = "";
  URL = "http://172.30.212.148/psisservice/uploads/";
  WorkCostPercentPea = [];
  matCostPercentPea = [];
  WorkCostPea = [];
  myPieChart: Chart;
  chartData: any;
  chartTitle: string;
  selectAppChoice = '';
  budjets = [];
  trObj = {};
  dataTypes = [
    { value: 0, viewValue: 'จำนวนงานคงค้าง' },
    { value: 1, viewValue: '% เบิกจ่าย' },
    { value: 2, viewValue: 'งานที่ขออนุมัติ' },

  ];
  appStatus = [
    { value: 0, viewValue: 'ยังไม่อนุมัติ' },
    { value: 1, viewValue: 'อนุมัติแล้ว' },
    { value: '', viewValue: 'ทั้งหมด' },

  ];
  selPea = '';
  totalWbs = 0;
  selBudjet = ['', ''];
  selected = 2;
  nWbs = 0;
  choice: number;
  displayedColumns = ['wbs', 'jobName', 'mv', 'lv', 'tr', 'causeName', 'solveMet', 'note', 'workCostPln', 'rename', 'reTr', 'del', 'ldcad'];
  displayedColumns1 = ['wbs', 'jobName', 'mv', 'lv', 'tr', 'totalcost', 'matCostInPln', 'workCostPln', 'appNo', 'appDoc'];
  notes = ['1.งานร้องเรียน', '2.PM/PS', '3.งานเร่งด่วน', '4.งานปกติ']
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild('sort', { static: false }) sort: MatSort;

  @ViewChild('paginator1', { static: false }) paginator1: MatPaginator;
  @ViewChild('sort1', { static: false }) sort1: MatSort;

  constructor(private configService: ConfigService, private dialog: MatDialog) { }
  ngOnInit() {

    //this.getData(this.selPea,this.selBudjet);
    //this.rdsumcost();
    this.peaCode = localStorage.getItem('peaCode');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort1;
    this.getpeaList();
    this.getFilter();
    //this.getJobProgress();
    this.getJobProgressPea();
    this.getTRList();


  }
  getTRList() {
    this.configService.getData('ldcad/rdtr.php').subscribe(res => {
      this.trObj = {};
      res["data"].forEach(element => {
        this.trObj[element.PEA_TR] = { 'minV': element.minV, 'Load': element.PLoadTOT, 'Ub': element.Ub }
      });
      // console.log(this.trObj);
    })

  }
  chkLDCAD(peaTR) {
    var status = '';
    // if (peaTR.trim().length>9){
    //   console.log(peaTR.trim().split(","));
    // 
    if(peaTR){
      peaTR.trim().split(",").forEach(element => {
        // console.log(peaTR.trim().split(","),this.trObj[element.trim()]);
        if (this.trObj[element.trim()] != undefined) {
          if (this.trObj[element.trim()].minV < 200) {
            status = status + "V";
          }
          if (this.trObj[element.trim()].Load > 80) {
            status = status + "L";
          }
  
          if (this.trObj[element.trim()].Ub > 25) {
            status = status + "U";
          }
  
        }
      });
    }

    return status;

  }
  selectDataType(event) {
    this.selected = event.value;
    this.getJobProgressPea();

  }
  getAppData = (filter) => {
    this.configService.getAppJob('rdAppJob.php?peaEng=' + localStorage.getItem('peaEng') + '&filter1=' + filter[0] + '&filter2=' + filter[1])
      .subscribe(res => {
        this.dataSource1.paginator = this.paginator1;
        this.dataSource1.sort = this.sort1;
        this.dataSource1.data = res as appJob[];

      })
  }
  getFilter() {
    this.configService.postdata2('rdfilter.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        data['data'].forEach(element => {
          this.budjets.push({ value: [element.filter1, element.filter2], viewValue: element.project })
        });
      } else {
        alert(data['data']);
      }
    }))
  }
  getData = (pea, data) => {

    this.configService.getJob('rdimjobview.php?peaCode=' + pea + '&filter1=' + data[0] + '&filter2=' + data[1] + '&status=' + this.selectAppChoice)
      .subscribe(res => {
        this.dataSource.data = res as jobreq[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }
  applyFilter(filterValue: string) {
    //console.log((filterValue+" "+localStorage.getItem('peaEng')).trim().toLowerCase());
    this.dataSource.filter = (filterValue).trim().toLowerCase();
  }
  applyFilter1(filterValue: string) {

    this.dataSource1.filter = (filterValue).trim().toLowerCase();
  }
  selWbs(wbsdata) {
    this.configService.postdata2('addjob.php', { wbs: wbsdata.wbs, status: 1 }).subscribe((data => {
      if (data['status'] == 1) {
        this.getData(this.selPea, this.selBudjet);
        this.rdsumcost();
        this.getJobProgressPea();
        //alert("ลบข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))

  }
  getpeaList() {
    this.configService.postdata2('rdpeaall.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        //console.log(data['data']);
        this.peaname = data['data'];
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }))

  }
  getJobProgressPea() {

    if (this.selected == 2) {
      this.configService.postdata2('rdsummaryAll.php', { peaCode: this.selPeapeaCode, filter1: this.selBudjet[0], filter2: this.selBudjet[1] }).subscribe((data => {
        if (data['status'] == 1) {
          this.WorkCostPea = [];
          this.nwbsArr = [];
          this.nwbsApp = [];

          data['nwbsApp'].forEach(element => {
            this.WorkCostPea.push(element.Pea);
            this.nwbsApp.push(element.nstatus);
            this.nwbsArr.push(element.totalWbs);


          });


          // console.log(data.nwbsApp);
          this.chartData = {
            labels: this.WorkCostPea,
            datasets: [
              {
                label: 'งานที่ขออนุมัติ',
                data: this.nwbsArr,
                backgroundColor: '#07CCD6',
              },
              {
                label: 'งานที่อนุมัติครั้งนี้',
                data: this.nwbsApp,
                backgroundColor: '#DAF7A6',
              }]
          };
          this.chartTitle = 'จำนวนงานที่ขออนุมัติเปิดงาน';
          if (this.myPieChart) this.myPieChart.destroy();
          this.myPieChart = new Chart('myPieChart', {
            type: 'bar',
            data: this.chartData,
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
                text: this.chartTitle
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            },

          });

        }


      }));


    } else {
      this.configService.postdata2('rdJobProgressPea.php', { peaCode: this.selPeapeaCode, filter1: this.selBudjet[0], filter2: this.selBudjet[1] }).subscribe((data => {
        if (data['status'] == 1) {
          this.WorkCostPea = [];
          this.WorkCostPercentPea = [];

          this.nwbsArr = [];
          this.matCostPercentPea = [];
          data['data'].forEach(element => {





            this.nwbsArr.push(element.nWBS);
            this.WorkCostPea.push(element.Pea);
            this.WorkCostPercentPea.push((Number(element.workCostAct) / Number(element.workCostPln) * 100).toFixed(2));
            this.matCostPercentPea.push((Number(element.matCostAct) / Number(element.matCostPln) * 100).toFixed(2));


          });

          if (this.selected == 0) {
            this.chartData = {
              labels: this.WorkCostPea,
              datasets: [{
                label: 'จำนวนงานคงค้าง',
                data: this.nwbsArr,
                backgroundColor: '#07CCD6',
              }]
            };
            this.chartTitle = 'จำนวนงานคงค้าง'
          }
          else {
            this.chartData = {
              labels: this.WorkCostPea,
              datasets: [
                {
                  label: 'คชจ.หน้างาน',
                  data: this.WorkCostPercentPea,
                  backgroundColor: '#07CCD6',
                },
                {
                  label: 'ค่าพัสดุ',
                  data: this.matCostPercentPea,
                  backgroundColor: '#DAF7A6',
                }]
            };
            this.chartTitle = '% การเบิกจ่าย';
          }


          if (this.myPieChart) this.myPieChart.destroy();

          this.myPieChart = new Chart('myPieChart', {
            type: 'bar',
            data: this.chartData,
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
                text: this.chartTitle
              }
            }
          });
          //this.nwbs=data['data'].nwbs;
          //this.WorkCostPercent=Number(data['data'].workCostAct)/Number(data['data'].workCostPln*0.8)*100;

        } else {
          alert(data['data']);
        }

      }));

    }

  }
  getApproved() {
    this.configService.postdata2('rdapproved.php', { peaEng: this.selPea, filter1: this.selBudjet[0], filter2: this.selBudjet[1] }).subscribe((data => {
      if (data['status'] == 1) {

        this.WorkCostApp = Number(data['data'].sumWorkCostPln);
        this.projectBudget = Number(data['data'].budget);
        //console.log(this.peaname);
      } else {
        alert(data['data']);
      }

    }));

  }
  delWbs(wbsdata) {
    //console.log(wbsdata);
    this.configService.postdata2('addjob.php', { wbs: wbsdata.wbs, status: 0 }).subscribe((data => {
      if (data['status'] == 1) {
        this.getData(this.selPea, this.selBudjet);
        this.rdsumcost();
        this.getJobProgressPea();
        //alert("ลบข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))

  }
  rdsumcost() {
    this.configService.postdata2('rdsummary.php', { peaEng: this.selPea, filter1: this.selBudjet[0], filter2: this.selBudjet[1] }).subscribe((data => {

      this.getData(this.selPea, this.selBudjet);
      this.nWbs = Number(data['nWbs']);
      this.WorkCost = Number(data['sumWorkCostPln']);
      this.totalWbs = Number(data['totalWbs']);

    }))
  }
  selectApprove(event) {
    this.selectAppChoice = event.value;
    this.getData(this.selPea, this.selBudjet);
  }
  selectBudget(event) {

    this.selBudjet = event.value;

    this.getApproved();
    this.getData(this.selPea, this.selBudjet);
    //this.getJobProgress();
    this.rdsumcost();
    this.getJobProgressPea();
    this.getAppData(event.value);
  }
  selectPea(event) {

    this.selPea = event.value[0];
    this.selPeapeaCode = event.value[1];
    //this.getJobProgress();
    this.getData(this.selPea, this.selBudjet);
    this.rdsumcost();
    this.getJobProgressPea();

  }
  onSubmit() {
    var wdata = this.registerForm.value;
    wdata["filter1"] = this.selBudjet[0];
    wdata["filter2"] = this.selBudjet[1];
    console.log(wdata);

    this.configService.postdata2('wrAppJob.php', wdata).subscribe((data => {
      if (data['status'] == 1) {
        this.getData(this.selPea, this.selBudjet);
        this.rdsumcost();
        this.getJobProgressPea();
        this.registerForm.resetForm();
        alert("บันทึกแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))

  }
  exportAsXLSX(): void {
    this.configService.exportAsExcelFile(this.dataSource.data, 'sample');
  }
  exportAsXLSX2(): void {
    this.configService.exportAsExcelFile(this.dataSource1.data, 'งานที่อนุมัติ');
  }
  renameWbs(wbsdata) {
    //console.log(wbsdata.wbs);
    this.configService.postdata2('renameWBS.php', wbsdata).subscribe((data => {
      if (data['status'] == 1) {
        //this.getData();
        this.getData(this.selPea, this.selBudjet);
        alert("แก้ไขข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }
  reTr(wbsdata) {
    //console.log(wbsdata.wbs);
    this.configService.postdata2('reTR.php', wbsdata).subscribe((data => {
      if (data['status'] == 1) {
        //this.getData();
        this.getData(this.selPea, this.selBudjet);
        alert("แก้ไขข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))
  }
  openDialog(wbs, choice): void {
    console.log("open");
    this.choice = choice;
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '300px',
      data: { wbs: wbs, choice: choice }
    });

    dialogRef.afterClosed().subscribe((wbsdata) => {
      //console.log('Choice :' + this.choice);
      if (wbsdata) {
        if (this.choice == 1) { this.delWbs(wbsdata); }
        if (this.choice == 2) { this.renameWbs(wbsdata); }
        if (this.choice == 3) { this.reTr(wbsdata); }
      }
    });
  }
}
