import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities';

type GitHubUser = {
  githubId: string;
  username: string;
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

  async validateGitHubUser(githubUser: GitHubUser): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { githubId: githubUser.githubId },
    });

    if (!user) {
      user = await this.userRepository.findOne({
        where: { email: githubUser.email },
      });

      if (user) {
        user.githubId = githubUser.githubId;
        user.avatar = githubUser.avatar;
        user.username = githubUser.username;
        await this.userRepository.save(user);
      } else {
        user = this.userRepository.create({
          githubId: githubUser.githubId,
          username: githubUser.username,
          email: githubUser.email,
          name: githubUser.name,
          avatar: githubUser.avatar,
        });
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
