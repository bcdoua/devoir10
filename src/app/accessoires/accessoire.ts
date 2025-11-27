import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { AccessoireService } from '../service/accessoire';
import { RouterLink } from '@angular/router';
import { Auth } from '../service/auth';

@Component({
  selector: 'app-accessoires',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accessoire.html',
  styles: ``
})
export class AccessoiresComponent implements OnInit {
  Accessoires: Accessoire[] = [];

  constructor(
    private accessoireService: AccessoireService,
    public authService: Auth
  ) {}

  ngOnInit(): void {
    this.accessoireService.listeaccessoires().subscribe({
      next: (accs) => {
        console.log('Accessoires chargés:', accs);
        this.Accessoires = accs;
      },
      error: (err) => {
        console.error('Erreur chargement accessoires:', err);
      }
    });
  }

  supprimeraccessoire(accessoire: Accessoire): void {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${accessoire.nomaccessoire}" ?`)) {
      return;
    }
    this.accessoireService.supprimeraccessoire(accessoire.idaccessoire).subscribe({
      next: () => {
        // Mettre à jour l'affichage après suppression
        this.Accessoires = this.Accessoires.filter(a => a.idaccessoire !== accessoire.idaccessoire);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
      }
    });
  }
}