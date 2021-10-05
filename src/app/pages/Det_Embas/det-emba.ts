import { Bon_prep } from "../Bon_Preps/bon-prep";
import { Utilisateur } from "../Utilisateurs/utilisateur";

export class Det_emba {

    id: bigint;
    dateEmba: Date;
    typEmba: number;
    qut: number;
    bonprep_detEmbas: Bon_prep;
    user: Utilisateur;
}