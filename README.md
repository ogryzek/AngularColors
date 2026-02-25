# AngularColors

We are reviewing Angular Routing, Observables, and Forms. This application intends to serve a form with an input and a list of colors.  
  
When a user types one of the colors into the input, it should change the background color to that of the color typed in.  
  
And that's it!  
  
## Angular CLI  
When we create our application, we can use `npx` to install a new Angular app at whichever version we'd like. In this case, we're going to use Angular version 12, just regular CSS, and we'll add routing, so our command will look like this:
```
npx @angular/cli@12 new angular-colors --routing --style=css --skip-tests
```
Note: I've skipped tests here, but testing is something we will usually do in professional projects and an excellent topic to ask about, if you're curious!  
  
## Files Touched
  - src/app/app.module.ts
  - src/app/colors/colors.component.ts
  - src/app/colors/colors.component.html
  - src/app/colors/colors.component.css
  - src/app/app-routing.module.ts
  - src/app/app.component.ts
  - src/app/app.component.html
  - src/app/app.component.css

  
In the `src/app/app.module.ts`, we add an import for `ReactiveFormsModule` and add it to the `imports` array.  
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
  
We add a `src/app/colors/colors.component.ts`, with accompanying `html` and `css`, so let's use the Angular CLI generator to generate this for us. 
  
We use `npm run` while inside the application directory to use the Angular CLI from the `node_modules` contained within the app.  
```
npm run ng generate component colors --skip-tests
```
  
`src/app/colors/colors.component.ts`
```ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
  search = new FormControl('');
  colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  matchedColor: string | null = null;

  get backgroundColor(): string {
    const val = this.search.value;
    return this.colors.includes(val) ? val : 'white';
  }

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(val => {
      const trimmed = (val || '').trim().toLowerCase();
      this.matchedColor = this.colors.find(color => color.toLowerCase() === trimmed) || null;
    });
  }
}
```

`src/app/colors/colors.component.html`
```html
<div [style.backgroundColor]="backgroundColor" style="min-height: 100vh; padding: 2rem; transition: background-color 0.5s;">
  <h1>Color Search</h1>

  <input [formControl]="search" placeholder="Type a color..." style="padding: 0.8rem; font-size: 1.2rem;">

  <p *ngIf="matchedColor" style="margin-top: 1rem; font-size: 1.4rem;">
    Matched: <strong>{{ matchedColor }}</strong>
  </p>
  <p *ngIf="!matchedColor && search.value">No exact match</p>

  <ul style="margin-top: 2rem; list-style: none; padding: 0;">
    <li *ngFor="let c of colors">{{ c }}</li>
  </ul>
</div>
```

```css
div { transition: background-color 0.5s ease; }
```
  

In `src/app/app-routing.module.ts`, we import the `colors` component and add a route for it:
```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorsComponent } from './colors/colors/colors.component';

const routes: Routes = [
  { path: '', redirectTo: '/colors', pathMatch: 'full' },
  { path: 'colors', component: ColorsComponent },
  { path: '**', redirectTo: '/colors' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```


Add the `RouterOutlet` to `src/app/app.component.html`
```html
<router-outlet />
```

`src/app/app.component.css`
```css

``` 