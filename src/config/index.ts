import path from "node:path";
import * as dotenv from "dotenv";
import dotEnvExpand from "dotenv-expand";
import { cleanEnv, num, str } from "envalid";

const envFilePath = path.resolve(process.cwd(), ".env");
const fileEnv = dotEnvExpand.expand(dotenv.config({ path: envFilePath }));
const appEnv = { ...fileEnv.parsed, ...process.env };

const env = cleanEnv(appEnv, {
  HTTP_PORT: num({ desc: "APO port" }),
  MONGO_URI: str({ desc: "MongoDB uri connection string" }),
  TIMEZONE: str({ desc: "Timezone" }),
});

export type IConfig = {
  http: {
    port: number;
  };
  mongo: {
    uri: string;
  };
  timezone: string;
};

export const configVars: IConfig = {
  http: {
    port: env.HTTP_PORT,
  },
  mongo: {
    uri: env.MONGO_URI,
  },
  timezone: env.TIMEZONE,
};