import { Component, OnInit, ViewChild } from '@angular/core';
import * as faIcon from '@fortawesome/free-solid-svg-icons';
import { PoAccordionItemComponent, PoLoadingComponent, PoLoadingOverlayComponent } from '@po-ui/ng-components';
import { AllInOne } from './model/weather/allInOne';
import { Day } from './model/weather/day';
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
  public faIcon = faIcon;
  wutils = WeatherUtils;
  utils = Utils;
  title = 'tempo-trilhas';

  public columns = [
    { property: 'name', label: 'Propriedade', align: 'right', readonly: true, freeze: true, width: 120 },
    { property: 'value', label: 'Valor', width: '200px', required: true },
  ];
  public showOverlay = false;

  public locais = [
        { title: 'Botucatu/SP - Cachoeiras Pavuna', img: '../assets/img/pavuna.jpg', latitude: '-22.8408491', longitude: '-48.5126424', predict: null, dataRow: [], lastSearch: null, day: 0 },
        { title: 'Bofete/SP - Sitio Três Pedras', img: '../assets/img/tres-pedras.jpg', latitude: '-23.0170796', longitude: '-48.3165639', predict: null, dataRow: [], lastSearch: null, day: 0 },
        { title: 'Sapopema/PR - Pico do Agudo', img: '../assets/img/pico-do-agudo.jpg', latitude: '-23.8995314', longitude: '-50.779742', predict: null, dataRow: [], lastSearch: null, day: 0 },
        { title: 'Sapopema/PR - Cachoeira das Esmeraldas', img: '../assets/img/cachoeira-das-esmeraldas.jpg', latitude: '-23.9095996', longitude: '-50.6946692', predict: null, dataRow: [], lastSearch: null, day: 0 }
  ];

  constructor(public weatherService: WeatherService) { }

  public ngOnInit() {}

  public addDataGrid(reference, data: AllInOne) {
    reference.push({ name: 'Data', value: this.utils.convertUnixToOnlyDate(data.current.dt) });
    reference.push({ name: 'Clima', value: this.wutils.getWeatherPTBR(data.current.weather[0].id).title });
    reference.push({ name: 'Descrição', value: this.wutils.getWeatherPTBR(data.current.weather[0].id).description });
    reference.push({ name: 'Temperatura', value: data.current.temp.toFixed(0) + 'º' });
    reference.push({ name: 'Nuvens', value: data.current.clouds + ' %' });
    reference.push({ name: 'Umidade', value: data.current.humidity + ' %' });
    reference.push({ name: 'Pressão', value: data.current.pressure + ' pHa' });
    reference.push({ name: 'Vento', value: (data.current.wind_speed * 3.6).toFixed(0) + ' Km/h' });
    reference.push({ name: 'UVI', value: data.current.uvi });
    reference.push({ name: 'PdP próx/ 3h', value: this.wutils.getPop(data.hourly) + ' %' });
  }

  public addDataGridDay(reference, day: Day) {
    reference.push({ name: 'Data', value: this.utils.convertUnixToOnlyDate(day.dt) });
    reference.push({ name: 'Clima', value: this.wutils.getWeatherPTBR(day.weather[0].id).title });
    reference.push({ name: 'Descrição', value: this.wutils.getWeatherPTBR(day.weather[0].id).description });
    reference.push({ name: 'Temperatura', value: day.temp.day.toFixed(0) + 'º' });
    reference.push({ name: 'Nuvens', value: day.clouds + ' %' });
    reference.push({ name: 'Umidade', value: day.humidity + ' %' });
    reference.push({ name: 'Pressão', value: day.pressure + ' pHa' });
    reference.push({ name: 'Vento', value: (day.wind_speed * 3.6).toFixed(0) + ' Km/h' });
    reference.push({ name: 'UVI', value: day.uvi });
    reference.push({ name: 'PdP', value: day.pop + ' %' });
  }

  public buscar(local) {
    this.showOverlay = true;
    this.weatherService.getWeatherByLatLon(local.latitude, local.longitude).subscribe(data => {
      local.predict = data;
      local.dataRows = [];

      local.lastSearch = Utils.convertUnixToDate(Date.now());

      this.addDataGrid(local.dataRows, local.predict);
      this.showOverlay = false;
    });
  }

  public nextDay(local) {
    this.showOverlay = true;
    local.dataRows = [];
    local.day += 1;

    this.addDataGridDay(local.dataRows, local.predict.daily[local.day]);
    this.showOverlay = false;
  }

  public previousDay(local) {
    this.showOverlay = true;
    local.dataRows = [];
    local.day -= 1;

    if(local.day == 0) {
      this.addDataGrid(local.dataRows, local.predict);
    } else {
      this.addDataGridDay(local.dataRows, local.predict.daily[local.day]);
    }

    this.showOverlay = false;
  }
}
