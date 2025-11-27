import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AddAccessoireComponent } from './add-accessoire/add-accessoire';
import { AccessoiresComponent } from './accessoires/accessoire';
import { Updateaccessoire } from './update-accessoire/update-accessoire';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { accessoireGuard } from './service/accessoire-guard';
import { ListeCouleursComponent } from './liste-couleur/liste-couleur';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom';
import { RechercheParCouleurComponent } from './recherche-par-couleur/recherche-par-couleur';
export const routes: Routes = [
    {path: "accessoires", component: AccessoiresComponent},
    {path: "add-accessoire", component: AddAccessoireComponent, canActivate:[accessoireGuard]},
    {path: "update-accessoire/:id", component: Updateaccessoire},
    {path: "rechercheParCouleur", component: RechercheParCouleurComponent},
    {path: "rechercheParNom", component: RechercheParNomComponent},
    {path: "app-forbidden", component: Forbidden},
    {path: "listeCouleurs", component: ListeCouleursComponent},
    {path: "app-login", component: Login},
    {path: "", redirectTo: "accessoires", pathMatch: "full"}
];