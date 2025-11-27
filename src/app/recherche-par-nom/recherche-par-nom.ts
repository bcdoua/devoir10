import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accessoire } from '../model/accessoire.model';
import { AccessoireService } from '../service/accessoire'; 
import { RouterLink } from "@angular/router";
import { Auth } from '../service/auth'; 

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {
  nomaccessoire!: string;
  allaccessoires: Accessoire[] = []; 
  accessoires: Accessoire[] = [];
  searchTerm!: string;
  Idcouleur!: number;

  constructor(
    private accessoireService: AccessoireService,
    public authService: Auth
  ) {}

  ngOnInit(): void {
    this.accessoireService.listeaccessoires().subscribe({
      next: (accessoires) => {
        this.allaccessoires = accessoires;
        this.accessoires = this.allaccessoires;
        console.log('Accessoires chargés:', this.accessoires);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des accessoires:', err);
      }
    });
  }
  
  supprimeraccessoire(acc: Accessoire) {
    const index = this.accessoires.indexOf(acc, 0);
    if (index > -1) {
      this.accessoires.splice(index, 1);
    }
  }
  
  onKeyUp(filterText: string) {
    this.accessoires = this.allaccessoires.filter(item =>
      item.nomaccessoire.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}