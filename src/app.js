import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import {inject} from 'aurelia-framework';
import {Client} from './services/api';
import {Redirect} from 'aurelia-router';

export class App {
  configureRouter(config, router){
    config.title = 'Testified Email App';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['','login'],    name: 'login',        moduleId: 'ui/login',     nav: false, auth: false, title:'Login' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true,  auth: true,  title:'Github Users' },
      { route: 'logout',        name: 'logout',       moduleId: 'ui/logout',    nav: true,  auth: true,  title:'Logout' }
    ]);

    this.router = router;
  }
}

@inject(Client)
class AuthorizeStep {
  constructor(client) {
    this.client = client;
  }

  run(routingContext, next) {
    // Check if the route has an "auth" key
    // The reason for using `nextInstructions` is because
    // this includes child routes.
    if (routingContext.nextInstructions.some(i => i.config.auth)) {
      var isLoggedIn = this.client.authenticated;
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
