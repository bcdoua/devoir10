import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Accessoire } from '../model/accessoire.model';
import { AccessoireService } from '../service/accessoire';
import { Couleur } from '../model/couleur.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-accessoire',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-accessoire.html'
})
export class AddAccessoireComponent implements OnInit {
  myForm!: FormGroup;
  Couleurs: Couleur[] = [];

  constructor(
    private accessoireService: AccessoireService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Charger les collections existantes depuis le service
    this.Couleurs = this.accessoireService.listecouleurs();
    // Initialiser le formulaire réactif
    this.myForm = this.formBuilder.group({
      idaccessoire: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nomaccessoire: ['', [Validators.required, Validators.minLength(3)]],
      prixaccessoire: [0, [Validators.required, Validators.min(1)]],
      dateCreation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idCoul: ['', Validators.required],
    });
  }

  addaccessoire(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formValues = this.myForm.value;

    // Vérifier si l'ID existe déjà
    const existingIds = this.accessoireService.listeaccessoires().map(a => a.idaccessoire);
    if (existingIds.includes(Number(formValues.idaccessoire))) {
      alert("Cet ID existe déjà ! Veuillez en choisir un autre.");
      return;
    }
     // Créer l'accessoire à ajouter
    const accessoireToAdd: Accessoire = {
      idaccessoire: Number(formValues.idaccessoire),
      nomaccessoire: formValues.nomaccessoire,
      prixaccessoire: Number(formValues.prixaccessoire),
      dateCreation: new Date(formValues.dateCreation),
      email: formValues.email,
      couleur: this.accessoireService.consultercouleur(Number(formValues.idCoul))
    };

     // Ajouter l'accessoire via le service
    this.accessoireService.ajouteraccessoire(accessoireToAdd);

    this.router.navigate(['accessoire']);
  }
}