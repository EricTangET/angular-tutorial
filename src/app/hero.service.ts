import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private heroUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroUrl).toPromise().then(response => response.json() as Hero[]).catch(this.handleError);
  }

  private handleError(error:  any): Promise<any> {
    console.error('An error occur', error);
    return Promise.reject(error.message || error);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get(url).toPromise().then(response => response.json() as Hero).catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers}).toPromise().then(() => hero).catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http.post(this.heroUrl, JSON.stringify({name: name}), {headers: this.headers}).toPromise().then(res => res.json() as Hero).catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
