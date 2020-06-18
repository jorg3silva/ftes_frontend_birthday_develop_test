import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from "./create/create.component";
import { MainLayoutComponent } from "../layouts/main-layout/main-layout.component";

const routes: Routes = [
    {
        path: 'users',
        component: MainLayoutComponent,
        children: [
            {path: 'create', component: CreateComponent},
        ],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
