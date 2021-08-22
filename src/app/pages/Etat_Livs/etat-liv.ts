import { Bon_liv } from "../Bon_Livs/bon-liv";

export class Etat_liv {

    id: bigint;
    region: string;
    date: Date;   
    confirmation: string; 
    bonLiv: Bon_liv;
    }