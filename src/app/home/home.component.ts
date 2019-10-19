import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), expand()]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe((dishes) => this.dish = dishes, errmess => this.dishErrMess = <any>errmess);
    this.promotionService.getFeaturedPromotion().subscribe((promotions) => this.promotion = promotions, errmess => this.dishErrMess = <any>errmess);
    this.leaderService.getFeaturedLeader().subscribe((leaders) => this.leader = leaders, errmess => this.dishErrMess = <any>errmess);
  }
}