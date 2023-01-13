declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;

NODE_ENV:string;

PORT:string;

JWT_SECRET:string;

REFRESH_TOKEN_SECRET:string;

CLOUDINARY_CLOUD_NAME:string;
CLOUDINARY_API_KEY:string;
CLOUDINARY_API_SECRET:string
    }
  }
}
declare var process : {
  env: {
    MONGO_URI: string;

    NODE_ENV:string;
    
    PORT:string;
    
    JWT_SECRET:string;
    
    REFRESH_TOKEN_SECRET:string;
    
    CLOUDINARY_CLOUD_NAME:string;
    CLOUDINARY_API_KEY:string;
    CLOUDINARY_API_SECRET:string
  }
}
export {}