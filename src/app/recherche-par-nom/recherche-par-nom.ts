import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accessoire } from '../model/accessoire.model';
import { AccessoireService } from '../service/accessoire'; 
import { RouterLink } from "@angular/router";
import { Auth } from '../service/auth'; 

@Component({
  selector: 'app-recherche-par-nom',
  standalone:true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-nom.html',
  styleUrls: ['./recherche-par-nom.css']
})
export class RechercheParNom implements OnInit {
  nomaccessoire!: string;
  allaccessoires!: Accessoire[];
  accessoires: Accessoire[] = [];
  searchTerm!: string;
  Idcouleur!: number;

  constructor(
    private AccessoireService: AccessoireService,
    public authService: Auth  // Injection du service Auth
  ) {} 

  ngOnInit(): void {
    this.allaccessoires = this.AccessoireService.listeaccessoires();
    this.accessoires = this.allaccessoires;
  }
  
  supprimeraccessoire(acc: Accessoire) {
    //supprimer l'accessoire acc du tableau accessoires
    const index = this.accessoires.indexOf(acc, 0);
    if (index > -1) {
      this.accessoires.splice(index, 1);
    }
    //ou Bien
    /*  this.accessoiress.forEach((cur, index) => {
          if(acc.idaccessoire === cur.idaccessoire) {
                thisaccessoires.splice(index, 1);
             }
       }); */
  }
  
  onKeyUp(filterText: string) {
    this.accessoires = this.allaccessoires.filter(item =>
      item.nomaccessoire.toLowerCase().includes(filterText)
    );
  }
}