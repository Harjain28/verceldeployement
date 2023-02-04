"use strict";
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
exports.__esModule = true;
exports.environment = void 0;
exports.environment = {
    production: false,
    // BASE_API_ENDPOINT: 'http://34.232.184.181:8900/api/', 
    BASE_API_ENDPOINT: 'https://api.iwizkid.shop/v1/api/',
    APPLICATION_BASE_URL: 'http://localhost:4200/#/',
    firebaseConfig: {
        apiKey: "AIzaSyBgkDoRhYcjzgevW06THVcJz4qYcYwqd2k",
        authDomain: "klassbook-2df6e.firebaseapp.com",
        projectId: "klassbook-2df6e",
        storageBucket: "klassbook-2df6e.appspot.com",
        messagingSenderId: "619560616561",
        appId: "1:619560616561:web:5c80e5ae65f9635d3b91d0",
        measurementId: "G-PPPYX19L4P"
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
