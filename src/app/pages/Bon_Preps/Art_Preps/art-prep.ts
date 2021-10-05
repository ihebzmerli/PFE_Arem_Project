import { Chariot } from "../../Chariots/chariot";
import { Utilisateur } from "../../Utilisateurs/utilisateur";

export class Art_Prep {

    id:bigint;
    numBon:string;
    codArt:string;
    qutLiv:number;
    typArt:string;
    remise:number;
    prixHt:number;
    prixArem: number;
    tva:number;
    totHt:number;
    marge:number;
    cumulRet:number;
    prixAch:number;
    qutPrep:number;
    nonTrouve:number;
    qutValider:number;
    datPrep:Date;
    remExp:number;
    etage2:string;
    numCas:string;
    chrono:Date;

    prep:number;
    prepara:Utilisateur;
    avPrep:string;
    qutPoint:number;
    poste:string;
    centre:string;
    artprep_chariot:Chariot;
    poitageChariot:Date;

    qutStk:number;
    qutStk2:number;
    stkGar:number;
    stkIni:number;
    analStk:number;
    nbjStk:number;
    vSstk:number;
    comStk:number;
    xanalStk:number;
    stkAtrsf:number;
    stkTrsf:number;
    stkReel:number;
    stkRes:number;
    stkNp:number;
}