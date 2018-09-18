import Sequelize from "sequelize";

export default {
  PORT: process.env.PORT || 3030,
  JWT_SECRET:
    process.env.JWT_SECRET || "ckmksadii8jrei8riwe3897547fjujrf928r32",
  DB: {
    DB_NAME: process.env.DB_NAME || "slack",
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASS: process.env.DB_PASS || "postgres",
    OPTIONS: process.env.OPTIONS || {
      dialect: "postgres",
      operatorsAliases: Sequelize.Op,
      logging: false,
      define: {
        underscored: true
      }
    }
  }
};