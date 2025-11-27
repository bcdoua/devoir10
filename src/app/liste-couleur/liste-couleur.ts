import { Component, OnInit } from '@angular/core';
import { Couleur } from '../model/couleur.model';
import { AccessoireService } from '../service/accessoire';
import { CommonModule } from '@angular/common';
import { UpdateCouleurComponent } from '../update-couleur/update-couleur';

@Component({
  selector: 'app-liste-couleur',
  standalone: true,
  imports: [CommonModule, UpdateCouleurComponent],
  templateUrl: './liste-couleur.html',
  styles: ``
})
export class ListeCouleursComponent implements OnInit {
  couleurs: Couleur[] = []; 
  updatedCoul: Couleur = {"idCoul": 0, "nomCoul": ""};
  ajout: boolean = true;
  errorMessage: string = '';

  constructor(private accessoireService: AccessoireService) { }

  ngOnInit(): void {
    this.chargerCouleurs();
  }

  couleurUpdated(coul: Couleur) {
    if (this.ajout) {
      return;
    } else {
      const index = this.couleurs.findIndex(c => c.idCoul === coul.idCoul);
      if (index !== -1) {
        this.couleurs[index] = { ...coul };
      }
    }
  }

  saveCouleur(coul: Couleur) {
    if (this.ajout) {
      // AJOUT
      this.accessoireService.ajouterCouleur(coul).subscribe({
        next: () => {
          this.chargerCouleurs();
          this.reinitialiserFormulaire();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de l\'ajout: ' + err.message;
        }
      });
    } else {
      // MODIFICATION
      this.accessoireService.updateCouleur(coul).subscribe({
        next: () => {
          this.chargerCouleurs();
          this.reinitialiserFormulaire();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la modification: ' + err.message;
          this.chargerCouleurs();
        }
      });
    }
  }

  chargerCouleurs() {
    this.accessoireService.listeCouleur().subscribe({
      next: (couls) => {
        this.couleurs = couls._embedded?.couleurs || []; 
      },
      error: (err) => {
        this.couleurs = []; 
      }
    });
  }

  updateCoul(coul: Couleur) {
    this.updatedCoul = {...coul};
    this.ajout = false;  
  }

  reinitialiserFormulaire() {
    this.updatedCoul = { idCoul: 0, nomCoul: '' };
    this.ajout = true;
    this.errorMessage = '';
  }
}