import { AllInOne } from '../model/weather/allInOne';
import { Weather } from '../model/weather/weather';

export class Utils {
    // params - q = cidade, appId = appId
    // params - lat = latitude, lon = longitude
    public static apiUrl = 'https://api.openweathermap.org/data/2.5/onecall';
    public static appId = 'a40c7ef0e7a2d7051140a521d82d53a7';

    //CONTROL GLOBAL VARIABLES
    public static controlVisuals = { bgclass: 'clear', icon: 'sunny-outline'};
    public static allInOnePredict: AllInOne;

    public static pavuna = { latitude: '-22.8408491', longitude: '-48.5126424' }; 
    public static tres_pedras = { latitude: '-23.0170796', longitude: '-48.3165639' };
}