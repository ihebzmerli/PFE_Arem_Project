import { Time } from "@angular/common";
import { Bon_liv } from "../../Bon_Livs/bon-liv";
import { Livreur } from "../../Livreurs/livreur";
import { Expide } from "../expide";

export class Livreur_Expide {

    id_livreur_expide: bigint;
    id_livreur: bigint;
    id_expide: bigint;
    bonLiv: Bon_liv;
    matricule: string;
    }