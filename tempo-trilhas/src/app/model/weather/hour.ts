import { Weather } from './weather';

export class Hour {
    public clouds: number;
    public dew_point: number;
    public dt: number;
    public feels_like: number;
    public humidity: number;
    public pop: number;
    public pressure: number;
    public temp: number;
    public visibility: number;
    public weather: Array<Weather>;
    public wind_speed: number;
}