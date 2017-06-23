import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component'
import { HeroService } from './hero.service'

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  constructor(
    private router: Router,
    private heroService: HeroService) { }

  title = 'Tour of heroes';
  selectedHero: Hero;
  heroes: Hero[];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => {
        this.heroes = heroes;
      },
      err => {
        console.log(err);
      }
    );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name).subscribe(
      hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id).subscribe(
      () => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
