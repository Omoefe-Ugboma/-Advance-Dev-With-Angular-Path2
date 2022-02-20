import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { addPost } from '../state/posts.actions';
import { AppState } from './../../store/app.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null,[
        Validators.required,
        Validators.minLength(6),
      ]),
      body: new FormControl(null,[
        Validators.required,
      Validators.minLength(10),]),
    });
  }

  showDescriptionErrors(){
    const descriptionForm =  this.postForm.get('body');
    if(descriptionForm!.touched && !descriptionForm!.valid){
      if(descriptionForm!.errors!.required){
        return 'body is required';
      }
      if(descriptionForm!.errors!.minLength){
        return 'body should be of minimum 10 characters length';
      }
    }
  }

  onAddPost(){
    if(!this.postForm.valid){
      return;
    }
    // console.log(this.postForm.value);
    const post: Post = {
      title: this.postForm.value.title,
      body: this.postForm.value.body,
    };
    this.store.dispatch(addPost({post}));
  }

}
