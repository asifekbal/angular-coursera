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

    constructor(
        private route: ActivatedRoute,
        private dishService: DishService,
        private location: Location,

    ) {

    }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        this.dish = this.dishService.getDish(id);
    }

    goBack(){
        this.location.back();
    }

}
