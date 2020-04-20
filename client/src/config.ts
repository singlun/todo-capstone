//Configuration setting for API Endpoints
//Please aware that Endpoints may Varies due to the Platform
//user is using. This system supports Version Controling. For example if
//user selects Version 1, PLEASE MODIFY THE v0 FLAG at the end of the API Endpoint.
//For exapmle Version 1 Endpoint will be http://localhost:8080/api/v1

export const apiEndpoint = `http://localhost:8080/api/v0`

//Alan Added For Testing on Oracle Virtual ToolBox
//export const apiEndpoint = `http://192.168.99.103:8080/api/v0`

//Andrew
// export const authConfig = {
//   // TODO: Create an Auth0 application and copy values from it into this map
//   domain: 'dev-lpxl6oat.auth0.com',            // Auth0 domain
//   clientId: 'rxGPps1mDFEGXC4yohdv0veZS2xoTJ9u',          // Auth0 client id
//   callbackUrl: 'http://localhost:3000/callback' 
// }


//Alan Added For Setting Auth0 Config on Alan's Account
export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-rs5nalxx.auth0.com',            // Auth0 domain
  clientId: 'u6BY3FPD2gffgE5GpnswxwyP26jmzsJ9',          // Auth0 client id
  //callbackUrl: `http://192.168.99.103:3000/callback`
  callbackUrl: `http://localhost:3000/callback`
}
