import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { updatePostAction } from '../posts-list/state/posts.actions';
import { getPostById } from '../posts-list/state/posts.selectors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post;
  id: string;
  postForm: FormGroup;
  postSub: Subscription;
  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.postSub = this.store.select(getPostById, {id: this.id})
        .subscribe(post => {
          this.post = post;
          this.createUpdateForm();
        });
    });
  }

  createUpdateForm(){
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(6)])
    })
  }

  onUpdatePost(){
    if(this.postForm.invalid)
      return;
    
    const post = {
      id: this.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }
    this.store.dispatch(updatePostAction({post}));
    this.router.navigate(['posts']);
  }

  ngOnDestroy(): void {
    if(this.postSub)
      this.postSub.unsubscribe();
  }
}
