//Xử lý đăng nhập thông qua mxh
const GoogleStrategy = require("passport-google-oidc").Strategy;
const model = require("../models/index");
const Provider = model.provider;
const User = model.User;
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  async (issuer, profile, req, done) => {
    console.log(issuer);
    console.log("pờ rồ phai", profile);
    const { displayName, emails } = profile;
    const [{ value: email }] = emails;
    console.log("user:", req);
    console.log("done", done);

    const provider = "google";
    let providerDetail = await Provider.findOne({
      where: {
        name: provider,
      },
    });
    let providerId;
    if (!providerDetail) {
      providerDetail = await Provider.create({
        name: provider,
      });
    }
    providerId = providerDetail.id;
    let user = await User.findOne({
      where: {
        email,
        providerId: providerId,
      },
    });
    if (!user) {
      user = await User.create({
        name: displayName,
        email,
        providerId: providerId,
      });
    }
    return done(null, user);
  }
);
