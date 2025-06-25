import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }

  view: [number, number] = [700, 400];

  pieData = [
    {
      name: 'USA',
      value: 120,
    },
    {
      name: 'China',
      value: 100,
    },
    {
      name: 'Germany',
      value: 80,
    },
    {
      name: 'France',
      value: 60,
    },
  ];

  showLabels = true;
  isDoughnut = false;
}
