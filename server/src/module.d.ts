declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string;
    DB_URL: string;
    MONGO_URI:string;
  }
}