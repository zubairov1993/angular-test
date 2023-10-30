import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'questions',
        canActivate: [AuthGuard],
        loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule),
      },
      {
        path: 'questions/admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule),
      },
      { path: '**', redirectTo: '/questions' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
