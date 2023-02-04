"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
exports.AuthService = void 0;

var core_1 = require("@angular/core");

var firebase = require("firebase/compat/app"); // import firebase from 'firebase/app';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


var rxjs_1 = require("rxjs");

var operators_1 = require("rxjs/operators");

var AuthService =
/** @class */
function () {
  function AuthService(afAuth, afs, router, api, storage) {
    var _this = this;

    this.afAuth = afAuth;
    this.afs = afs;
    this.router = router;
    this.api = api;
    this.storage = storage;
    this.user$ = this.afAuth.authState.pipe(operators_1.switchMap(function (user) {
      // Logged in
      if (user) {
        return _this.afs.doc("users/" + user.uid).valueChanges();
      } else {
        // Logged out
        return rxjs_1.of(null);
      }
    }));
  }

  AuthService.prototype.googleSignin = function () {
    return __awaiter(this, void 0, void 0, function () {
      var provider, credential;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            provider = new firebase["default"].auth.GoogleAuthProvider(); //console.log(provider, 'provider');

            return [4
            /*yield*/
            , this.afAuth.signInWithPopup(provider)];

          case 1:
            credential = _a.sent();
            this.logintype = 'google';
            return [2
            /*return*/
            , this.updateUserData(credential.user, this.logintype)];
        }
      });
    });
  };

  AuthService.prototype.facebookSignin = function () {
    return __awaiter(this, void 0, void 0, function () {
      var provider, credential;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            provider = new firebase["default"].auth.FacebookAuthProvider();
            return [4
            /*yield*/
            , this.afAuth.signInWithPopup(provider)];

          case 1:
            credential = _a.sent();
            this.logintype = 'facebook';
            return [2
            /*return*/
            , this.updateUserData(credential.user, this.logintype)];
        }
      });
    });
  };

  AuthService.prototype.appleSignin = function () {
    return __awaiter(this, void 0, void 0, function () {
      var provider, credential;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            provider = new firebase["default"].auth.OAuthProvider('apple.com'); //console.log(provider, 'provider');

            return [4
            /*yield*/
            , this.afAuth.signInWithPopup(provider)];

          case 1:
            credential = _a.sent();
            this.logintype = 'apple'; //console.log(credential, 'appple');

            return [2
            /*return*/
            , this.updateUserData(credential.user, this.logintype)];
        }
      });
    });
  };

  AuthService.prototype.updateUserData = function (user, logintype) {
    // Sets user data to firestore on login
    var userRef = this.afs.doc("users/" + user.uid);
    var data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      loginT: logintype
    };
    this.socialLogin(data);
    return userRef.set(data, {
      merge: true
    });
  };

  AuthService.prototype.socialLogin = function (data) {
    var _this = this;

    var requestData = {};
    var lat = 0.00;
    var _long = 0.00;
    requestData["name"] = data.displayName;
    requestData["email"] = data.email;
    requestData["password"] = '123456';
    requestData["lat"] = lat;
    requestData["long"] = _long;
    requestData["logintype"] = data.loginT;
    requestData["type"] = "student";
    this.api.post("sociallogin", requestData).subscribe(function (res) {
      //console.log(res, 'sociallogin');
      if (res.status == true) {
        _this.api.alert("you have sucessfully signed up in Klassbook", "success"); // localStorage.clear();


        _this.storage.setToken(res.token);

        _this.storage.setData(res.data, res.classData);

        _this.router.navigate([""]);
      } else {
        _this.api.alert(res.message, "error");
      }
    });
  };

  AuthService.prototype.signOut = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.afAuth.signOut()];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  AuthService = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], AuthService);
  return AuthService;
}();

exports.AuthService = AuthService;