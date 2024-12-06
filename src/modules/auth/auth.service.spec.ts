import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { expect } from '@jest/globals';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserService = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'test-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return user object when credentials are valid', async () => {
      const mockUser = {
        id: 'test-uuid',
        username: 'testuser',
        password: await bcrypt.hash('password123', 10),
      };

      mockUserService.findOne.mockResolvedValue(mockUser);

      const result = await authService.validateUser('testuser', 'password123');
      expect(result).toBeDefined();
      expect(result.username).toBe('testuser');
    });

    it('should return null when credentials are invalid', async () => {
      const mockUser = {
        id: 'test-uuid',
        username: 'testuser',
        password: await bcrypt.hash('password123', 10),
      };

      mockUserService.findOne.mockResolvedValue(mockUser);

      const result = await authService.validateUser(
        'testuser',
        'wrongpassword',
      );
      expect(result).toBeNull();
    });
  });
});
