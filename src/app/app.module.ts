import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { SocketService } from './services/socket.service';
import { LoginGuard } from './guards/login.guard';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { QuizHostComponent } from './components/games/quiz/quiz-host/quiz-host.component';
import { QuizPlayerComponent } from './components/games/quiz/quiz-player/quiz-player.component';
import { GamesComponent } from './components/games/games.component';
import { MakeGameComponent } from './components/make-game/make-game.component';


const appRoutes: Routes = [
  { path: 'home', component: UserComponent,
  canActivate: [LoginGuard]
},
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'host/quiz',
  component: QuizHostComponent,
  canActivate: [LoginGuard] },

  // { path: 'hero/:id',      component: HeroDetailComponent },
  // { 
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PageNotFoundComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    QuizHostComponent,
    QuizPlayerComponent,
    GamesComponent,
    MakeGameComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ 
    DataService,
    SocketService,
    LoginGuard
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
