import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HttpModule } from '@angular/http';

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

// Register services
import { CategoryService } from './services/category.service';
import { PersonService } from './services/person.service';
import { ProductService } from './services/Product.Service';

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
    FilterPersonNameComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'products-list', component: TableProductComponent },
      { path: 'filter-product-name', component: FilterProductNameComponent },
      { path: 'filter-product-category', component: FilterProductCategoryComponent },
      { path: 'filter-person-name', component: FilterPersonNameComponent },
    ])
  ],
  providers: [CategoryService, PersonService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
