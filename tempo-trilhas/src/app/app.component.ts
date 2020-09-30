import { Component, OnInit, ViewChild } from '@angular/core';
import * as faIcon from '@fortawesome/free-solid-svg-icons';
import { PoLoadingComponent, PoLoadingOverlayComponent } from '@po-ui/ng-components';
import { AllInOne } from './model/weather/allInOne';
import { Hour } from './model/weather/hour';
import { WeatherService } from './service/weather.service';
import { Utils } from './utils/utils';
import { WeatherUtils } from './utils/weather-utis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('loading') loading: PoLoadingOverlayComponent;

  public faIcon = faIcon;
  wutils = WeatherUtils;
  title = 'tempo-trilhas';

  public columns = [
    { property: 'name', label: 'Propriedade', align: 'right', readonly: true, freeze: true, width: 120 },
    { property: 'value', label: 'Valor', width: '200px', required: true },
  ];

  public hideOverlay = true;

  public dataPavuna = [];
  public dataTresPedras = [];

  public pavunaPredict: AllInOne;
  public tresPedrasPredict: AllInOne;

  constructor(public weatherService: WeatherService) { }

  public ngOnInit() {
    this.weatherService.getWeatherByLatLon(Utils.pavuna.latitude, Utils.pavuna.longitude).subscribe(data => {
      this.pavunaPredict = data;
      this.addDataGrid(this.dataPavuna, this.pavunaPredict);

      this.weatherService.getWeatherByLatLon(Utils.tres_pedras.latitude, Utils.tres_pedras.longitude).subscribe(data => {
        this.tresPedrasPredict = data;
        this.addDataGrid(this.dataTresPedras, this.tresPedrasPredict);

        this.hideOverlay = false;
      });
    });
  }

  public addDataGrid(reference, data: AllInOne) {
    reference.push({ name: 'Clima', value: this.wutils.getWeatherPTBR(data.current.weather[0].id).title });
    reference.push({ name: 'Descrição', value: this.wutils.getWeatherPTBR(data.current.weather[0].id).description });
    reference.push({ name: 'Temperatura', value: data.current.temp.toFixed(0) + 'º' });
    reference.push({ name: 'Nuvens', value: data.current.clouds + ' %' });
    reference.push({ name: 'Umidade', value: data.current.humidity + ' %' });
    reference.push({ name: 'UVI', value: data.current.uvi });
    reference.push({ name: 'PdP próx/ 3h', value: this.wutils.getPop(data.hourly) + ' %' });
  }
}
