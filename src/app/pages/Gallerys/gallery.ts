import { Article } from "../Articles/article";
import { Marque } from "../Marques/marque";
import { Utilisateur } from "../Utilisateurs/utilisateur";

export class Gallery {

    id_gallery: number;
    lastModification: Date;
    name: string;
    size: number;
    type: string;

    article: Article;
    user: Utilisateur;
    marque: Marque;
}