import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { ControlsComponent } from './pages/controls/controls.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/game' },
  { path: 'game', component: GameComponent },
  { path: 'controls', component: ControlsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
