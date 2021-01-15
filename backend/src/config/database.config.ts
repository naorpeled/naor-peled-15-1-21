import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.RDS_HOSTNAME || 'localhost',
  port: process.env.RDS_PORT || 3306,
  username: process.env.RDS_USERNAME || 'root',
  password: process.env.RDS_PASSWORD || 'root',
  database: process.env.RDS_DB_NAME || 'messages_assignment',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: process.env.TYPEORM_SYNC || false,
  logging: process.env.TYPEORM_LOG || false,
}));
