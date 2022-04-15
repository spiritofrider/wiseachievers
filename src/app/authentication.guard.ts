import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "./services/commonservice";
import { StorageService } from "./services/storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private common: CommonService,
    private storageService: StorageService
  ) {}
  canActivate(): boolean {
    const decryptCookie = this.common.tokenDecryption(
      this.storageService.getCookie("token")
    );
    if (decryptCookie?.["isAdmin"]) {
      return true;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationGuardTest implements CanActivate {
  constructor(
    private common: CommonService,
    private storageService: StorageService,
    private router: Router
  ) {}
  canActivate(): boolean {
    const decryptCookie = this.common.tokenDecryption(
      this.storageService.getCookie("token")
    );
    if (decryptCookie?.["activateAccount"]) {
      return true;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class Redirection implements CanActivate {
  constructor(
    private common: CommonService,
    private storageService: StorageService,
    private router: Router
  ) {}
  canActivate(): boolean {
    const decryptCookie = this.common.tokenDecryption(
      this.storageService.getCookie("token")
    );
    if (decryptCookie?.["activateAccount"]) {
      this.router.navigate(["base/test"]);
    }
    return true;
  }
}
