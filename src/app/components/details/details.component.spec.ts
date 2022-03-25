import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import * as Rx from 'rxjs';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  const paramsSubject = new BehaviorSubject({});
  let service: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
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
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = fixture.debugElement.injector.get(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getGameDetails with the game id', fakeAsync(() => {
      const spy = spyOn(component, 'getGameDetails').and.callThrough();

      paramsSubject.next({ id: '4' });
      component.ngOnInit();
      tick();

      expect(component.gameId).toBe('4');
      expect(spy).toHaveBeenCalledWith('4');
    }));
  });

  describe('getColor', () => {
    it('should call return the color based on value', () => {
      expect(component.getColor(78)).toBe('#5ee432');
      expect(component.getColor(51)).toBe('#fffa50');
      expect(component.getColor(34)).toBe('#f7aa38');
      expect(component.getColor(29)).toBe('#ef4655');
    });
  });

  describe('getGameDetails', function () {
    it('should retunr game details', fakeAsync(() => {
      let game = {
        background_image: 'string',
        name: 'Grand Theft Auto V',
        released: '2013-09-17',
        metacritic_url: 'string',
        website: 'string',
        description: 'string',
        metacritic: 94,
      };

      let spyGetGameList = spyOn(service, 'getGameDetails').and.callFake(() => {
        return Rx.of(game).pipe(delay(1000));
      });

      component.getGameDetails('3498');
      tick(1000);

      expect(component.game).toEqual(game);
      tick(1000);

      setTimeout(() => {
        expect(component.gameRating).toBe(94);
      }, 1001);
      tick(1001);
    }));
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from gameSub', () => {
      component.gameSub = new Subscription();
      const subscription = spyOn(component.gameSub, 'unsubscribe');

      component.ngOnDestroy();

      expect(subscription).toHaveBeenCalledTimes(1);
    });

    it('should unsubscribe from routeSub', () => {
      component.routeSub = new Subscription();
      const subscription = spyOn(component.routeSub, 'unsubscribe');

      component.ngOnDestroy();

      expect(subscription).toHaveBeenCalledTimes(1);
    });
  });
});
