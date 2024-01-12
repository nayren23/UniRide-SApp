import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceMock } from '../../../core/services/user/user.service.mock';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../core/models/user.model';
import { Label } from 'src/app/core/models/label.model';
import { Ranking } from 'src/app/core/models/ranking.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  listRanking: Ranking[] = []
  selectedRanking: any //change any to Ranking
  loading: boolean = true
  lisUsers: User[] = []
  // value: number = 0
  ratingsColumns: Label[] = []

  constructor(
    private userService: UserService,
    private userServiceMock: UserServiceMock,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    this.userServiceMock.getDriverRanking().subscribe({
      next: (data: any) => {

        data.ranking.forEach((ranking: any) => {

          this.listRanking.push(ranking);
          const user: User = {
            id: ranking.user.id,
            firstname: ranking.user.firstname,
            lastname: ranking.user.lastname,
          }
          this.lisUsers.push(user);
        });

        console.log('listUsers:', this.lisUsers)
        this.loading = false
        this.toastr.success('Le classement a été récupéré avec succès.', 'Succès ✅📄');
      },
      error: (error: any) => {
        this.toastr.error('La récupération du classement a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
    })


    this.userServiceMock.getActifCriterias().subscribe({
      next: (data: any) => {
        data.criterian.forEach((criteria: any) => {
          const label: Label = {
            id_criteria: criteria.id,
            name: criteria.name,
            description: criteria.description,
            notes: 0
          }
          this.ratingsColumns.push(label);
        });
        console.log('ratingsColumns:', this.ratingsColumns)

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
