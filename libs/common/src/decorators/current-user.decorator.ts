import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const currentUser = createParamDecorator((
    data, context: ExecutionContext 
) => {
    return context.switchToHttp().getRequest().user
})