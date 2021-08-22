import { Bon_prep } from "../Bon_Preps/bon-prep";
import { Chariot } from "../Chariots/chariot";
import { Utilisateur } from "../Utilisateurs/utilisateur";
import { Vehicule } from "../Vehicules/vehicule";

export class Bon_sort {

    numBon: string;
    datBon: Date;
    raison: string;
    brutHt: number;
    tauxRem: number;
    montRem: number;
    netHt: number;
    montTva: number;
    totTtc: number;
    xbase1: number;
    xbase2: number;
    xbase3: number;
    xbase4: number;
    xbase5: number;
    xtva1: number;
    xtva2: number;
    xtva3: number;
    xtva4: number;
    centre: string;
    livreur: string;
    observ: string;
    vehicule: Vehicule;
    poste: string;
    artSort: bigint;
    user: Utilisateur;
    chariot_bonsort: Chariot;
    facture_bonsort: bigint;
    bonprep_bonsort: Bon_prep;
}