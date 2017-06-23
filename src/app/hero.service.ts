import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero'

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getHeroes(): Observable<Hero[]> {
        return this.http
            .get(this.heroesUrl)
            .map((res) => res.json().data)
            .catch(this.handleError)
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http
            .get(url)
            .map((res) => res.json().data)
            .catch(this.handleError)
    }

    update(hero: Hero): Observable<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .map((res) => res.json().data)
            .catch(this.handleError);
    }

    create(name: string): Observable<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .map((res) => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Observable<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .map(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Observable<any> {
        return Observable.throw(error.json().error || 'Server error')
    }
}