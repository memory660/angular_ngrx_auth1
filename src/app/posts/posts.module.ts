import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostsEffects } from "./posts-list/state/posts.effects";
import { postsReducer } from "./posts-list/state/posts.reducers";
import { POST_STATE_NAME } from "./posts-list/state/posts.selectors";

const routes: Routes = [
    { path: '', component: PostsListComponent, 
    children: [
            { path: 'add', component: AddPostComponent},
            { path: 'edit/:id', component: EditPostComponent }
        ]
    }
]
@NgModule({
    declarations: [
        PostsListComponent,
        AddPostComponent,
        EditPostComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature(POST_STATE_NAME, postsReducer),
        EffectsModule.forFeature([PostsEffects])
    ]
})
export class PostsModule{}