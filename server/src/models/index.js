import Sequelize from "sequelize";
import config from "../../config";

const sequelize = new Sequelize(
  config.DB.DB_NAME,
  config.DB.DB_USER,
  config.DB.DB_PASS,
  config.DB.OPTIONS
);

const models = {
  User: sequelize.import("./User"),
  Channel: sequelize.import("./Channel"),
  Team: sequelize.import("./Team"),
  Member: sequelize.import("./Member"),
  PrivateChannelMember: sequelize.import("./PrivateChannelMember"),
  ChannelMessage: sequelize.import("./ChannelMessage"),
  DirectMessage: sequelize.import("./DirectMessage")
};

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
