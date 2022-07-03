import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { deletePostAction, loadPosts } from './state/posts.actions';
import { getPosts } from './state/posts.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }
  onDeletePost(id: string){
    if(confirm("Are you sure, you want to delete this post?")){
      this.store.dispatch(deletePostAction({id}));
    }
  }
}
