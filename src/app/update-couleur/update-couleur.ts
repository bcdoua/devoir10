import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Couleur } from '../model/couleur.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-couleur',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-couleur.html',
  styles: ``
})
export class UpdateCouleurComponent implements OnInit {

  @Input()
  couleur: Couleur = { idCoul: 0, nomCoul: '' };

  @Output() 
  couleurUpdated = new EventEmitter<Couleur>(); // Mise à jour temps réel

  @Output()
  couleurSaved = new EventEmitter<Couleur>(); // Sauvegarde finale

  @Input()
  ajout!: boolean;

  @Input()
  errorMessage: string = '';

  private updateTimeout: any;

  onInputChange() {
    if (!this.ajout && this.couleur.idCoul !== 0) {
      // Clear previous timeout
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }
      
      // Emit after a short delay (500ms)
      this.updateTimeout = setTimeout(() => {
        this.couleurUpdated.emit({...this.couleur});
      }, 500);
    }
  }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCouleur ", this.couleur);
  }
saveCouleur() {
  if (this.ajout) {
    const couleurToAdd: Couleur = {
      idCoul: 0, 
      nomCoul: this.couleur.nomCoul
    };
    this.couleurSaved.emit(couleurToAdd);
  } else {
    this.couleurSaved.emit(this.couleur);
  }
}
  cancelUpdate() {
    this.couleurSaved.emit({ idCoul: 0, nomCoul: '' });
  }
  clearError() {
    this.errorMessage = '';
  }

  ngOnDestroy() {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
  }
}