import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayersComponent } from './layers/layers.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolsComponent } from './tools/tools.component';
import { PreviewComponent } from './preview/preview.component';
import {FormsModule} from '@angular/forms';
import { HelloComponent } from './hello/hello.component';
import {RouterModule, Routes} from '@angular/router';
import { MainComponent } from './main/main.component';
import {AuthGuardServiceService} from './shared/auth/auth-guard-service.service';

const routes: Routes = [
  {path: '', component: HelloComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuardServiceService]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    LayersComponent,
    CanvasComponent,
    ToolsComponent,
    PreviewComponent,
    HelloComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
