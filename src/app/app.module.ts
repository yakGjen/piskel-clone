import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayersComponent } from './layers/layers.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolsComponent } from './tools/tools.component';
import { PreviewComponent } from './preview/preview.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayersComponent,
    CanvasComponent,
    ToolsComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
