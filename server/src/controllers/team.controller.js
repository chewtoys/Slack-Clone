import models from "../models";

const userSummary = user => {
  const summary = {
    username: user.username,
    email: user.email
  };
  return summary;
};

export default {
  create: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const teamName = req.body.name;
      const response = await models.sequelize.transaction(async transaction => {
        const teamData = await models.Team.create(
          {
            name: teamName
          },
          { transaction }
        );
        const team = teamData.dataValues;
        await models.Channel.create(
          {
            name: "general",
            public: true,
            teamId: team.id
          },
          { transaction }
        );
        await models.Member.create(
          {
            teamId: team.id,
            userId: currentUserId,
            admin: true
          },
          { transaction }
        );
        return team;
      });
      console.log(response);
      res.status(200).send({
        team: response
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  addTeamMember: async (req, res) => {
    try {
      // req.user is retreived from bearer token of auth.policy
      const currentUserId = req.user.id;
      const teamId = req.body;
      const targetUserEmail = req.body;
      console.log(req.body);
      const memberPromise = models.Member.findOne(
        { where: { teamId, currentUserId } },
        { raw: true }
      );
      const userToAddPromise = models.User.findOne(
        { where: { email: targetUserEmail } },
        { raw: true }
      );
      const [member, userToAdd] = await Promise.all([
        memberPromise,
        userToAddPromise
      ]);
      if (!member.admin) {
        return res.status(403).send({
          error: "you are can not add members to the team"
        });
      }
      if (!userToAdd) {
        return res.status(403).send({
          error: "user does not exist"
        });
      }
      await models.Member.create({ userId: userToAdd.id, teamId });
      const team = await models.Team.find({ where: { id: teamId } });
      res.status(200).send({
        team
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "server error"
      });
    }
  },
  getTeamMembers: async (req, res) => {
    try {
      const teamId = req.body;
      console.log(req.body);

      const teamMembers = await models.sequelize.query(
        "select * from users as u join members as m on m.user_id = u.id where m.team_id = ?",
        {
          replacements: [teamId],
          model: models.User,
          raw: true
        }
      );
      console.log(teamMembers);
      res.status(200).send({
        teamMembers
      });
    } catch (err) {
      console.log(err);
    }
  }
};
