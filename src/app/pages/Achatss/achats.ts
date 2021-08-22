import { Utilisateur } from "../Utilisateurs/utilisateur";

export class Achats {

    numDocAchat: bigint;
    typDoc: string;
    date: Date;
    codFrs: bigint;
    codUtilisateur: bigint;
    montant: bigint;
    montHt: bigint;
    tva: bigint;
    solde: bigint;
    numCom: bigint;
    typReg: string;
    montReg: bigint;
    docReg: string;
    pret: string;
    validation: string;
    user:Utilisateur;
    
}