import { mergeMap, map, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from './../../services/posts.service';
import { loadPosts, loadPostsSuccess, addPost, addPostSuccess, updatePost, updatePostSuccess } from './posts.actions';

@Injectable()
export class PostsEffects{
   
    constructor(private actions$: Actions, private postsService: PostsService){}
    
    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
              return this.postsService.getPosts().pipe(map((posts) =>{
               return loadPostsSuccess({ posts });      
              })
            );
                      
          })
       );
    });
    addPost$ = createEffect(
      () =>{
        return this.actions$.pipe(
          ofType(addPost),
          mergeMap((action) =>{
            return this.postsService.addPost(action.post).pipe(
              map((data) => {
                const post = { ...action.post, id: data.name};
                return addPostSuccess({post});
              })
            );
          })
        );
      });

    updatePost$ = createEffect(() =>{
      return this.actions$.pipe(
        ofType(updatePost),
        switchMap((action) =>{
          return this.postsService
          .updatePost(action.post)
          .pipe(map((data) =>{
            return updatePostSuccess({post: action.post}) 
          }));
        })
      );
    });
}