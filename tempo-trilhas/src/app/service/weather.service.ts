import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllInOne } from '../model/weather/allInOne';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(public client: HttpClient) { }

  /*public getWeatherByCity(): Observable<Predict> {
    return this.client.get<Predict>(`${Utils.apiUrl}?q=${Utils.city}&appid=${Utils.appId}`);
  }*/

  public getWeatherByLatLon(latitude, longitude): Observable<AllInOne> {
    return this.client.get<AllInOne>(`${Utils.apiUrl}?lat=${latitude}&lon=${longitude}&appid=${Utils.appId}&units=metric`);
  }
}