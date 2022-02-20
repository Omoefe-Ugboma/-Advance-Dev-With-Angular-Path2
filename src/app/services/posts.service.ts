import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/posts.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root',
})
export class PostsService{
    constructor(private http: HttpClient){}

    getPosts(): Observable<Post[]>{
        return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
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
}