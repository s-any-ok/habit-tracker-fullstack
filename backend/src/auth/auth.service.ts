import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities';

type GoogleUser = {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: GoogleUser): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { googleId: googleUser.googleId },
    });

    if (!user) {
      user = await this.userRepository.findOne({
        where: { email: googleUser.email },
      });

      if (user) {
        user.googleId = googleUser.googleId;
        user.avatar = googleUser.avatar;
        await this.userRepository.save(user);
      } else {
        user = this.userRepository.create(googleUser);
        await this.userRepository.save(user);
      }
    }

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  generateJwtToken(user: User): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
