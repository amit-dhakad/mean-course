import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  /*  posts = [
    {title: 'First Post', content: ' This is the first post\'s content '},
    {title: 'Second Post', content: ' This is the second post\'s content '},
    {title: 'Third Post', content: ' This is the third post\'s content '}
  ]; */

  posts: Post[] = [];
  isLoading = false;

  private postSub: Subscription;
  constructor(public postsService: PostService) {}

  ngOnInit() {
    this.isLoading = true;

    this.postsService.getPosts();
    this.postSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;

        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
