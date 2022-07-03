import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`https://crudngrx-default-rtdb.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          let posts: Post[] = [];
          for (let key in data) {
            posts.push({
              id: key,
              ...data[key]['post'],
            });
          }
          return posts;
        })
      );
  }

  addPost(post: Post) {
    return this.http.post(
      `https://crudngrx-default-rtdb.firebaseio.com/posts.json`,
      { post }
    );
  }

  updatePost(post: Post) {
    const postData = {
      [post.id]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      `https://crudngrx-default-rtdb.firebaseio.com/posts.json`,
      { postData }
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://crudngrx-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
}
