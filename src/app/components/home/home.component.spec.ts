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

import { HttpService } from 'src/app/services/http.service';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let activatedRouteMock = { navigate: jasmine.createSpy('params') };
  let service;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
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
