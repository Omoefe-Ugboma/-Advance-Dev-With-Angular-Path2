import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { getPostById } from '../state/posts.selector';
import { AppState } from './../../store/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post!: Post;
  updateForm!: FormGroup;
  postSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute, 
    private store:Store<AppState>,
    private router: Router) { }

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
   this.updateForm =  new FormGroup({
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

  onSubmit(){
    if(!this.updateForm.valid){
      return;
    }
    const title = this.updateForm.value.title;
    const description = this.updateForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };
    // dispatch the action
    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts']);
  }

  ngOnDestroy(): void {
      if(this.postSubscription){
        this.postSubscription.unsubscribe();
      }
  }
}
