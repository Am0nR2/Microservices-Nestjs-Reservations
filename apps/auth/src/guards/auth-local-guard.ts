import { AuthGuard } from "@nestjs/passport";

export class AuthLocalGuard extends AuthGuard("local"){}