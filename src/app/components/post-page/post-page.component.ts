import { switchMap } from 'rxjs/operators';
import { Post } from './../../../environments/interfaces';
import { Observable, pipe } from 'rxjs';
import { PostService } from './../../services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>;

  constructor(
    public route: ActivatedRoute,
    public postService: PostService
  ) {}

  ngOnInit() {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      }))
  }

}
