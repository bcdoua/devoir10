import { Injectable } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { Couleur } from '../model/couleur.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root',
})
export class AccessoireService {
  accessoires:Accessoire[]; //un tableau de accessoire
  accessoire!:Accessoire;
  couleur=new Couleur();
  couleurs: Couleur[];
  accessoiresRecherche: Accessoire[] = [];
  apiURLCol= 'http://localhost:8080/accessoires/coul';
 

  constructor(private http: HttpClient) {
   this.couleurs = [
      { idCoul: 1, nomCoul: 'Argent' },
      { idCoul: 2, nomCoul: 'Doré' },
    ]; 

    this.accessoires = [
      {
        idaccessoire: 1,
        nomaccessoire: 'Collier',
        prixaccessoire: 50,
        dateCreation: new Date('05/07/2025'),
        email: 'collier@example.com',
        couleur: { idCoul: 1, nomCoul: 'Argent' },
      },
      {
        idaccessoire: 2,
        nomaccessoire: 'Bague',
        prixaccessoire: 40,
        dateCreation: new Date('08/08/2024'),
        email: 'bague@example.com',
        couleur: { idCoul: 2, nomCoul: 'Doré' },
      },
      {
        idaccessoire: 3,
        nomaccessoire: 'Bracelet',
        prixaccessoire: 45,
        dateCreation: new Date('08/06/2025'),
        email: 'bracelet@example.com',
        couleur: { idCoul: 1, nomCoul: 'Argent' },
      },
      {
        idaccessoire: 4,
        nomaccessoire: 'Boucles d’oreilles',
        prixaccessoire: 35,
        dateCreation: new Date('12/09/2025'),
        email: 'boucles@example.com',
        couleur: { idCoul: 2, nomCoul: 'Doré' },
      },
      {
        idaccessoire: 5,
        nomaccessoire: 'Collier',
        prixaccessoire: 80,
        dateCreation: new Date('11/11/2021'),
        email: 'collier@example.com',
        couleur: { idCoul: 2, nomCoul: 'Doré' },
      },
      {
        idaccessoire: 6,
        nomaccessoire: 'Montre',
        prixaccessoire: 120,
        dateCreation: new Date('01/10/2025'),
        email: 'montre@example.com',
        couleur: { idCoul: 1, nomCoul: 'Argent' },
      },
      
    ];
  }

  listeaccessoires(): Accessoire[] {
    return this.accessoires;
  }

  ajouteraccessoire(acc: Accessoire) {
    this.accessoires.push(acc);
  }

  supprimeraccessoire(acc: Accessoire) {
    const index = this.accessoires.indexOf(acc, 0);
    if (index > -1) {
      this.accessoires.splice(index, 1);
    }
  }

  consulteraccessoire(id: number): Accessoire {
    this.accessoire = this.accessoires.find((p) => p.idaccessoire == id)!;
    return this.accessoire;
  }

  trieraccessoires() {
    this.accessoires = this.accessoires.sort((n1, n2) => {
      if (n1.idaccessoire! > n2.idaccessoire!) {
        return 1;
      }
      if (n1.idaccessoire! < n2.idaccessoire!) {
        return -1;
      }
      return 0;
    });
  }

  updateaccessoire(v: Accessoire) {
    this.supprimeraccessoire(v);
    this.ajouteraccessoire(v);
    this.trieraccessoires();
  }

  listecouleurs(): Couleur[] {
    return this.couleurs;
  }

  listeCouleur(): Observable<any> {
    return this.http.get('http://localhost:8080/couleurs'); // Adaptez l'URL
  }

  consultercouleur(id: number): Couleur {
    return this.couleurs.find((coul) => coul.idCoul == id)!;
  }

  rechercherParcouleur(idCoul: number): Accessoire[] {
   this.accessoiresRecherche=[];

    this.accessoires.forEach((cur, index)=>{
      if(idCoul==cur.couleur.idCoul){
        console.log("cur "+cur);
        this.accessoiresRecherche.push(cur);
      }
    });

    return this.accessoiresRecherche;
         
    } 
  ajoutercouleur(coul: Couleur): void {
    coul.idCoul = this.couleurs.length + 1;
    this.couleurs.push(coul);
  }
  

}
