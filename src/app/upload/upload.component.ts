import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ConfigService } from '../config/config.service';

import {MatTableDataSource,MatPaginator} from '@angular/material';
import { wbsdata  } from '../model/user.model';
import { AuthService } from '../config/auth.service';
import { HttpClient} from '@angular/common/http';
import {FileuploadService} from '../config/fileupload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('f', { static: false }) registerForm: NgForm;

  URL ="http://127.0.0.1/psisservice/uploadssap/";
  uploadDocResponse = '';
  uploadDocResponse2 = '';
  uploadDocResponse3 = '';
  uploadDocResponse4 = '';
  constructor(private configService :ConfigService,public authService: AuthService,private http: HttpClient,private uploadService : FileuploadService) { }
  peaCode="";
  ngOnInit() {
    this.peaCode = localStorage.getItem('peaCode');
 

    
  }
  handleFile048(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadZap048(formData).subscribe(res => {
        this.uploadDocResponse = res.status;   
        //console.log(res);   
      }
    );
  }
  handleFileGIS(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadGIS(formData).subscribe(res => {
        this.uploadDocResponse2 = res.status;   
        //console.log(res);   
      }
    );
  }
  handleFileLvpro(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadLvpro(formData).subscribe(res => {
        this.uploadDocResponse3 = res.status;   
        //console.log(res);   
      }
    );
  }
  handleFilePM(event) {
    //console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    this.uploadService.uploadPM(formData).subscribe(res => {
        this.uploadDocResponse4 = res.status;   
        //console.log(res);   
      }
    );
  }
  onSubmit(){

    this.configService.postdata2('w048tosql.php',this.registerForm.value).subscribe((data=>{
      if(data['status']==1){
          this.registerForm.resetForm();
          alert("เก็บข้อมูลแล้วเสร็จ");
      }else{
        alert(data['data']);
      }

    }))
  }
  onSubmit2(){
    this.configService.postdata2('phase/gistosql.php',{}).subscribe((data=>{
      if(data['status']==1){
          this.registerForm.resetForm();
          alert("เก็บข้อมูลแล้วเสร็จ");
      }else{
        alert(data['data']);
      }

    }))
  }
  uploadLvpro(){
    this.configService.postdata2('uploadsql/lvprotosql.php',{}).subscribe((data=>{
      if(data['status']==1){
          this.registerForm.resetForm();
          alert("เก็บข้อมูลแล้วเสร็จ");
      }else{
        alert(data['data']);
      }

    }))
  }
  uploadPM(){
    this.configService.postdata2('uploadsql/PMtosql.php',{}).subscribe((data=>{
      if(data['status']==1){
          this.registerForm.resetForm();
          alert("เก็บข้อมูลแล้วเสร็จ");
      }else{
        alert(data['data']);
      }

    }))
  }
}
