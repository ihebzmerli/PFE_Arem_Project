import { Prime } from "../Primes/prime";

export class Livreur {

    id_livreur: bigint;
    nom: string;
    numrec: number;
    centre: string;
    datreclam: Date;
    datrepon: Date;
    objectif: number;
    date: Date;
    numdoc: bigint;
    obsreclam: string;
    observ: string;
    prixach: number;
    qutart: number;
    reclam: boolean;
    typmvt: string;
    nature: string;  
    prime:Prime;  
}