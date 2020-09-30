import { Day } from './day';
import { Hour } from './hour';
import { Predict } from './predict';

export class AllInOne {
    public lat: number;
    public lon: number;
    public timezone: string;
    public timezone_offset: number;
    public current: Predict;
    public hourly: Array<Hour>;
    public daily: Array<Day>;
}