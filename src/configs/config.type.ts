export type Config = {
  app: AppConfig;
  database: PostgresConfig;
  redis: RedisConfig;
  aws: AwsConfig;
  jwt: JwtConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
};
export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};
export type AwsConfig = {
  accessKey: string;
  secretKey: string;
  bucketName: string;
  region: string;
  ACL: string;
  endpoint: string;
};
export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};
// export type JwtConfig = {
//   sellerAccessTokenSecret: string;
//   sellerAccessTokenExpiration: number;
//   sellerRefreshTokenSecret: string;
//   sellerRefreshTokenExpiration: number;
//   managerAccessTokenSecret: string;
//   managerAccessTokenExpiration: number;
//   managerRefreshTokenSecret: string;
//   managerRefreshTokenExpiration: number;
//   adminAccessTokenSecret: string;
//   adminAccessTokenExpiration: number;
//   adminRefreshTokenSecret: string;
//   adminRefreshTokenExpiration: number;
//   forgotSecret: string;
//   forgotExpiration: number;
// };
// export type TokenConfig = {
//   accessSecret: string;
//   accessExpiresIn: number;
//   refreshSecret: string;
//   refreshExpiresIn: number;
// };
