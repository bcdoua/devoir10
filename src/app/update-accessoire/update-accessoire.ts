import { Component, OnInit } from '@angular/core';
import { AccessoireService } from '../service/accessoire';
import { ActivatedRoute, Router } from '@angular/router';
import { Accessoire } from '../model/accessoire.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Couleur } from '../model/couleur.model';

@Component({
  selector: 'app-update-accessoire',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-accessoire.html',
  styles: ``
})
export class Updateaccessoire implements OnInit {
  currentaccessoire!: Accessoire;
  couleurs!: Couleur[];
  updatedCoulId!: number;

  constructor(
    private accessoireService: AccessoireService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.couleurs = this.accessoireService.listecouleurs();
    this.currentaccessoire = this.accessoireService.consulteraccessoire(
      this.activatedRoute.snapshot.params['id']
    );
    this.updatedCoulId = this.currentaccessoire.couleur.idCoul;
  }

  updateaccessoire(): void {
    this.currentaccessoire.couleur = this.accessoireService.consultercouleur(this.updatedCoulId);
    this.accessoireService.updateaccessoire(this.currentaccessoire);
    this.router.navigate(['accessoire']);
  }
}
