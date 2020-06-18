import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from "./modules/layouts/layouts.module";
import { UsersModule } from "./modules/users/users.module";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutsModule,
        HttpClientModule,
        UsersModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
