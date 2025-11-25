import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Couleur } from '../model/couleur.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-couleur',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-couleur.html',
  styles: ``
})
export class UpdateCouleurComponent implements OnInit {

  @Input()
  couleur!: Couleur;

  @Output() 
  couleurUpdated = new EventEmitter<Couleur>(); 

  @Input()
  ajout!: boolean;

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCouleur ", this.couleur);
  }

  saveCouleur(){
    this.couleurUpdated.emit(this.couleur); 
  }
}