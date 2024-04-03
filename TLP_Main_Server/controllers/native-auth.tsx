import React, {useState, useCallback, useMemo} from 'react';
import {Alert} from 'react-native';
import {
  AuthConfiguration,
  RegistrationConfiguration,
  AuthorizeResult,
  prefetchConfiguration,
  authorize,
  refresh,
  revoke,
  register,
  logout,
} from 'react-native-app-auth';
import {default as DiscoverDocument} from '../config/Discovery_Document.json';
import {default as ServiceAccount} from '../config/Service_Account.json';
// type State = {
//     hasLoggedInOnce: boolean,
//     accessToken?: string,
//     accessTokenExpirationDate?: string,
//     authorizeAdditionalParameters?: object | null | undefined,
//     idToken?: string,
//     refreshToken?: string,
//     tokenType?: string,
//     scopes?: string[],
//     authorizationCode?: string,
//     codeVerifier?: string,
// };

// accessToken - (string) the access token
// accessTokenExpirationDate - (string) the token expiration date
// authorizeAdditionalParameters - (Object) additional url parameters from the authorizationEndpoint response.
// tokenAdditionalParameters - (Object) additional url parameters from the tokenEndpoint response.
// idToken - (string) the id token
// refreshToken - (string) the refresh token
// tokenType - (string) the token type, e.g. Bearer
// scopes - ([string]) the scopes the user has agreed to be granted
// authorizationCode - (string) the authorization code (only if skipCodeExchange=true)
// codeVerifier - (string) the codeVerifier value used for the PKCE exchange (only if both skipCodeExchange=true and usePKCE=true)

const config: AuthConfiguration = {
  issuer: DiscoverDocument.issuer,
  clientId: ServiceAccount.client_id,
  redirectUrl: '', // TODO: create or find redirect url in Firebase or Google
  scopes: ['openid', 'profile', 'email', 'offline_access'], // no offline_access for server version
  additionalParameters: {},
  connectionTimeoutSeconds: 5,
  iosPrefersEphemeralSession: false,
  serviceConfiguration: {
    authorizationEndpoint: DiscoverDocument.authorization_endpoint,
    tokenEndpoint: DiscoverDocument.token_endpoint,
    revocationEndpoint: DiscoverDocument.revocation_endpoint,
    registrationEndpoint: '',
    endSessionEndpoint: '',
  },
};
// serviceConfiguration configured to save on round trip or allow for auto discovery?
// issuer: 'https://accounts.google.com',
// clientId: 'GOOGLE_OAUTH_APP_GUID.apps.googleusercontent.com',
// redirectUrl: 'com.googleusercontent.apps.GOOGLE_OAUTH_APP_GUID:/oauth2redirect/google', // needs to be configured in client's API Console

const registerConfig: RegistrationConfiguration = {
  issuer: DiscoverDocument.issuer,
  redirectUrls: ['<YOUR_REDIRECT_URL>', '<YOUR_OTHER_REDIRECT_URL>'],
};

type newAuthorizeResult = AuthorizeResult & {hasLoggedInOnce: boolean};

// library or function or attribute or js technique to make immutable and persistent state
// or maybe not, it may need to change on new request and is only needed once
const resultAuth: newAuthorizeResult = {
  hasLoggedInOnce: false,
  accessToken: '',
  accessTokenExpirationDate: '',
  authorizeAdditionalParameters: {},
  idToken: '',
  refreshToken: '',
  tokenType: '',
  scopes: [],
  authorizationCode: '',
  codeVerifier: '',
};

React.useEffect(() => {
  prefetchConfiguration({
    warmAndPrefetchChrome: true,
    connectionTimeoutSeconds: 5,
    ...config,
  });
});

// config
// This is your configuration object for the client. The config is passed into each of the methods with optional overrides.

