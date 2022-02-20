import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { getPostById } from '../state/posts.selector';
import { AppState } from './../../store/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post!: Post;
  postForm!: FormGroup;
  postSubscription: Subscription | undefined;
  constructor(private route: ActivatedRoute, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) =>{
      // console.log(params.get('id'));
      const id = params.get('id');
      this.postSubscription = this.store
      .select(getPostById, {id})
      .subscribe(data =>{
        this.post = data;
        // console.log(this.post);
        this.createForm();
      })
    })
  }

  createForm(){
   this.postForm =  new FormGroup({
     title: new FormControl(this.post.title,[
       Validators.required,
       Validators.minLength(6),
     ]),
     description: new FormControl(this.post.description,[
       Validators.required,
       Validators.minLength(10),
     ]),
   });
  }

  ngOnDestroy(): void {
      if(this.postSubscription){
        this.postSubscription.unsubscribe();
      }
  }
}
