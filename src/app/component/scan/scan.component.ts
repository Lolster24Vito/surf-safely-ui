import { Component } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { ScanService } from '../../service/scan.service';
import { Stats } from '../../model/checkFile/stats';
import { Observable } from 'rxjs';
import { timer  } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {
  urlInput!: string;
  urlResponseMessage?:string=" ";
  
  fileToUpload: any | null = null;
  fileResponseMessage?:string=" ";
  fileStats:Stats | null = null;
  fileCheckStatus:string="";

  fileScanned:boolean=false;
  scanFileClicked:boolean=false;
  scanFileSubscription:any;

   constructor(private scanService: ScanService,private authenticationService: AuthenticationService,private router: Router){
    if (!this.authenticationService.isLoggedIn()) {
      router.navigate(['login']);
    }
  }
  ngOnDestroy(){
    if(this.scanFileSubscription){

      console.log(this.scanFileSubscription,"susbcsription");
      this.scanFileSubscription.unsubscribe();
    }
  }
  //testing url virus https://testsafebrowsing.appspot.com/s/malware.html
  scanURL(){
  this.scanService.scanUrl(this.urlInput).subscribe({
    next: (response) => {
      console.log("scan response",response);
      if(response.data.matches){

        this.urlResponseMessage="*Scan found this as:"+response.data.matches[0].threatType;
      }
      else{
        this.urlResponseMessage="* No malware matches";
      }
    
      console.log(this.urlResponseMessage);

    },
    error: (e) => {console.error(e);
    alert(e.urlResponseMessage);
    }
  }
  );
    
  }
  onFileSelected(event: any) {
    console.log(event);
    //target.files
    //this.fileToUpload = event.item(0);
    //.item(0)
    if (event.target.files.length > 0) {
    this.fileToUpload = event.target.files[0];
    }
}
scanFile() {
  let formData: FormData = new FormData();
 formData.append('file', this.fileToUpload);
 console.log("file",this.fileToUpload);

 this.scanService.scanFile(formData).subscribe({
  next: (response) => {
    console.log("scan file response",response);
    let status=response.data.data.attributes.status;
    let stats:Stats=response.data.data.attributes.stats;
    this.fileResponseMessage = status;
    this.fileStats=stats;
    console.log(status,"STATUSSS");
    
    if(this.fileResponseMessage=="queued"){
      this.fileScanned=false;
    }
     if(status=="completed"){
      this.fileResponseMessage="scanned:";
      this.fileScanned=true;
      this.scanFileSubscription.unsubscribe();
    }
    console.log(stats);
  },
  error: (e) => {
    console.error(e);
    this.fileResponseMessage="Error";
    this.scanFileSubscription.unsubscribe();
  }
}
);
}


scanFileButtonClick(){
  this.scanFileClicked=true;
  if(this.scanFileClicked)
  {
  this.scanFileSubscription=timer(0,10000).subscribe((data) =>{
    this.scanFile();
    this.scanFileClicked=false;
  })
  }
}


}
