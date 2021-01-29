
export interface Product {
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

export interface Owner {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: string;

}

export class User {
  id: number;
  userName: string;
  password: string;
  name: string;
  peacode: string;
  peaname: string;
}
export interface wbsdata {
  projectType: string;
  wbs: string;
  jobName: string;
  docName: string;
  causeName: string;
  solveMet: string;
  mv: number;
  tr: number;
  lv: number;
  filename: string;
  peatr: number;
  vdrop: number;
  loadTr: number;
  status: string;
  user: string;
  peaCode: string;
  note: string;
}

export interface jobreq {

  wbs: string;
  jobName: string;
  mv: number;
  tr: number;
  lv: number;
  causeName: string;
  solveMet: string;
  note: string;
  user: string;
  workCostPln: number;

}
export interface jobprogress {
  wbs: string;
  jobName: string;
  matCostM1: number;
  matCostM2: number;
  matCostM3: number;
  workCostM1: number;
  workCostM2: number;
  workCostM3: number;


}
export interface appJob {
  wbs: string;
  jobName: string;
  mv: number;
  tr: number;
  lv: number;
  workCostPln: number;
  totalcost: number;
  matCostInPln: number;
  appNo: string;
  appDoc: string;

}
export interface jobRemain {
  wbs: string;
  jobName: string;
  workCostPln: number;
  userStatus: string;
  jobStatus: string;
  workCostAct: number;
}
export interface jobRemain2 {
  wbs: string;
  jobName: string;
  workCostPln: number;
  userStatus: string;
  jobStatus: string;
  workCostAct: number;

}

export interface trdata {
  PEA_TR: string;
  Location: string;
  Feeder: number;
  LineSize: string;
  aoj: string;
  kva: number;
  minV: number;
  NumberCus: number;
  I: number;
  Load: number;
  PLoad: number;
  PLoadTOT: number;
  Loss: number;
  PLoss: number;
  LoadFlowStatus: string;
  MaxLen: number;
  PEAName: string;
  PEAName2: string;
  VRange: number;
  TotalCus: number;
  TRRange: number;
  PLoadPortion: number;
  Status: string;
  wbs: string;
  RLoad: number;
  RVoltage: number;
  Ub: number;
  jobStatus: string;
  rundate: Date;
  expDate: Date;
  Ia:number;
  Ib:number;
  Ic:number;
  note:string;
}
export interface matreq{
matName:string;
matCode:string;
nMat:number;
peaCode:string;
peaName:string;
}

export interface trmatch{
  PEA_TR:string;
  kva:string;
  PEANAME:string;
  newTR:string;
  newkva:number;
  newAoj:string;
  newPEANAME:string;
  distance:number;
  }


export interface meterdata {
  PEA_TR: string;
  PEA_Meter: string;
  kWh: number;
  CustName: string;
  Voltage: number;
  rate: string;
  rateMeter: string;
  SUBTYPECOD: number;
  Line_Type: string;
  Feeder: number;
}

export interface meterdata2 {
  PEA_TR: string;
  PEA_Meter: string;
  kWh: number;
  CustName: string;
  Voltage: number;
  rate: string;
  rateMeter: string;
  SUBTYPECOD: number;
  Line_Type: string;
  Feeder: number;
}
export interface trphase {
  PEA_TR: string;
  location: string;
  Feeder: number;
  aoj: string;
  Kva: number;
  status: string;
  SUBTYPECOD: number;
  peaName: string;
  nMeter: number;
  nSMRT: number;
}
export interface meterdata3 {
  PEA_Meter: string;
  PhaseMeterGis: string;
  LOCATION: string;
}
export class ezxdevice {
  DeviceID: number;
  deviceName: string;
  unit: string;
  DeviceQ: number;
  unitPrice: number;
  total: number;
}