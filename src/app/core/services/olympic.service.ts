import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[] | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<OlympicCountry[]> {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((data) => this.olympics$.next(data)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics(): Observable<OlympicCountry[]> {
    return this.olympics$.asObservable().pipe(map((data) => data || []));
  }

  getPieChartData(): Observable<
    { name: string; value: number; extra?: { id: number } }[]
  > {
    return this.getOlympics().pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.country,
          value: country.participations.reduce(
            (sum, participation) => sum + participation.medalsCount,
            0
          ),
          extra: { id: country.id },
        }))
      )
    );
  }

  getStatistics(): Observable<{
    numberOfCountries: number;
    numberOfJOs: number;
  }> {
    return this.getOlympics().pipe(
      map((countries) => ({
        numberOfCountries: countries.length,
        numberOfJOs: countries.reduce(
          (total, country) => total + country.participations.length,
          0
        ),
      }))
    );
  }

  getCountryById(id: number): Observable<OlympicCountry | undefined> {
    return this.getOlympics().pipe(
      map((countries) => countries.find((country) => country.id === id))
    );
  }

  getCountryDetailById(id: number): Observable<any> {
    return this.getCountryById(id).pipe(
      map((country) => {
        if (!country) return null;

        const totalMedals = country.participations.reduce(
          (sum, participation) => sum + participation.medalsCount,
          0
        );

        const totalAthletes = country.participations.reduce(
          (sum, participation) => sum + participation.athleteCount,
          0
        );

        return {
          id: country.id,
          country: country.country,
          years: country.participations.map(
            (participation) => participation.year
          ),
          medalsPerYear: country.participations.map((participation) => ({
            year: participation.year,
            medals: participation.medalsCount,
          })),
          totalMedals,
          totalAthletes,
          numberOfParticipations: country.participations.length,
        };
      })
    );
  }

  // getCountryDetailById(): Observable<any[]> {
  //   return this.getOlympics().pipe(
  //     map((countries) =>
  //       countries.map((country) => {
  //         const years = country.participations.map(
  //           (participation) => participation.year
  //         );

  //         const medalsPerYear = country.participations.map((participation) => ({
  //           year: participation.year,
  //           medals: participation.medalsCount,
  //         }));

  //         const totalMedals = country.participations.reduce(
  //           (sum, participation) => sum + participation.medalsCount,
  //           0
  //         );
  //         const totalAthletes = country.participations.reduce(
  //           (sum, participation) => sum + participation.athleteCount,
  //           0
  //         );

  //         return {
  //           id: country.id,
  //           country: country.country,
  //           years,
  //           medalsPerYear,
  //           totalMedals,
  //           totalAthletes,
  //           numberOfParticipations: country.participations.length,
  //         };
  //       })
  //     )
  //   );
  // }
}
