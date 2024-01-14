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

  selectedRanking: any //change any to Ranking
  loading: boolean = true
  lisUsers: User[] = []
  // value: number = 0
  ratingsColumns: Label[] = []
  rankingList: Ranking[] = []

  columnLabels: ColumnLabel[] = []
  scoreCriteriaColums: ScoreCriteria[] = []
  rankingInterface: Ranking[] = []

  constructor(
    private userService: UserService,
    private userServiceMock: UserServiceMock,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    this.userServiceMock.getDriverRanking().subscribe({
      next: (data: any) => {
        data.ranking.forEach((ranking: any) => {
          const user: User = {
            id: ranking.user.id,
            firstname: ranking.user.firstname,
            lastname: ranking.user.lastname,
          }

          this.lisUsers.push(user);
          const scoreCriteriaList: ScoreCriteria[] = ranking.scoreCriteria.map((criteria: any) =>
            new ScoreCriteria(criteria.id, criteria.name, criteria.value)
          )

          this.scoreCriteriaColums = scoreCriteriaList

          console.log('scoreCriteriaColums:', this.scoreCriteriaColums)

          const rankingModel: Ranking = { 
            user: user, 
            average: ranking.average 
          }

          scoreCriteriaList.forEach((columnLabel: ScoreCriteria) => {
            rankingModel[columnLabel.name] = columnLabel.value
          });

          this.rankingList.push(rankingModel);

          console.log('this.rankingList:', this.rankingList)

          this.loading = false
          this.toastr.success('Le classement a été récupéré avec succès.', 'Succès ✅📄');
          this.rankingList = [...this.rankingList]; // refresh the table


        })
      },
      error: (error: any) => {
        this.toastr.error('La récupération du classement a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
    })


    this.userService.getActifCriterias(2).subscribe({
      next: (data: any) => {
        data.criterion.forEach((criteria: any) => {
          const label: Label = {
            id_criteria: criteria.id,
            name: criteria.name,
            description: criteria.description,
            notes: 0
          }
          this.ratingsColumns.push(label);
        });
        //console.log('ratingsColumns:', this.ratingsColumns)

      },
      error: (error: any) => {
        this.toastr.error('La récupération des critères a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
    })
  }

  getCriterionRating(scoreCriteria: any[], criterionName: string): number {
    const criterion = scoreCriteria.find(criteria => criteria.name === criterionName);
    return criterion ? criterion.notes : 0; // Ou une valeur par défaut si nécessaire
  }

}
