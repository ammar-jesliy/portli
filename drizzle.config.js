/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://Portli_owner:ais2vqlfC1BV@ep-ancient-block-a1cl32er.ap-southeast-1.aws.neon.tech/Portli?sslmode=require",
    }
  };