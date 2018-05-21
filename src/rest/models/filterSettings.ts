import { BreedEnum } from './../enums/breedEnum';
import { GenderEnum } from './../enums/genderEnum';
import { ColorEnum } from '../enums/colorEnum';

export interface FilterSettings {
    gender?: GenderEnum;
    breed?: BreedEnum;
    color?: ColorEnum;
    age?: {
        min?: number;
        max?: number;
    }
}
