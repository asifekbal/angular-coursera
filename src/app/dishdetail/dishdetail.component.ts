import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    constructor(
        private route: ActivatedRoute,
        private dishService: DishService,
        private location: Location,
    ) {

    }

    ngOnInit() {
        this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
        let id = this.route.snapshot.params['id'];
        this.dishService.getDish(id).subscribe((dish) => {
            this.dish = dish;
            this.setPrevNext(dish.id);
        });
    }
    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
    goBack() {
        this.location.back();
    }
}