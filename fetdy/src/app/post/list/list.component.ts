import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(public postService: PostService, private authService: AuthService) { }

 // @Input()
  posts: Post[] = [];
  private postSub: Subscription;
  isloading = false;
  totalPost = 10;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOption = [2, 3, 5, 10];
  private authStatusSub: Subscription;
  userIsAuth = false;
  userId: string;

  onChangedPage(pageData: PageEvent) {
    this.isloading = true;
      this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnInit() {
    // this.posts = this.postService.getPosts();
    this.isloading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postSub = this.postService.getPostUpdated()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
    this.isloading = false;
    this.totalPost = postData.postCount;
      this.posts = postData.posts;
    });
        this.userIsAuth = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatus()
    .subscribe(isAuthenticated => {
      this.userIsAuth = isAuthenticated;
      this.userId = this.authService.getUserId();
      }
    );
  }

  onDelete(postId: string) {
    this.isloading = true;
    this.postService.deletePost(postId)
    .subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {this.isloading = false; });
  }

ngOnDestroy() {
  this.postSub.unsubscribe();
  this.authStatusSub.unsubscribe();
}

}
