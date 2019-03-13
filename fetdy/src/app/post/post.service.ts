import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private postUpdated = new Subject<{posts: Post[], postCount: number}>(); // create an observable event to store post array

  constructor(private http: HttpClient, private router: Router) { }

  getPostData(id: string) {
    // Spread array and find post where id = postId
   // return {...this.posts.find(post => post.id === id)};
   return this.http.get<{_id: string, title: string,
     content: string, imagePath: string, creator: string}>('http://localhost:3001/getpost/' + id);
  }

  updatePost(id: string, title: string , content: string, image: File | string | any) {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
       postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
        postData = { id: id, title: title, content: content, imagePath: image, creator: null };
    }
    // const post: Post = { id: id , title: title, content: content, imagePath: null };
    this.http.put<any>('http://localhost:3001/updatepost/' + id, postData)
    .subscribe((response) => {
    /* const updatedPost = [...this.posts];
    const oldPostIndex = updatedPost.findIndex( p => p.id === id);
    const post: Post = { id: id , title: title, content: content, imagePath: response.imagePath };
    updatedPost[oldPostIndex] = post;
    this.posts = updatedPost;
    this.postUpdated.next([...this.posts]); */
     this.router.navigate(['/list']);
  });
  }

  getPosts(postsPerPage: number, currentPage: number) {

    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3001/getpost' + queryParams)
    // pipe response to an operator that changes the response features,
    // use Map to add UnderScore to ID variable
    .pipe(map((postData) => {
      return { posts: postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath,
          creator: post.creator
        };
      }), maxPosts: postData.maxPosts};
    } ))
    .subscribe((transformPostData) => {
      // console.log(transformPostData);
      this.posts = transformPostData.posts; // Add new post to the Post Array
      this.postUpdated.next({posts: [...this.posts], postCount: transformPostData.maxPosts}); // update the list of post array event

      // ---- Without Pipe() ----//
   /*  .subscribe((postData) => {
      this.posts = postData.posts;
      this.postUpdated.next([...this.posts]); */
    });
    // return [...this.posts];
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    // const post: Post = { id: null, title: title, content: content};
                    // Post Response with Mongoose ID
    this.http.post<{message: string, post: Post}>('http://localhost:3001/postData', postData)
    .subscribe((responseData) => {
     /*  const post: Post = { id: responseData.post.id, title: title,
         content: content, imagePath: responseData.post.imagePath};
      // console.log(responseData.message);
      // const id = responseData.postId; // Access the postId field
      // post.id = id; // Update current postId of null with mongoose ID
      this.posts.push(post);
      this.postUpdated.next([...this.posts]); // add new post to post event array
       */
       this.router.navigate(['/list']);
     });
    // this.posts.push(post);
    // this.postUpdated.next([...this.posts]);
  }

  getPostUpdated() {
    return this.postUpdated.asObservable(); // return private variable post event array
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3001/deletepost/' + postId);
  /*   .subscribe(() => {
      // Remove Deleted Post from the Post event Array Dynamically in the browser
      const updatedPost = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPost;
      this.postUpdated.next([...this.posts]);
    }); */
  }

}
