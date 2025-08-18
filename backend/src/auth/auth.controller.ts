import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import type { AuthenticatedRequest } from 'src/common/types/request.types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const user = req.user;
    const token = this.authService.generateJwtToken(user);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
