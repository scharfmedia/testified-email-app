import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';
import {Client} from '../services/api'

@inject(HttpClient,Client)
export class Users{
  heading = 'Github Users';
  users = [];

  constructor(http,client){
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
    this.client = client;
  }

  activate(){
    if( this.client.authenticated ) {
        return this.http.fetch('users')
          .then(response => response.json())
          .then(users => this.users = users);
    } else {
        return Promise.reject("welcome");
    }
  }
}
