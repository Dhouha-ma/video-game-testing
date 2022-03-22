import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import * as Rx from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';

import { HttpService } from 'src/app/services/http.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: HttpService;
  const paramsSubject = new BehaviorSubject({});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = fixture.debugElement.injector.get(HttpService);
  });

  describe('ngOnInit', () => {
    it('should call searchGames with default params metacrit', fakeAsync(() => {
      const spy = spyOn(component, 'searchGames').and.callThrough();

      paramsSubject.next({});
      component.ngOnInit();
      tick();

      expect(spy).toHaveBeenCalledWith('metacrit');
    }));

    it('should call searchGames with default params metacrit and search term', fakeAsync(() => {
      const spy = spyOn(component, 'searchGames').and.callThrough();
      
      paramsSubject.next({ 'game-search': 'game'});
      component.ngOnInit();
      tick();

      expect(spy).toHaveBeenCalledWith('metacrit', 'game');
    }));
  });

  describe('searchGames', function () {
    it('should get games list', fakeAsync(() => {
      let list = {
        results: [
          {
            background_image: 'string',
            name: 'Grand Theft Auto V',
            released: '2013-09-17',
            metacritic_url: 'string',
            website: 'string',
            description: 'string',
            metacritic: 94,
          },
        ],
      };

      let spyGetGameList = spyOn(service, 'getGameList').and.callFake(() => {
        return Rx.of(list).pipe(delay(1000));
      });

      component.searchGames('metacrit');
      tick(1000);

      expect(component.games).toEqual(list.results);
    }));
  });
});
