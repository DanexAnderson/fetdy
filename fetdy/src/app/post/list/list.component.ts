import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(public postService: PostService) { }

 // @Input()
  posts: Post[] = [];
  private postSub: Subscription;
  isloading = false;

  ngOnInit() {
    // this.posts = this.postService.getPosts();
    this.isloading = true;
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdated().subscribe((posts: Post[]) => {
  this.isloading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

ngOnDestroy() {
  this.postSub.unsubscribe();
}

}
