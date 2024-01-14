import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceMock } from '../../../core/services/user/user.service.mock';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../core/models/user.model';
import { Label } from 'src/app/core/models/label.model';
import { Ranking } from 'src/app/core/models/ranking.model';
import { ScoreCriteria } from 'src/app/core/models/score-criteria.models';
import { ColumnLabel } from 'src/app/core/models/column-labels.models';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  loading: boolean = true
  lisUsers: User[] = []
  rankingList: Ranking[] = []
  scoreCriteriaColums: ScoreCriteria[] = []

  constructor(
    private userService: UserService,
    private userServiceMock: UserServiceMock,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getRankingList()
  }

  /**
   * Get the ranking list from the API
   */
  getRankingList() {
    this.userServiceMock.getDriverRanking().subscribe({
      next: (data: any) => {
        data.ranking.forEach((ranking: any) => {
          const user: User = {
            id: ranking.user.id,
            firstname: ranking.user.firstname,
            lastname: ranking.user.lastname,
            profile_picture: ranking.user.profile_picture,
          }
          this.lisUsers.push(user);

          const scoreCriteriaList: ScoreCriteria[] = ranking.scoreCriteria.map((criteria: any) =>
            new ScoreCriteria(criteria.id, criteria.name, criteria.value)
          )
          this.scoreCriteriaColums = scoreCriteriaList

          const rankingModel: Ranking = {
            user: user,
            average: ranking.average
          }

          scoreCriteriaList.forEach((columnLabel: ScoreCriteria) => {
            rankingModel[columnLabel.name] = columnLabel.value
          });

          this.rankingList.push(rankingModel);

          this.toastr.success('Le classement a été récupéré avec succès.', 'Succès ✅📄')
          this.rankingList = [...this.rankingList] // refresh the table
          this.loading = false
        })
      },
      error: (error: any) => {
        this.toastr.error('La récupération du classement a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
    })
  }

  getCriterionRating(scoreCriteria: any[], criterionName: string): number {
    const criterion = scoreCriteria.find(criteria => criteria.name === criterionName);
    return criterion ? criterion.notes : 0; // Ou une valeur par défaut si nécessaire
  }
}
