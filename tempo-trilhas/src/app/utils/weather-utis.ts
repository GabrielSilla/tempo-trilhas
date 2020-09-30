import { WeatherTranslated } from '../model/translated/weather-translated';
import { Hour } from '../model/weather/hour';

export class WeatherUtils {
    
    public static getPop(hourly: Array<Hour>) {
        let filteredHour = hourly.filter(hour => (hour.dt * 1000) > Date.now()).slice(0, 3);
        let pop = 0;
        filteredHour.forEach(hour => {
          hour.pop > pop ? pop = hour.pop : pop = pop;
        });
    
        return pop;
      }

    public static getWeatherPTBR(id): WeatherTranslated {
        let date = new Date(Date.now());
        let isNight = null;
        if(date) { isNight = date.getHours() >= 18 || date.getHours() < 5; }

        let weatherTranslated;

        switch(id) {
            case 200:
            case 210:
            case 230:
            case 231:
            case 232:
                weatherTranslated = new WeatherTranslated('Tempestade', 'Tempestade com chuva fraca', 'thunderstorm-outline');
                break;
            case 201:
            case 211:
                weatherTranslated = new WeatherTranslated('Tempestade', 'Tempestade com chuva moderada', 'thunderstorm-outline');
                break;
            case 202:
            case 212:
                weatherTranslated = new WeatherTranslated('Tempestade', 'Tempestade com chuva forte', 'thunderstorm-outline');
                break;
            case 300:
            case 310:
                weatherTranslated = new WeatherTranslated('Garoa', 'Garoa fraca', 'rainy-outline');
                break;
            case 301:
            case 311:
            case 313:
            case 321:
                weatherTranslated = new WeatherTranslated('Garoa', 'Garoa moderada', 'rainy-outline');
                break;
            case 302:
            case 312:
                weatherTranslated = new WeatherTranslated('Garoa', 'Garoa forte', 'rainy-outline');
                break;
            case 500:
            case 520:
                weatherTranslated = new WeatherTranslated('Chuva', 'Chuva fraca', 'rainy-outline');
                break;
            case 501:
            case 521:
            case 531:
                weatherTranslated = new WeatherTranslated('Chuva', 'Chuva moderada', 'rainy-outline');
                break;
            case 502:
            case 522:
                weatherTranslated = new WeatherTranslated('Chuva', 'Chuva forte', 'rainy-outline');
                break;
            case 503:
                weatherTranslated = new WeatherTranslated('Chuva', 'Chuva muito forte', 'rainy-outline');
                break;
            case 504:
                weatherTranslated = new WeatherTranslated('Chuva', 'Chuva extremamente forte', 'rainy-outline');
                break;
            case 800:
                weatherTranslated = new WeatherTranslated('Limpo', 'Céu limpo', isNight ? 'moon-outline' : 'sunny-outline');
                break;
            case 801:
                weatherTranslated = new WeatherTranslated('Nuvens', 'Poucas nuvens', isNight ? 'cloudy-night-outline' : 'partly-sunny-outline');
                break;
            case 802:
                weatherTranslated = new WeatherTranslated('Nuvens', 'Nuvens dispersas', isNight ? 'cloudy-night-outline' : 'partly-sunny-outline');
                break;
            case 803:
                weatherTranslated = new WeatherTranslated('Nuvens', 'Muitas nuvens', isNight ? 'cloudy-night-outline' : 'partly-sunny-outline');
                break;
            case 804:
                weatherTranslated = new WeatherTranslated('Nublado', 'Nuvens carregadas', 'cloudy-outline');
                break;
        }

        return weatherTranslated;
    }
}