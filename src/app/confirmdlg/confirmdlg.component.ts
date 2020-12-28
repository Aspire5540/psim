import { Component,Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmdlg',
  templateUrl: './confirmdlg.component.html',
  styleUrls: ['./confirmdlg.component.scss']
})
export class ConfirmdlgComponent {
  choice:any;
  output:any;
  message: string = "ต้องการลบใช่หรือไม่?"
  confirmButtonText = "ใช่"
  cancelButtonText = "ยกเลิก"
  uploadResponse = '';
  uploadDocResponse = '';
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ConfirmdlgComponent>) {
    if(data){
      this.output=data;
      this.choice=data.choice;
      console.log(data);
    }
   }
   onConfirmClick(): void {
    this.dialogRef.close(this.output);
  }

}
