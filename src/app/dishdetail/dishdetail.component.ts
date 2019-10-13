import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
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
    commentForm: FormGroup;
    comment: Comment;
    errMess: string;
    dishCopy: Dish;

    @ViewChild('fform') commentFormDirective;

    formErrors = {
        'author': '',
        'rating': '',
        'comment': '',
    };

    validationMessages = {
        'author': {
            'required': 'Author name is required.',
            'minlength': 'Author name must be at least 2 characters long.',
            'maxlength': 'Author name cannot be more than 25 characters.'
        },
        'comment': {
            'required': 'Comment is required.',
        }
    };

    constructor(
        private route: ActivatedRoute,
        private dishService: DishService,
        private location: Location,
        private fb: FormBuilder,
        @Inject('BaseURL') private BaseURL
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
        let id = this.route.snapshot.params['id'];
        this.dishService.getDish(id).subscribe((dish) => {
            this.dish = dish;
            this.dishCopy = dish;
            this.setPrevNext(dish.id);
        }, errmess => this.errMess = <any>errmess);
    }
    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
    goBack() {
        this.location.back();
    }

    createForm() {
        this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            comment: ['', Validators.required],
            rating: '5',
        });
        this.commentForm.valueChanges.subscribe(data => { this.onValueChanged(data) });
        this.onValueChanged();
    }
    onValueChanged(data?: any) {
        if (!this.commentForm) { return; }
        const form = this.commentForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }

    }
    onSubmit() {
        this.comment = this.commentForm.value;
        this.comment.date = new Date().toISOString();
        console.log(this.comment);
        this.dishCopy.comments.push(this.comment);
        this.dishService.putDish(this.dishCopy).subscribe(dish => {
            this.dish = dish;
            this.dishCopy = dish;
        }, errMess => { this.dish = null, this.dishCopy = null, this.errMess = <any>errMess });
        this.commentFormDirective.resetForm();
        this.commentForm.reset({
            author: '',
            rating: 5,
            comment: '',
        });
    }
}