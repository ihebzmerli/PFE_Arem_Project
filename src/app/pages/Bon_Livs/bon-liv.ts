import { Fournis } from "../Fourniss/fournis";
import { Livreur } from "../Livreurs/livreur";
import { Utilisateur } from "../Utilisateurs/utilisateur";

export class Bon_liv {

    numBon: string;
    datBon: Date;
    nomprenomCli: string;
    adresseCli: string;
    numBonFrs:string;    
    raison: string;
    brutHt: number;
    tauxRem: number;
    montRem: number;
    netHt: number;
    montTva: number;
    totTtc: number;
    numFac: bigint;
    xbase0: number;
    xbase6: number;
    xbase10: number;
    xbase17: number;
    xbase29: number;
    xbase7: number;
    xbase12: number;
    xbase21: number;
    xbase36: number;
    xtva6: number;
    xtva10: number;
    xtva17: number;
    xtva29: number;
    xtva7: number;
    xtva12: number;
    xtva21: number;
    xtva36: number;
    plusV: number;
    tauxRes: number;
    montTrs: number;
    liv: string;
    command: string;
    pointage: string;
    montIrpp: number;
    poste: string;
    centre: string;
    xbase19: number;
    xtva19: number;
    xbase13: number;
    xtva13: number;
    xbase7A: number;
    xtva7A: number;
    codeTva: string;

    trans_action: string;

    expide: bigint;
    fournis: Fournis;
    user: Utilisateur;
    numCom: bigint;
    livreur:Livreur;
}