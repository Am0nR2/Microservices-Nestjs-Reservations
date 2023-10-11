import { CanActivate, ExecutionContext, HttpStatus, Inject, UnauthorizedException } from "@nestjs/common";
import { Observable, lastValueFrom } from "rxjs";
import { AUTH_SERVICE } from "../constants";
import { ClientProxy } from "@nestjs/microservices";

export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authClient: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const jwt = req?.headers?.authorization?.split("Bearer ")[1];

    if (!jwt) {
      return false;
    }
    
    try {
        const response = await lastValueFrom(this.authClient.send("authenticate", {
           Authorization : jwt
        }))
        req.user = response
        return true
    } catch (error) {
        throw new UnauthorizedException({
            msg : "Please sign in again,",
            info : "JWT is invalid",
            status : HttpStatus.UNAUTHORIZED
        })
    }
  }
}



// import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
// import { Observable, map, tap } from "rxjs";
// import { AUTH_SERVICE } from "../constants";
// import { ClientProxy } from "@nestjs/microservices";

// export class JwtAuthGuard implements CanActivate{
//     constructor(
//         @Inject(AUTH_SERVICE)
//         private readonly authClient : ClientProxy
//     ){}

//     async canActivate(context: ExecutionContext){
//         const req = context.switchToHttp().getRequest()

//         const jwt = req?.headers?.authorization?.split("Bearer ")[1]
//         console.log(jwt)
//         if(!jwt) return false

//         return this.authClient
//         .send("authenticate", { Authorization: jwt }) 
//         .pipe(
//             tap((res) => {
//                 if (res) {
//                     context.switchToHttp().getRequest().user = res;
//                 }
//             }),
//             map((res) => !!res) // Return true if res is truthy (authentication succeeded)
//         )
//         .toPromise() // Convert Observable to Promise for canActivate
//         .catch((error) => {
//             console.error("Error communicating with authService:", error);
//             return false; // Return false in case of an error
//         });
        
//         return true
//         // console.log(x)
//         // return true
     
//     }
// }