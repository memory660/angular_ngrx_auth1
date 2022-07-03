import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/Store/app.state';
import { addPostAction } from '../posts-list/state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title:  new FormControl(null, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onAddPost(){
    if(!this.postForm.valid)
      return;
    
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }
    this.store.dispatch(addPostAction({post}));
  }
  showDescriptionerror(){
    const descriptionForm = this.postForm.get('description');
    if(descriptionForm.touched && !descriptionForm.valid){
      if(descriptionForm.errors.required){
        return 'Description is required';
      }
      if(descriptionForm.errors.minlength){
        return 'Description should be minimum 6 characters length';
      }
    }
  }
}
