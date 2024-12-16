import { ApiService } from './services/api.service';
// import { Interceptor } from './services/interceptor.interceptor';
import { HttpService } from './services/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducers/index';
import { HandlerService } from './services/handler.service';
import { SharedModule } from './component/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AlertModule } from 'ngx-bootstrap/alert';
import { environment } from '../environments/environment';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './container/login/login.component';
import { RegisterComponent } from './container/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ModalModule.forRoot(),
    SharedModule,
    AlertModule.forRoot()
  ],
  providers: [
   // Interceptor,
    HttpService,
    ApiService,
    HandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
