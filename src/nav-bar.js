import {bindable,inject} from 'aurelia-framework';
import {Client} from './services/api';

@inject(Client)
export class NavBar {
  @bindable router = null;
  client = null;

  constructor(client) {
      this.client = client;
  }
}
