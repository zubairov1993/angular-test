import { EnvironmentI } from './interface'

export const environment: EnvironmentI = {
  production: false,
  locales: ['en', 'ru'],
  defaultLocale: 'ru',
  firebaseConfig: {
    signInWithPasswordPath: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    apiKey: "AIzaSyDAEbzhFpQVlvVpw5AY9munGtQIOdhedE8",
    authDomain: "angular-test-8b878.firebaseapp.com",
    projectId: "angular-test-8b878",
    storageBucket: "angular-test-8b878.appspot.com",
    messagingSenderId: "153386821237",
    appId: "1:153386821237:web:8037b5444ab3a80794ba3c",
    databaseURL: "https://angular-test-8b878-default-rtdb.firebaseio.com",
  }
}
