import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PictureComponent } from './components/picture/picture.component';
import { KentekenMaskPipe } from './shared/pipes/kenteken-mask.pipe';
import { reducer } from './store/form/form.reducer';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PictureComponent,
    KentekenMaskPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ form: reducer })
  ],
  providers: [KentekenMaskPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
