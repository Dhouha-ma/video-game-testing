import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
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

  let game = {
    background_image: 'string',
    name: 'Grand Theft Auto V',
    released: '2013-09-17',
    metacritic_url: 'string',
    website: 'string',
    description: 'string',
    metacritic: 94,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getGameList', () => {
    it('should return list of games', () => {
      service.getGameList('metacrit').subscribe((data) => {
        expect(data).toEqual(list);
      });
    });
  });

  describe('getGameDetails', () => {
    it('should return details of game', () => {
      service.getGameDetails('9').subscribe((data) => {
        expect(data).toEqual(game);
      });
    });
  });
});
