import { Component } from '@angular/core';
import { LeaderboardRow,UserPoints } from 'src/app/model/leaderboard-row';
import { UserDto } from 'src/app/service/authentication.service';
import { LeaderboardService } from 'src/app/service/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

leaderboardRows:LeaderboardRow[]=[];
userPoints!:UserPoints[];
constructor(private leaderboardService: LeaderboardService){}
ngOnInit(): void {
  this.getLeaderboardList();
}
private getLeaderboardList(){
this.leaderboardService.getLeaderboardList().subscribe(data=>{
  //data.data is here because of ApiResponseDTO object in the spring boot backend 
  //this.leaderboardRows = data.data;
  this.userPoints =data.data;
  for (let i=0;i<this.userPoints.length;i++){
    this.leaderboardService.getUserById(this.userPoints[i].userId).subscribe(
      data =>
      {
      this.leaderboardRows.unshift({username:data.data.username,totalPoints:this.userPoints[i].score});
      });
  }
});
}

}
