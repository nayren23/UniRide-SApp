import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../core/models/user.model';
import { Ranking } from 'src/app/core/models/ranking.model';
import { ScoreCriteria } from 'src/app/core/models/score-criteria.models';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  loading: boolean = true;
  /**
   * Attributes for driver ranking table
   */
  listDriver: User[] = [];
  driverRankingList: Ranking[] = [];
  scoreCriteriaColumsDriver: ScoreCriteria[] = [];

  /**
   * Attributes for passenger ranking table
   */
  listPassenger: User[] = [];
  passengerRankingList: Ranking[] = [];
  scoreCriteriaColumsPassenger: ScoreCriteria[] = [];

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getRankingList('driver');
    this.getRankingList('passenger');
  }

  /**
   * Call the API to get the ranking list
   * @param type 
   */
  getRankingList(type: 'driver' | 'passenger') {
    const rankingObservable = type === 'driver' ? this.userService.getDriverRanking() : this.userService.getPassengerRanking();

    rankingObservable.subscribe({
      next: (data: any) => {
        data.ranking.forEach((ranking: any) => {
          const user: User = {
            id: ranking.user.id,
            firstname: ranking.user.firstname,
            lastname: ranking.user.lastname,
            profile_picture: ranking.user.profile_picture,
          }

          const scoreCriteriaList: ScoreCriteria[] = ranking.scoreCriteria.map((criteria: any) =>
            new ScoreCriteria(criteria.id, criteria.name, criteria.value)
          )

          const rankingModel: Ranking = {
            user: user,
            average: ranking.average
          }

          scoreCriteriaList.forEach((columnLabel: ScoreCriteria) => {
            rankingModel[columnLabel.name] = columnLabel.value
          });

          if (type === 'driver') {
            this.listDriver.push(user);
            this.scoreCriteriaColumsDriver = scoreCriteriaList;
            this.driverRankingList.push(rankingModel);
            this.driverRankingList = [...this.driverRankingList]; // refresh the table
          } else {
            this.listPassenger.push(user);
            this.scoreCriteriaColumsPassenger = scoreCriteriaList;
            this.passengerRankingList.push(rankingModel);
            this.passengerRankingList = [...this.passengerRankingList]; // refresh the table
          }
        })
        this.loading = false;
      },
      error: (error: any) => {
        this.toastr.error('La récupération du classement a échoué. Veuillez réessayer ultérieurement.', 'Erreur');
      },
    })
  }
}