import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    const countryId = +this.route.snapshot.params['id'];

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

  // ANCIEN CODE

  // countryId!: number;
  // countryDetail?: OlympicCountry;

  // lineData: {
  //   name: string;
  //   series: {
  //     name: string;
  //     value: number;
  //   }[];
  // }[] = [];

  // countryName = '';
  // numberOfEntries = 0;
  // totalMedals = 0;
  // totalAthletes = 0;

  // ngOnInit(): void {
  //   this.countryId = +this.route.snapshot.params['id'];

  //   this.olympicService
  //     .loadInitialData()
  //     .pipe(switchMap(() => this.olympicService.getCountryDetailById()))
  //     .subscribe((details) => {
  //       const detail = details.find((country) => country.id === this.countryId);

  //       if (detail) {
  //         this.lineData = [
  //           {
  //             name: detail.country,
  //             series: detail.medalsPerYear.map(
  //               (medal: { year: { toString: any }; medals: any }) => ({
  //                 name: medal.year.toString(),
  //                 value: medal.medals,
  //               })
  //             ),
  //           },
  //         ];

  //         this.countryName = detail.country;
  //         this.numberOfEntries = detail.numberOfParticipations;
  //         this.totalMedals = detail.totalMedals;
  //         this.totalAthletes = detail.totalAthletes;
  //       }
  //     });
  // }
}
