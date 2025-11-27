import { Injectable } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { Couleur } from '../model/couleur.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CouleurWrapper } from '../model/CouleurWrapped.model';
import { Auth } from './auth';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root',
})
export class AccessoireService {
  accessoires!: Accessoire[]; //un tableau de accessoire
  accessoire!: Accessoire;
  couleurs!: Couleur[];

  apiURL: string = 'http://localhost:8080/accessoires/api';
  apiURLCoul: string = 'http://localhost:8080/accessoires/coul';

  constructor(private http: HttpClient,
              private authService : Auth) {}

  listeaccessoires(): Observable<Accessoire[]> {
   /*  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) */
    return this.http.get<Accessoire[]>(this.apiURL+"/all");
  }

  ajouteraccessoire(acc: Accessoire): Observable<Accessoire> {
    /* let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) */
    return this.http.post<Accessoire>(this.apiURL+"/addacc", acc, httpOptions);
  }

  supprimeraccessoire(id: number) {
    const url = `${this.apiURL}/delacc/${id}`;
    /* let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) */
    return this.http.delete(url, httpOptions);
  }

  consulteraccessoire(id: number): Observable<Accessoire> {
    const url = `${this.apiURL}/${id}`;
    /* console.log(url);
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) */
    return this.http.get<Accessoire>(url);
  }

  updateaccessoire(a: Accessoire): Observable<Accessoire> {
    /* console.log(a.couleur);
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) */
    return this.http.put<Accessoire>(this.apiURL+"/updateacc", a, httpOptions);
  }

  listeCouleur(): Observable<CouleurWrapper> {
    /* let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) */
    return this.http.get<CouleurWrapper>(this.apiURLCoul);
  }

  consulterCouleur(id: number): Couleur {
    return this.couleurs.find((coul) => coul.idCoul == id)!;
  }

  rechercherParCouleur(idCoul: number): Observable<Accessoire[]> {
    const url = `${this.apiURL}/acccoul/${idCoul}`;
    return this.http.get<Accessoire[]>(url);
  }

  rechercherParNom(nom: string): Observable<Accessoire[]> {
    const url = `${this.apiURL}/accsByName/${nom}`;
    return this.http.get<Accessoire[]>(url);
  }

  ajouterCouleur(coul: Couleur): Observable<Couleur> {
    return this.http.post<Couleur>(this.apiURLCoul, coul, httpOptions);
  }

  updateCouleur(coul: Couleur): Observable<Couleur> {
    return this.http.post<Couleur>(this.apiURLCoul, coul, httpOptions);
  }
}