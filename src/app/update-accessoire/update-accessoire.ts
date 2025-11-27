import { Component, OnInit } from '@angular/core';
import { AccessoireService } from '../service/accessoire';
import { ActivatedRoute, Router } from '@angular/router';
import { Accessoire } from '../model/accessoire.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Couleur } from '../model/couleur.model';

@Component({
  selector: 'app-update-accessoire',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-accessoire.html',
  styles: ``
})
export class Updateaccessoire implements OnInit {
  currentaccessoire: any = {};
  couleurs: any[] = [];
  updatedCoulId: number = 0;

  constructor(
    private accessoireService: AccessoireService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    
    this.accessoireService.listeCouleur().subscribe(couls => {
      this.couleurs = couls._embedded?.couleurs || [];
    });

    this.accessoireService.consulteraccessoire(id).subscribe(acc => {
      this.currentaccessoire = acc;
      this.updatedCoulId = acc.couleur?.idCoul || 0;
    });
  }

  updateaccessoire() {
    const selectedCouleur = this.couleurs.find(coul => coul.idCoul == this.updatedCoulId);
    if (selectedCouleur) {
      this.currentaccessoire.couleur = selectedCouleur;
    }

    this.accessoireService.updateaccessoire(this.currentaccessoire).subscribe(() => {
      this.router.navigate(['accessoires']);
    });
  }
}