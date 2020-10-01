import { Temp } from './temp';
import { Weather } from './weather';

export class Day {
    public dt: number;
    public sunrise: number;
    public sunset: number;
    public temp: Temp;
    public pressure: number;
    public humidity: number;
    public wind_speed: number;
    public weather: Array<Weather>;
    public clouds: number;
    public uvi: number;
    public pop: number;
}