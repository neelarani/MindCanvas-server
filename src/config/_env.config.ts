import { envsafe, str, num, bool } from "envsafe";

export const ENV = envsafe({
  PORT: num({ default: 3000 }),
  NODE_ENV: str({ choices: ["development", "production"] }),
  DATABASE_URL: str(),
});
