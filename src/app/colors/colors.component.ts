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
