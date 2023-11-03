import { Component, OnInit } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './posts';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
 returnedName: string = "";
 returnedContent: string = "";
 loadedPosts: Post[]= [];
 isFetching: boolean = false;


constructor(private http: HttpClient){

}

ngOnInit(): void {
  this.fetchPosts();
}



 onCreatePost(postInfo: Post){

 this.http.post<Post>('https://http-project-ccd1a-default-rtdb.firebaseio.com/posts.json',postInfo).subscribe(responseData=> {

 })
 this.returnedName = "";
 this.returnedContent = "";
 }

 onFetchPosts() {
  this.fetchPosts();
 }

 private fetchPosts() {
  this.isFetching = true;
  this.http.get<{[key:string]: Post }>('https://http-project-ccd1a-default-rtdb.firebaseio.com/posts.json')
  .pipe(
    map(responseData=> {
      const postArray: Post[] = [];
      for(const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          //push a new array into postArray w/responseData plus database key
          postArray.push({...responseData[key], id: key})
        }//end of if conditional
      }//end of for loop
      return postArray
    })//end of map
  )//end of pipe
  .subscribe(posts=> {
    this.isFetching=  false;
    this.loadedPosts = posts;
  })
 }
}


