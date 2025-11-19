import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { AccessoireService } from '../service/accessoire';
import { RouterLink } from '@angular/router';
import { Auth } from '../service/auth';

@Component({
  selector: 'app-Accessoires',
  imports: [CommonModule,RouterLink],
  templateUrl:'./accessoire.html',
})
export class AccessoiresComponent implements OnInit { 
  Accessoires : Accessoire []=[]; 
  constructor(private AccessoireService: AccessoireService , public authService:Auth)
   { this.Accessoires = AccessoireService.listeaccessoires(); }
  ngOnInit(): void{
  
  }
  supprimeraccessoire(accessoire : Accessoire) : void{
  this.AccessoireService.supprimeraccessoire(accessoire);
 }
}