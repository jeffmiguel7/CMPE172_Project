export default {
  oidc: {
    clientId: '0oaiftouz20k2Xk6A356',
    issuer: 'https://dev-630184.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/implicit/callback',
    scope: 'openid profile email groups',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