// issuer - (string) base URI of the authentication server. If no serviceConfiguration (below) is provided, issuer is a mandatory field, so that the configuration can be fetched from the issuer's OIDC discovery endpoint.
// serviceConfiguration - (object) you may manually configure token exchange endpoints in cases where the issuer does not support the OIDC discovery protocol, or simply to avoid an additional round trip to fetch the configuration. If no issuer (above) is provided, the service configuration is mandatory.
// authorizationEndpoint - (string) REQUIRED fully formed url to the OAuth authorization endpoint
// tokenEndpoint - (string) REQUIRED fully formed url to the OAuth token exchange endpoint
// revocationEndpoint - (string) fully formed url to the OAuth token revocation endpoint. If you want to be able to revoke a token and no issuer is specified, this field is mandatory.
// registrationEndpoint - (string) fully formed url to your OAuth/OpenID Connect registration endpoint. Only necessary for servers that require client registration.
// endSessionEndpoint - (string) fully formed url to your OpenID Connect end session endpoint. If you want to be able to end a user's session and no issuer is specified, this field is mandatory.
// clientId - (string) REQUIRED your client id on the auth server
// clientSecret - (string) client secret to pass to token exchange requests. ⚠️ Read more about client secrets
// redirectUrl - (string) REQUIRED the url that links back to your app with the auth code
// scopes - (array<string>) the scopes for your token, e.g. ['email', 'offline_access'].
// additionalParameters - (object) additional parameters that will be passed in the authorization request. Must be string values! E.g. setting additionalParameters: { hello: 'world', foo: 'bar' } would add hello=world&foo=bar to the authorization request.
// clientAuthMethod - (string) ANDROID Client Authentication Method. Can be either basic (default) for Basic Authentication or post for HTTP POST body Authentication
// dangerouslyAllowInsecureHttpRequests - (boolean) ANDROID whether to allow requests over plain HTTP or with self-signed SSL certificates. ⚠️ Can be useful for testing against local server, should not be used in production. This setting has no effect on iOS; to enable insecure HTTP requests, add a NSExceptionAllowsInsecureHTTPLoads exception to your App Transport Security settings.
// customHeaders - (object) ANDROID you can specify custom headers to pass during authorize request and/or token request.
// authorize - ({ [key: string]: value }) headers to be passed during authorization request.
// token - ({ [key: string]: value }) headers to be passed during token retrieval request.
// register - ({ [key: string]: value }) headers to be passed during registration request.
// additionalHeaders - ({ [key: string]: value }) IOS you can specify additional headers to be passed for all authorize, refresh, and register requests.
// useNonce - (boolean) (default: true) optionally allows not sending the nonce parameter, to support non-compliant providers. To specify custom nonce, provide it in additionalParameters under the nonce key.
// usePKCE - (boolean) (default: true) optionally allows not sending the code_challenge parameter and skipping PKCE code verification, to support non-compliant providers.
// skipCodeExchange - (boolean) (default: false) just return the authorization response, instead of automatically exchanging the authorization code. This is useful if this exchange needs to be done manually (not client-side)
// iosCustomBrowser - (string) (default: undefined) IOS override the used browser for authorization, used to open an external browser. If no value is provided, the SFAuthenticationSession or SFSafariViewController are used.
// iosPrefersEphemeralSession - (boolean) (default: false) IOS indicates whether the session should ask the browser for a private authentication session.
// androidAllowCustomBrowsers - (string[]) (default: undefined) ANDROID override the used browser for authorization. If no value is provided, all browsers are allowed.
// androidTrustedWebActivity - (boolean) (default: false) ANDROID Use EXTRA_LAUNCH_AS_TRUSTED_WEB_ACTIVITY when opening web view.
// connectionTimeoutSeconds - (number) configure the request timeout interval in seconds. This must be a positive number. The default values are 60 seconds on iOS and 15 seconds on Android.

// serviceConfiguration - (object) you may manually configure token exchange endpoints in cases where the issuer does not support the OIDC discovery protocol, or simply to avoid an additional round trip to fetch the configuration. If no issuer (above) is provided, the service configuration is mandatory.
// authorizationEndpoint - (string) REQUIRED fully formed url to the OAuth authorization endpoint
// tokenEndpoint - (string) REQUIRED fully formed url to the OAuth token exchange endpoint
// revocationEndpoint - (string) fully formed url to the OAuth token revocation endpoint. If you want to be able to revoke a token and no issuer is specified, this field is mandatory.
// registrationEndpoint - (string) fully formed url to your OAuth/OpenID Connect registration endpoint. Only necessary for servers that require client registration.
// endSessionEndpoint - (string) fully formed url to your OpenID Connect end session endpoint. If you want to be able to end a user's session and no issuer is specified, this field is mandatory.

// State is unnecessary because of AuthorizeResult - decide

// pass only the parameters that the function needs: config***
// object vs rest parameter
// declaration merge or intersection?

export default class authNative extends React.Component {
  handleRegistration = async () => {
    try {
      const resultRegister = await register(registerConfig);
      console.log('User has been registered');
    } catch (error) {
      console.error(error);
    }
  };

  // const [newResultAuth, setNewResultAuth] = useState<Object>(resultAuth);

  handleAuthorize = async () => {
    try {
      // setNewResultAuth({...resultAuth});
      const resultAuth = await authorize(config);

      // result or if class push state and database to log access
      console.log('User has been authenticated');
      return resultAuth;
    } catch (error) {
      // setup database to log error
      console.error(error);
    }
  };

  handleRefresh = async () => {
    try {
      const resultRefresh = await refresh(config, {
        refreshToken: resultAuth.refreshToken,
      });
      console.log('User has been refreshed token.');
    } catch (error) {
      console.error(error);
    }
  };

  handleRevoke = async () => {
    try {
      const resultRevoke = await revoke(config, {
        tokenToRevoke: resultAuth.accessToken || resultAuth.refreshToken,
        includeBasicAuth: true,
        sendClientId: true,
      });
      console.log('User has been revoked');
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSignOut = async () => {
  //     try {
  //     const resultSignOut = await signout(config);
  //     console.log('User signed out');
  //     } catch (error) {
  //     console.error(error);
  //     }
  // };

  handleLogOut = async () => {
    try {
      const resultLogOut = await logout(config, {
        idToken: resultAuth.idToken,
        postLogoutRedirectUrl:
          'privide url to send user back to home if not done automatically write conditional statement or statement '
      });
      console.log('User signed out');
    } catch (error) {
      console.error(error);
    }
  };
}
