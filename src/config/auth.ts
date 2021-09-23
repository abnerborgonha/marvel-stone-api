export default {
  jwt: {
    secret: process.env.API_SECRET || 'super secret hash',
    expiresIn: '1d'
  }
}
