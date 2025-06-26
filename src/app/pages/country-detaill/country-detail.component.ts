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
  xAxisLabel: string = 'Dates';
  //yAxisLabel: string = 'Population';
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
      name: 'Montenegro',
      series: [
        {
          value: 6668,
          name: '2016-09-16T18:25:16.128Z',
        },
        {
          value: 5969,
          name: '2016-09-19T12:06:10.528Z',
        },
        {
          value: 5304,
          name: '2016-09-17T14:44:42.599Z',
        },
        {
          value: 3100,
          name: '2016-09-21T17:14:24.384Z',
        },
        {
          value: 6585,
          name: '2016-09-22T16:57:30.687Z',
        },
      ],
    },
    {
      name: 'Libya',
      series: [
        {
          value: 4111,
          name: '2016-09-16T18:25:16.128Z',
        },
        {
          value: 2174,
          name: '2016-09-19T12:06:10.528Z',
        },
        {
          value: 2180,
          name: '2016-09-17T14:44:42.599Z',
        },
        {
          value: 2531,
          name: '2016-09-21T17:14:24.384Z',
        },
        {
          value: 6688,
          name: '2016-09-22T16:57:30.687Z',
        },
      ],
    },
    {
      name: 'San Marino',
      series: [
        {
          value: 5448,
          name: '2016-09-16T18:25:16.128Z',
        },
        {
          value: 6095,
          name: '2016-09-19T12:06:10.528Z',
        },
        {
          value: 4945,
          name: '2016-09-17T14:44:42.599Z',
        },
        {
          value: 2871,
          name: '2016-09-21T17:14:24.384Z',
        },
        {
          value: 5040,
          name: '2016-09-22T16:57:30.687Z',
        },
      ],
    },
    {
      name: 'Samoa',
      series: [
        {
          value: 2013,
          name: '2016-09-16T18:25:16.128Z',
        },
        {
          value: 6906,
          name: '2016-09-19T12:06:10.528Z',
        },
        {
          value: 6696,
          name: '2016-09-17T14:44:42.599Z',
        },
        {
          value: 2847,
          name: '2016-09-21T17:14:24.384Z',
        },
        {
          value: 2931,
          name: '2016-09-22T16:57:30.687Z',
        },
      ],
    },
    {
      name: 'Sri Lanka',
      series: [
        {
          value: 3971,
          name: '2016-09-16T18:25:16.128Z',
        },
        {
          value: 6181,
          name: '2016-09-19T12:06:10.528Z',
        },
        {
          value: 2070,
          name: '2016-09-17T14:44:42.599Z',
        },
        {
          value: 3956,
          name: '2016-09-21T17:14:24.384Z',
        },
        {
          value: 4958,
          name: '2016-09-22T16:57:30.687Z',
        },
      ],
    },
  ];
}
