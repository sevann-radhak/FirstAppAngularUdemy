import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Register components
import { ButtonAgregar } from './components/button/Button.compoent';
import { Weedkdays } from './components/Weekdays/Weekdays.component';
import { TableProductComponent } from './components/table-product/table-product.component';
import { SearchProductNameComponent } from './components/search-product-name/search-product-name.component';
import { FilterProductNameComponent } from './components/filter-product-name/filter-product-name.component';
import { SearchProductCategoryComponent } from './components/search-product-category/search-product-category.component';
import { FilterProductCategoryComponent } from './components/filter-product-category/filter-product-category.component';
import { TablePersonComponent } from './components/table-person/table-person.component';
import { SearchPersonNameComponent } from './components/search-person-name/search-person-name.component';
import { FilterPersonNameComponent } from './components/filter-person-name/filter-person-name.component';
import { SearchUserTypeuserComponent } from './components/search-user-typeuser/search-user-typeuser.component';
import { FilterUserTypeuserComponent } from './components/filter-user-typeuser/filter-user-typeuser.component';
import { TableUserComponent } from './components/table-user/table-user.component';
import { SettingsPersonComponent } from './components/settings-person/settings-person.component';
import { SettingsFormPersonComponent } from './components/settings-form-person/settings-form-person.component';
import { SettingsProductComponent } from './components/settings-product/settings-product.component';
import { SettingsFormProductComponent } from './components/settings-form-product/settings-form-product.component';
import { SettingsUserComponent } from './components/settings-user/settings-user.component';
import { SettingsFormUserComponent } from './components/settings-form-user/settings-form-user.component';
import { LoginComponent } from './components/login/login.component';
import { LoginErrorComponent } from './components/login-error/login-error.component';
import { LoginPermissionsErrorComponent } from './components/login-permissions-error/login-permissions-error.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SettingsUsertypeComponent } from './components/settings-usertype/settings-usertype.component';
import { SettingsFormUsertypeComponent } from './components/settings-form-usertype/settings-form-usertype.component';
import { TableUsertypeComponent } from './components/table-usertype/table-usertype.component';

// Register services
import { CategoryService } from './services/category.service';
import { PersonService } from './services/person.service';
import { ProductService } from './services/Product.Service';
import { UserService } from './services/user.service';

// Guards
import { SecurityGuard } from './components/guards/security.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ButtonAgregar,
    Weedkdays,
    TableProductComponent,
    SearchProductNameComponent,
    FilterProductNameComponent,
    SearchProductCategoryComponent,
    FilterProductCategoryComponent,
    TablePersonComponent,
    SearchPersonNameComponent,
    FilterPersonNameComponent,
    SearchUserTypeuserComponent,
    FilterUserTypeuserComponent,
    TableUserComponent,
    SettingsPersonComponent,
    SettingsFormPersonComponent,
    SettingsProductComponent,
    SettingsFormProductComponent,
    SettingsUserComponent,
    SettingsFormUserComponent,
    LoginComponent,
    LoginErrorComponent,
    LoginPermissionsErrorComponent,
    WelcomeComponent,
    SettingsUsertypeComponent,
    SettingsFormUsertypeComponent,
    TableUsertypeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'products-list', component: TableProductComponent },
      { path: 'filter-product-name', component: FilterProductNameComponent, canActivate: [SecurityGuard] },
      { path: 'filter-product-category', component: FilterProductCategoryComponent, pathMatch: 'full', canActivate: [SecurityGuard] },
      { path: 'filter-person-name', component: FilterPersonNameComponent, canActivate: [SecurityGuard] },
      { path: 'filter-user-usertype', component: FilterUserTypeuserComponent, canActivate: [SecurityGuard] },
      { path: 'settings-person', component: SettingsPersonComponent, canActivate: [SecurityGuard] },
      { path: 'settings-person/:id', component: SettingsFormPersonComponent, canActivate: [SecurityGuard] },
      { path: 'settings-product', component: SettingsProductComponent, canActivate: [SecurityGuard] },
      { path: 'settings-product/:id', component: SettingsFormProductComponent, canActivate: [SecurityGuard] },
      { path: 'settings-user', component: SettingsUserComponent, canActivate: [SecurityGuard] },
      { path: 'settings-user/:id', component: SettingsFormUserComponent, canActivate: [SecurityGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'login-error', component: LoginErrorComponent },
      { path: 'login-error-permissions', component: LoginPermissionsErrorComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'settings-usertype', component: SettingsUsertypeComponent },
      { path: 'settings-usertype/:id', component: SettingsFormUsertypeComponent },
      //{ path: 'table-usertype', component: TableUsertypeComponent },
    ])
  ],
  providers: [CategoryService, PersonService, ProductService, UserService, SecurityGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
