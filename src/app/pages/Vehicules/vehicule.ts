import { Time } from "@angular/common";
import { Marque } from "../Marques/marque";
import { Model } from "../Model/model";

export class Vehicule {

    matricule: string;
    matAgent: bigint;
    marque: Marque;
    model: Model;
    couleur: string;
    dt1Mc: Date;
    dtAcq: Date;
    pattc: number;
    ess: string;
    dtFAss: Date;
    dtFVisit: Date;
    kmCour: number;
    drKmVida: number;
    drKmCh: number;
    observation: String;
    tonnage: number;
    dt1Mc2: Date;

    }