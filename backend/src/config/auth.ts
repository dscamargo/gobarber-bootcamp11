export default {
  jwt: {
    secret: process.env.APP_SECRET || 'secretForTests',
    expiresIn: process.env.EXPIRES_IN || '1m',
  },
};
