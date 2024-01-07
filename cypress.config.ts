import { defineConfig } from "cypress";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");

const envLocal = dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

export default defineConfig({
  e2e: {
    env: {
      apiUrl: envLocal.parsed["NEXT_PUBLIC_API_URL"],
      testUsername: envLocal.parsed["CYPRESS_TEST_USERNAME"],
      testPassword: envLocal.parsed["CYPRESS_TEST_PASSWORD"],
    },
  },
});
