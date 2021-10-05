import { Achats } from "../Achatss/Achats";

export class Affaire {

    numAff: bigint;
    datAff: Date;
    codFrs: bigint;
    raison: string;
    datProf: Date;
    datConf: Date;
    datTransf: Date;
    proven: string;


    numProf: string;
    transfer: string;
    proforma: string;
    confirmer: string;
    datAnal: Date;
    numFac: string;
    montDev: bigint;
    montDt: bigint;
    montRev: bigint;

    delaiLiv: number;
    datFac: Date;
    montTrsp: bigint;
    montEmbl: bigint;
    montAff: bigint;
    totalAff: bigint;
    devise: string;
    listDem: string;
    coef: bigint;
    achats:Achats;
    etat_affaire: string;
}