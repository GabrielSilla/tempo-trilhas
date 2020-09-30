import { Weather } from './weather';

export class Predict {
    public dt: number;
    public sunrise: number;
    public sunset: number;
    public temp: number;
    public feels_like: number;
    public pressure: number;
    public humidity: number;
    public uvi: number;
    public clouds: number;
    public visibility: number;
    public wind_speed: number;
    public weather: Array<Weather>;
}