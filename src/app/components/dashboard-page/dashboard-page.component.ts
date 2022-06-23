import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/environments/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub!: Subscription
  dSub!: Subscription
  searchStr = ''

  constructor(
    public postService: PostService,
    public alert: AlertService
  ) {}

  ngOnInit() {
    this.postService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string | undefined) {
    this.dSub = this.postService.remove(id as string).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('The post has been deleted')
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
