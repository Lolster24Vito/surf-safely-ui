import { Component } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { ScanService } from '../service/scan.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {
  urlInput!: string;
  urlResponseMessage?:string="no malware matches";
   constructor(private scanService: ScanService) {
  }
  //testing url virus https://testsafebrowsing.appspot.com/s/malware.html
  scanURL(){
    console.log(this.urlInput);
  // let CheckUrlResponse =this.scanService.scanUrl(this.urlInput);
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
    error: (e) => console.error(e)
  }
  );
    
  }
}
