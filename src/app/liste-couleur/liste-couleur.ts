import { Component, OnInit } from '@angular/core';
import { Couleur } from '../model/couleur.model';
import { AccessoireService } from '../service/accessoire';
import { CommonModule } from '@angular/common';
import { UpdateCouleurComponent } from '../update-couleur/update-couleur';

@Component({
 selector: 'app-liste-couleur',
  standalone: true,
  imports: [CommonModule,UpdateCouleurComponent],
  templateUrl: './liste-couleur.html',
  styles: ``
})
export class ListeCouleursComponent implements OnInit {
  couleurs! : Couleur[];
  updatedCoul:Couleur = {"idCoul":0,"nomCoul":""};

  ajout:boolean=true;

  constructor(private accessoireService : AccessoireService) { }

  ngOnInit(): void {
     this.chargerCouleurs();
  }

  couleurUpdated(coul: Couleur) {
    if (this.ajout) {
      this.accessoireService.ajoutercouleur(coul); 
    } else {
      // Pour modification - trouver et mettre à jour
      const index = this.accessoireService.couleurs.findIndex(c => c.idCoul === coul.idCoul);
     if (index > -1) {
       this.accessoireService.couleurs[index] = coul;
    }
    }
    
    // Réinitialiser le formulaire
    this.updatedCoul = { idCoul: 0, nomCoul: '' }; 
    this.ajout = true;
  }

  chargerCouleurs() {
    this.couleurs = this.accessoireService.listecouleurs();
    console.log('Couleurs chargées:', this.couleurs);
  }

  updateCoul(coul:Couleur) {
    this.updatedCoul = coul;
    this.ajout = false;  
  }
}