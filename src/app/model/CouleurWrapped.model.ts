import { Couleur } from "./couleur.model";

export class CouleurWrapper {
    _embedded!: { couleurs: Couleur[] };
}