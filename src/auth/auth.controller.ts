import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sing-in.dto';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'signIn' })
  signin(@Payload() createAuthDto: SignInDto) {
    return this.authService.signin(createAuthDto);
  } 

  
}
 