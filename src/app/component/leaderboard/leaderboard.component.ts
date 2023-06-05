import { Component } from '@angular/core';
import { LeaderboardRow } from 'src/app/model/leaderboard-row';
import { LeaderboardService } from 'src/app/service/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
leaderboardRows!:LeaderboardRow[];
constructor(private leaderboardService: LeaderboardService){}
ngOnInit(): void {
  this.getLeaderboardList();
}
private getLeaderboardList(){
this.leaderboardService.getLeaderboardList().subscribe(data=>{
  //data.data is here because of ApiResponseDTO object in the spring boot backend 
  this.leaderboardRows = data.data;
  console.log(this.leaderboardRows);
});
}

}
