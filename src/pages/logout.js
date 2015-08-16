import {inject} from 'aurelia-framework';
import {Client} from '../services/api'

@inject(Client)
export class Logout{

  constructor(client) {
      this.client = client;
  }

  activate() {
      return this.client.logout();
  }
}
