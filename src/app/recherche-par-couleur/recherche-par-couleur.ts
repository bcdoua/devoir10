import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accessoire } from '../model/accessoire.model';
import { AccessoireService } from '../service/accessoire'; 
import { RouterModule } from '@angular/router';
import { Couleur } from '../model/couleur.model';
import { Auth } from '../service/auth';  

@Component({
  selector: 'app-recherche-par-couleur',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recherche-par-couleur.html',
  styleUrls: ['./recherche-par-couleur.css']
})
export class RechercheParcouleurComponent implements OnInit {
  accessoires!: Accessoire[];
  Idcouleur!: number;
  couleurs: Couleur[] = [];

  constructor(
    private accessoireService: AccessoireService,
    public authService: Auth  // Injection du service Auth
  ) { }

  ngOnInit(): void {
    this.couleurs = this.accessoireService.listecouleurs();
    this.accessoires = [];
  }

  supprimeraccessoire(acc: Accessoire) {
    const index = this.accessoires.indexOf(acc, 0);
    if (index > -1) {
      this.accessoires.splice(index, 1);
    }
  }

  onChange() {
    // Convertir Idcouleur en nombre pour correspondre au type des accessoires
    const id = Number(this.Idcouleur);
   this.accessoires = this.accessoireService.rechercherParcouleur(id);
  }
}