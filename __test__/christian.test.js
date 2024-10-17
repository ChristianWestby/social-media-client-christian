import { login } from '../src/js/api/auth/login';
import { logout } from '../src/js/api/auth/logout';
import { save, remove } from '../src/js/storage/index';

// Riktig jest.mock-syntaks
jest.mock('../src/js/storage/index', () => ({
  save: jest.fn(),
  load: jest.fn(() => 'mockToken'),
  remove: jest.fn()
}));

// Mock global.fetch
global.fetch = jest.fn();

describe('Auth Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login function', () => {
    it('should save token to local storage', async () => {
      // Mock vellykket fetch-respons
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          accessToken: 'mockToken',
          name: 'mockName',
        }),
      });

      const profile = await login('mockUsername', 'mockPassword');
      expect(save).toHaveBeenCalledWith('token', 'mockToken');
      expect(save).toHaveBeenCalledWith('profile', { name: 'mockName' });
      expect(profile).toEqual({ name: 'mockName' });
    });

    it('should throw an error if fetch fails', async () => {
      // Mock mislykket fetch-respons
      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized',
      });

      await expect(login('urlost@stud.noroff.no', 'wrongpassword')).rejects.toThrow('Unauthorized');
    });
  });

  describe('logout function', () => {
    it('should remove token from local storage', () => {
      logout();
      expect(remove).toHaveBeenCalledWith('token');
      expect(remove).toHaveBeenCalledWith('profile');
    });
  });
});