import { ColorEnum } from './../enums/colorEnum';
import { RaceEnum } from './../enums/raceEnum';
import { GenderEnum } from "../enums/genderEnum";

export interface GeneralInfo {
    name: string;
    dateOfBirth: Date;
    gender: GenderEnum;
    owner?: string;
    breed?: RaceEnum;
    color?: ColorEnum;
    microchip: string;
    loiJr: string; 
}
