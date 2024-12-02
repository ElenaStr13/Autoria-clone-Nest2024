import * as process from 'node:process';

import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    host: process.env.APP_HOST,
  },
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    region: process.env.AWS_S3_REGION,
    ACL: process.env.AWS_S3_ACL,
    endpoint: process.env.AWS_S3_ENDPOINT,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
  },
  // jwt: {
  //   sellerAccessTokenSecret: process.env.SELLER_ACCESS_TOKEN_SECRET,
  //   sellerAccessTokenExpiration:
  //     parseInt(process.env.SELLER_ACCESS_TOKEN_EXPIRATION, 10) || 3600,
  //   sellerRefreshTokenSecret: process.env.SELLER_REFRESH_TOKEN_SECRET,
  //   sellerRefreshTokenExpiration:
  //     parseInt(process.env.SELLER_REFRESH_TOKEN_EXPIRATION, 10) || 3600,
  //   managerAccessTokenSecret: process.env.MANAGER_ACCESS_TOKEN_SECRET,
  //   managerAccessTokenExpiration:
  //     parseInt(process.env.MANAGER_ACCESS_TOKEN_EXPIRATION, 10) || 3600,
  //   managerRefreshTokenSecret: process.env.MANAGER_REFRESH_TOKEN_SECRET,
  //   managerRefreshTokenExpiration:
  //     parseInt(process.env.MANAGER_REFRESH_TOKEN_EXPIRATION, 10) || 3600,
  //   adminAccessTokenSecret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
  //   adminAccessTokenExpiration:
  //     parseInt(process.env.ADMIN_ACCESS_TOKEN_EXPIRATION, 10) || 3600,
  //   adminRefreshTokenSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
  //   adminRefreshTokenExpiration:
  //     parseInt(process.env.ADMIN_REFRESH_TOKEN_EXPIRATION, 10) || 3600,
  //   forgotSecret: process.env.FORGOT_TOKEN_SECRET,
  //   forgotExpiration: parseInt(process.env.FORGOT_TOKEN_EXPIRATION, 10) || 3600,
  // },
});
