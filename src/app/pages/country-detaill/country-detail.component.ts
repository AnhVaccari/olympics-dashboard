import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent implements OnInit {
  countryDetail$!: Observable<any>;
  lineData$!: Observable<any[]>;

  legend = false;
  showLabels = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'YEAR';
  yAxisLabel = 'Number of medals';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    const countryId = +this.route.snapshot.params['id'];

    if (!countryId) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.countryDetail$ = this.olympicService.getCountryDetailById(countryId);

    this.lineData$ = this.countryDetail$.pipe(
      map((detail) =>
        detail
          ? [
              {
                name: detail.country,
                series: detail.medalsPerYear.map((medal: any) => ({
                  name: medal.year.toString(),
                  value: medal.medals,
                })),
              },
            ]
          : []
      )
    );
  }
}
