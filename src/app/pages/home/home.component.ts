import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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

  pieData: {
    name: string;
    value: number;
    extra?: { id: number };
  }[] = [];
  view: [number, number] = [700, 400];
  showLabels = true;
  isDoughnut = false;

  numberOfCountries = 0;
  numberOfJOs = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe(() => {
      this.olympicService.getOlympics().subscribe((olympics) => {
        if (olympics) {
          this.numberOfCountries = olympics.length;

          this.numberOfJOs = olympics.reduce(
            (total, country) => total + country.participations.length,
            0
          );

          this.pieData = olympics.map((country) => {
            const totalMedals = country.participations.reduce(
              (sum, participation) => sum + participation.medalsCount,
              0
            );

            return {
              name: country.country,
              value: totalMedals,
              extra: { id: country.id },
            };
          });

          this.olympics$ = of(olympics);
        }
      });
    });
  }

  onSelectCountry(event: any) {
    const countryId = event.extra?.id;
    if (countryId) {
      this.router.navigateByUrl(`country/${countryId}`);
    }
  }
}
