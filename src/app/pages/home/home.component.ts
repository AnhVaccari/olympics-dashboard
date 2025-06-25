import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  pieData: { name: string; value: number }[] = [];
  view: [number, number] = [700, 400];
  showLabels = true;
  isDoughnut = false;

  numberOfCountries = 0;
  numberOfJOs = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe(() => {
      this.olympicService.getOlympics().subscribe((olympics) => {
        if (olympics) {
          this.numberOfCountries = olympics.length;

          this.numberOfJOs = olympics.reduce(
            (total, country) => total + country.participations.length,
            0
          );

          this.pieData = olympics.map((country) => ({
            name: country.country,
            value: country.participations.reduce(
              (sum, p) => sum + p.medalsCount,
              0
            ),
          }));

          this.olympics$ = of(olympics); // utile si tu veux continuer à afficher avec | async dans le template
        }
      });
    });
  }
}

// view: [number, number] = [700, 400];

// pieData = [
//   {
//     name: 'USA',
//     value: 120,
//   },
//   {
//     name: 'China',
//     value: 100,
//   },
//   {
//     name: 'Germany',
//     value: 80,
//   },
//   {
//     name: 'France',
//     value: 60,
//   },
// ];

// showLabels = true;
// isDoughnut = false;
