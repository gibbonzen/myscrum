import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { SignupComponent } from './user/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentModule } from 'src/material/material-component/material-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './user/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from 'src/api/http.module';
import { HeaderToolbarComponent } from './eat/header-toolbar/header-toolbar.component';
import { UserSettingsComponent } from './eat/user/user-settings/user-settings.component';
import { StoryTicketComponent } from './eat/story-ticket/story-ticket.component';
import { StoryTableComponent } from './eat/story-table/story-table.component';
import { DashboardComponent } from './eat/dashboard/dashboard.component';
import { ScrumBoardComponent } from './eat/scrum-board/scrum-board.component';
import { StoryCreateComponent } from './eat/story-create/story-create.component';
import { FontAwesomeShorcutsModule } from 'src/material/font-awesome/font-awesome-shorcuts.module';
import { CustomUiModule } from 'src/external_modules/ui/custom-ui.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    HeaderToolbarComponent,
    UserSettingsComponent,
    StoryTicketComponent,
    StoryTableComponent,
    DashboardComponent,
    ScrumBoardComponent,
    StoryCreateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,
    
    FirebaseModule,
    
    BrowserAnimationsModule,

    MaterialComponentModule,

    HttpModule,

    FontAwesomeShorcutsModule,

    CustomUiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
