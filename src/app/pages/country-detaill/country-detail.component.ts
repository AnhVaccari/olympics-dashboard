import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent implements OnInit {
  countryId!: number;
  countryData?: OlympicCountry;
  view: [number, number] = [700, 300];
  // options
  legend = false;
  showLabels = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Années';
  yAxisLabel = 'Nombre de Médailles';
  //timeline = true;

  constructor(
    private route: ActivatedRoute,
    private olympicServive: OlympicService
  ) {}

  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];

    this.olympicServive.getOlympics().subscribe((countries) => {
      if (countries) {
        this.countryData = countries.find(
          (country) => country.id === this.countryId
        );
      }
    });
  }

  lineData = [
    {
      name: 'San Marino',
      series: [
        {
          value: 10,
          name: '2016',
        },
        {
          value: 5,
          name: '2019',
        },
        {
          value: 28,
          name: '2022',
        },
        {
          value: 9,
          name: '2025',
        },
      ],
    },
  ];
}
