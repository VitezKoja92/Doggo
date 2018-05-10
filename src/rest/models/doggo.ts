import { GeneralInfo } from './generalInfo';
import { DoggoDocuments } from './documents';
import { DoggoExhibition } from './exhibition';
import { SanitaryData } from './sanitaryData';

export interface Doggo {
    id: string;
    generalInfo: GeneralInfo;
    documents?: DoggoDocuments;
    exhibitions?: DoggoExhibition[];
    sanitaryData?: SanitaryData;
}
