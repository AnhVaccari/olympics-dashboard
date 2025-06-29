import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  pieData$ = this.olympicService.getPieChartData();
  statistics$ = this.olympicService.getStatistics();

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe();
  }

  onSelectCountry(event: any) {
    const countryId = event.extra?.id;
    if (countryId) {
      this.router.navigateByUrl(`country/${countryId}`);
    }
  }
}
