import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/posts.model';
import { map } from 'rxjs/operators';
import { addPost, updatePost } from './../posts/state/posts.actions';

@Injectable({
    providedIn:'root',
})
export class PostsService{
    // private url = 'https://blogpost-814da-default-rtdb.firebaseio.com/posts.json'; 
    constructor(private http: HttpClient){}

    getPosts(): Observable<Post[]>{
        return this.http.get<Post[]>(`https://blogpost-814da-default-rtdb.firebaseio.com/posts.json`)
        .pipe(
            map((data) => {
            const posts: Post[] = [];
            for(let key in data){
                posts.push({ ...data[key], id: key });
          }
          return posts;
       })
     );
    }

    addPost(post: Post): Observable<{name: string}>{
      return this.http.post<{ name: string}>(
        `https://blogpost-814da-default-rtdb.firebaseio.com/posts.json`,post
      );
    }
    
    // updatePost(post: Post){  
    //     return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))  
    //   }  
    
    updatePost(post: Post){
        const postData = { 
            [post.id!]: {title: post.title, description: post.description},
        };
        return this.http.patch(
            `https://blogpost-814da-default-rtdb.firebaseio.com/posts.json`,
            postData
        );
    }
    
}