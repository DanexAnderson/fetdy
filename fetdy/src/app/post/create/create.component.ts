import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mine-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {


  enterTitle = '';
  enterContent = '';
  valid = 0;
  post: Post;
  private mode = 'create'; // mode has to be Private
  postId = null;
  isloading = false;
  form: FormGroup;
  imagePrev: any;
  private authStatusSubs: Subscription;

   // @Output() postCreate = new EventEmitter<Post>();

  constructor(public postService: PostService,
     public route: ActivatedRoute, private authService: AuthService) { }

 /*  onPost(postInput: HTMLTextAreaElement) {
    this.enterContent = postInput.value;
     const post: Post = { title: this.enterTitle, content: this.enterContent }  ;
     this.postCreate.emit(post);
  } */

  // onPost(form: NgForm) //**** FormsModule ****/
  onPost() {
    this.valid = 1;
    if (this.form.invalid ) { return; }
    this.isloading = true;
    this.enterContent = this.form.value.content;
    this.enterTitle = this.form.value.title;
     const post: Post = { id: null, title: this.enterTitle,
       content: this.enterContent, imagePath: null, creator: null }  ;
    // this.postCreate.emit(post);
    if (this.mode === 'create') {
      this.postService.addPost(
        this.form.value.title,
         this.form.value.content,
          this.form.value.image
          );

    } else {
      this.postService.updatePost(
        this.postId,
         this.form.value.title,
         this.form.value.content,
          this.form.value.image);
    }
    this.form.reset(); // Remove post data from form fields

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrev = reader.result;
    };
    reader.readAsDataURL(file);
  }


  ngOnInit() {

    this.authStatusSubs = this.authService.getAuthStatus().subscribe(
      authStatus => {
        this.isloading = false;
      });
    this.form = new FormGroup({
      'title': new FormControl
      (null, {validators: [Validators.required, Validators.minLength(2)], updateOn: 'blur'}),
      'content': new FormControl
      (null, {validators: [Validators.required, Validators.minLength(2)]}),
      'image': new FormControl
      (null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => { // event ParamMap
      if (paramMap.has('postId')) { // Check if URL parameter exist with Id
        this.mode = 'edit';
        this.postId = paramMap.get('postId'); // Get URL parameter
        this.isloading = true;
        this.postService.getPostData(this.postId).subscribe(postData => {
          this.isloading = false;
          this.post = {
            id: postData._id,
             title: postData.title,
             content: postData.content,
              imagePath: postData.imagePath,
              creator: postData.creator
             };

          this.form.setValue({
          'title': this.post.title,
            'content': this.post.content,
            'image': this.post.imagePath});
        });
      } else {this.mode = 'create'; this.postId = null; }
    });
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }

}

