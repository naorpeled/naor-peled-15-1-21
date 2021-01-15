import { registerAs } from '@nestjs/config';

export default registerAs('global', () => ({
  base_url: process.env.BASE_URL || 'http://localhost:8000',
}));
