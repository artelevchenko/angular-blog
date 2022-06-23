import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/environments/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$!: Observable<Post[]>;

  constructor(public postService: PostService) { }

  ngOnInit(){
    this.posts$ = this.postService.getAll()
  }

}
