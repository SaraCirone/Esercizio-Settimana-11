import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-login',
    template: `
    <div id="login" class="container-fluid" [ngStyle]="{'background' : 'url(././assets/img/netflix-ultime-uscite.webp)'}">
        <div class="container d-flex justify-content-center">
            <div class="container text-center" id="card-login">
                <h3 class="text-white mb-4">Log-in</h3>
                <form #form="ngForm" (ngSubmit)="accedi(form)">
                    <div class="mb-3 fomr-group">
                        <label for="email" class="form-label text-white mb-3">Email address</label>
                        <input type="email" name="email" class="form-control" id="email" required ngModel>
                    </div>
                    <div class="mb-3 form-group">
                        <label for="password" class="form-label text-white mb-3">Password</label>
                        <input name="password" type="password" class="form-control" id="password" required ngModel>
                    </div>
                    <button type="submit" class="btn btn-danger mb-4 mt-3" [disabled]="form.invalid">Login</button>
                </form>
                <div class="text-white">
                    <p>Non sei registrato? Registrati ora <a [routerLink]="['/register']" class="text-danger"> clicca qui</a></p>
                </div>
            </div>
        </div>
    </div>
  `,
    styles: [
        '#login { width: 100%; height: 100vh; }',
        '#card-login{ margin-top: 220px; background-color: rgba(0, 0, 0, 0.9); padding: 50px; margin-left: 250px; margin-right: 250px; }'
    ]
})
export class LoginComponent implements OnInit {

    isLoading = false

    constructor(private authSrv: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    async accedi(form: NgForm) {
        this.isLoading = true
        try {
          await this.authSrv.login(form.value).toPromise()
          this.router.navigate(['']);
        } catch (error) {
            this.isLoading = false
            console.error(error)
        }
      }

}
