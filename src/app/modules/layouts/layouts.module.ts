import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MainLayoutComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        MainLayoutComponent,
    ],
})
export class LayoutsModule {
}
