declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    PAGARME_API_URL: string;
    PAGARME_API_TOKEN: string;
  }
}
