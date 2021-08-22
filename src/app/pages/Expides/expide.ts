import { Time } from "@angular/common";
import { Utilisateur } from "../Utilisateurs/utilisateur";

export class Expide {

    id: bigint;
    datExpedition: Date;
    typExp: string;
    transp: string;
    matAgent: number;
    matricule: string;
    typeDoc: string;
    user: Utilisateur;
    }