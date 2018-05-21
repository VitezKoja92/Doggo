import { BreedEnum } from './../enums/breedEnum';
import { ColorEnum } from './../enums/colorEnum';
import { GenderEnum } from "../enums/genderEnum";

export interface GeneralInfo {
    name: string;
    dateOfBirth: Date;
    gender: GenderEnum;
    owner?: string;
    breed?: BreedEnum;
    color?: ColorEnum;
    microchip: string;
    loiJr: string; 
}
