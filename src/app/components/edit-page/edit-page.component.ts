import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/environments/interfaces';
import { PostService } from './../../services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  post!: Post
  updateSubscription!: Subscription
  submitted = false


  constructor(
    public route: ActivatedRoute,
    public postService: PostService,
    public alert: AlertService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  ngOnDestroy(){
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  }

  submit(){
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    this.updateSubscription = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false
      this.alert.succeess('The post has been edited')
    })
  }
}
