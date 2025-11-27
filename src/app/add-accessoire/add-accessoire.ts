import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccessoireService } from '../service/accessoire';

@Component({
  selector: 'app-add-accessoire',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-accessoire.html',
})
export class AddAccessoireComponent implements OnInit {

  myForm!: FormGroup;
  Couleurs: any[] = [];

  constructor(
    private accessoireService: AccessoireService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Charger les couleurs
    this.accessoireService.listeCouleur().subscribe({
      next: (couls) => {
        this.Couleurs = couls._embedded?.couleurs || [];
        console.log('Couleurs chargées:', this.Couleurs);
      }
    });
    this.myForm = this.formBuilder.group({
      nomaccessoire: ['', [Validators.required, Validators.minLength(3)]],
      prixaccessoire: ['', [Validators.required, Validators.min(1)]],
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

    // Trouver la couleur complète
    const selectedCoul = this.Couleurs.find(coul => coul.idCoul == formValues.idCoul);
    
    if (!selectedCoul) {
      alert('Couleur non trouvée!');
      return;
    }
    const data: any = {
      nomaccessoire: formValues.nomaccessoire,
      prixaccessoire: Number(formValues.prixaccessoire),
      dateCreation: formValues.dateCreation,
      email: formValues.email,
      couleur: selectedCoul
    };

    console.log('Données envoyées (sans ID):', data);

    this.accessoireService.ajouteraccessoire(data).subscribe({
      next: () => {
        this.router.navigate(['accessoires']);
      },
      error: (err) => {
        console.error('Erreur:', err);
        alert('Erreur lors de l\'ajout: ' + err.message);
      }
    });
  }
}