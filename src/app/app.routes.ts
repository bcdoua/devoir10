import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { addAccessoireComponent } from './add-accessoire/add-accessoire';
import { AccessoiresComponent } from './accessoires/accessoire';
import { Updateaccessoire } from './update-accessoire/update-accessoire';
import { RechercheParcouleurComponent } from './recherche-par-couleur/recherche-par-couleur';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { accesosireGuard } from './service/accessoire-guard';
export const routes: Routes = [
    { path: "accessoire", component: AccessoiresComponent },
    { path: "add-accessoire", component: addAccessoireComponent,canActivate:[accesosireGuard] },
    { path: "update-accessoire/:id", component: Updateaccessoire },
    {path: "rechercheParcouleur", component : RechercheParcouleurComponent},
    {path: "rechercheParNom", component : RechercheParNom},
    { path: "", redirectTo: "accessoire", pathMatch: "full" },
    {path:  'login', component: Login},
    {path:'app-forbidden',component:Forbidden},
];
