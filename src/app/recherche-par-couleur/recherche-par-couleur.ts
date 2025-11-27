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
  styles: ``
})
export class RechercheParCouleurComponent implements OnInit {
  accessoires: Accessoire[] = [];
  Idcouleur!: number;
  couleurs: Couleur[] = [];

  constructor(
    private accessoireService: AccessoireService,
    public authService: Auth
  ) { }

  ngOnInit(): void {
    this.chargerCouleurs();
    this.accessoires = [];
  }

  chargerCouleurs() {
    this.accessoireService.listeCouleur().subscribe({
      next: (couls) => {
        this.couleurs = couls._embedded?.couleurs || [];
        console.log('Couleurs chargées:', this.couleurs);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des couleurs:', err);
        this.couleurs = [];
      }
    });
  }

  supprimeraccessoire(acc: Accessoire) {
    const index = this.accessoires.indexOf(acc, 0);
    if (index > -1) {
      this.accessoires.splice(index, 1);
    }
  }

  onChange() {
    console.log('Recherche pour couleur ID:', this.Idcouleur);
    
    if (this.Idcouleur) {
      const id = Number(this.Idcouleur);
      this.accessoireService.rechercherParCouleur(id).subscribe({
        next: (accessoires) => {
          this.accessoires = accessoires;
          console.log('Accessoires filtrés:', this.accessoires);
        },
        error: (err) => {
          console.error('Erreur lors de la recherche par couleur:', err);
          this.accessoires = [];
        }
      });
    } else {
      this.accessoires = [];
    }
  }
}