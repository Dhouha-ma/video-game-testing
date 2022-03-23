import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchBarComponent 
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
      imports: [ 
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should redirect to search page with search text', () => {
      const testForm = <NgForm> {
        value: {
            search: "Hello",
        }
    };
      component.onSubmit(testForm);
      expect(routerSpy.navigate).toHaveBeenCalledWith([ 'search', 'Hello' ]);
    });
  });
  
});
