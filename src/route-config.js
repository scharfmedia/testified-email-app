export default [
  { route: ['','login'],    name: 'login',        moduleId: 'pages/login',     nav: false, auth: false, title:'Login' },
  { route: 'signup',        name: 'signup',       moduleId: 'pages/signup',    nav: false, auth: false, title:'Signup' },
  { route: 'users',         name: 'users',        moduleId: 'pages/users',     nav: true,  auth: true,  title:'Github Users' },
  { route: 'logout',        name: 'logout',       moduleId: 'pages/logout',    nav: true,  auth: true,  title:'Logout' }
];
