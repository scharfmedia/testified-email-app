import {inject} from 'aurelia-framework';
import {Client} from '../services/api'
import {Router} from 'aurelia-router';

@inject(Client,Router)
export class Login{
  heading = 'Please Login';
  email = 'test@testified.email';
  password = 'test';
  isBusy = false;

  constructor(client,router) {
      this.client = client;
      this.router = router;
  }

  submit(){
    this.busy(
        this.client.login(this.email,this.password)
    )
    .then(()=>this.router.navigateToRoute('users'));
  }

  busy(promise) {
      if(!promise) return Promise.reject();

      this.isBusy = true;
      return promise.then(
          (v)=>{ this.isBusy = false;return v},
          (v)=>{ this.isBusy = false;throw v}
      );
  }

  canDeactivate() {
    if (this.isBusy) {
      return confirm('Are you sure you want to leave?');
    }
  }

  activate() {
      if(this.client.authenticated) {
          this.router.navigateToRoute('users');
      }
  }

}


// export class UpperValueConverter {
//   toView(value){
//     return value && value.toUpperCase();
//   }
// }
