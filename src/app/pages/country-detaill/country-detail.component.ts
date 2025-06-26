import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent implements OnInit {
  countryId!: number;
  countryData?: OlympicCountry;

  constructor(
    private route: ActivatedRoute,
    private olympicServive: OlympicService
  ) {}

  ngOnInit(): void {
    this.countryId = this.route.snapshot.params['id'];
    this.olympicServive.getOlympics().subscribe((countries) => {
      if (countries) {
        this.countryData = countries.find(
          (country) => country.id === this.countryId
        );
      }
    });
  }
}
