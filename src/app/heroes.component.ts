import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heros';
  hero: Hero = {
    id: 1,
    name: 'Eric'
  };
  heros: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heros => this.heros = heros);
  }

  goToDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name).then(hero => {
      this.heros.push(hero);
      this.selectedHero = null;
    });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id).then(() => {
      this.heros = this.heros.filter(h => h !== hero);
      if (this.selectedHero === hero) { this.selectedHero = null; }
    });
  }
}
