(this.webpackJsonpbusinesscardsfront=this.webpackJsonpbusinesscardsfront||[]).push([[6],{462:function(e,t,n){"use strict";n.r(t),n.d(t,"amplify_federated_buttons",(function(){return _})),n.d(t,"amplify_strike",(function(){return c}));var a=n(15),r=n(40),o=n(498),i=n(451),E=(n(497),n(496)),u=n(499),_=function(){function e(e){Object(a.k)(this,e),this.authState=o.a.SignIn,this.federated={},this.handleAuthStateChange=u.d}return e.prototype.componentWillLoad=function(){if(!i.a||"function"!==typeof i.a.configure)throw new Error(E.d);var e=i.a.configure().oauth,t=void 0===e?{}:e;t.domain?this.federated.oauthConfig=Object.assign(Object.assign({},this.federated.oauthConfig),t):t.awsCognito&&(this.federated.oauthConfig=Object.assign(Object.assign({},this.federated.oauthConfig),t.awsCognito)),t.auth0&&(this.federated.auth0Config=Object.assign(Object.assign({},this.federated.auth0Config),t.auth0))},e.prototype.render=function(){if(!Object.values(o.a).includes(this.authState))return null;if(Object(r.c)(this.federated))return null;var e=this.federated,t=e.amazonClientId,n=e.auth0Config,i=e.facebookAppId,E=e.googleClientId,u=e.oauthConfig;return Object(a.i)("div",null,E&&Object(a.i)("div",null,Object(a.i)("amplify-google-button",{clientId:E,handleAuthStateChange:this.handleAuthStateChange})),i&&Object(a.i)("div",null,Object(a.i)("amplify-facebook-button",{appId:i,handleAuthStateChange:this.handleAuthStateChange})),t&&Object(a.i)("div",null,Object(a.i)("amplify-amazon-button",{clientId:t,handleAuthStateChange:this.handleAuthStateChange})),u&&Object(a.i)("div",null,Object(a.i)("amplify-oauth-button",{config:u})),n&&Object(a.i)("div",null,Object(a.i)("amplify-auth0-button",{config:n,handleAuthStateChange:this.handleAuthStateChange})))},e}(),c=function(){function e(e){Object(a.k)(this,e)}return e.prototype.render=function(){return Object(a.i)("span",{class:"strike-content"},Object(a.i)("slot",null))},e}();c.style=".sc-amplify-strike-h{--color:var(--amplify-grey);--border-color:var(--amplify-light-grey);--content-background:var(--amplify-white);display:block;width:100%;text-align:center;border-bottom:1px solid var(--border-color);line-height:0.1em;margin:32px 0;color:var(--color)}.strike-content.sc-amplify-strike{background:var(--content-background);padding:0 25px;font-size:var(--amplify-text-sm);font-weight:500}"},495:function(e,t,n){"use strict";var a=n(451);n(19);t.a=a.a},496:function(e,t,n){"use strict";n.d(t,"a",(function(){return O})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return r})),n.d(t,"d",(function(){return l})),n.d(t,"e",(function(){return s})),n.d(t,"f",(function(){return C})),n.d(t,"g",(function(){return T})),n.d(t,"h",(function(){return S})),n.d(t,"i",(function(){return i})),n.d(t,"j",(function(){return d})),n.d(t,"k",(function(){return A})),n.d(t,"l",(function(){return L})),n.d(t,"m",(function(){return f})),n.d(t,"n",(function(){return _})),n.d(t,"o",(function(){return c})),n.d(t,"p",(function(){return o})),n.d(t,"q",(function(){return E})),n.d(t,"r",(function(){return a}));var a="username",r="email",o="code",i="phone",E="password",u="country-dial-code-select",_="+1",c="amplify-auth-source",s="Phone number can not be empty",l="No Auth module found, please ensure @aws-amplify/auth is imported",A="No Storage module found, please ensure @aws-amplify/storage is imported",d="No Interactions module found, please ensure @aws-amplify/interactions is imported",L="User has not set up software token mfa",f="User has not verified software token mfa",O="auth",T="UI Auth",C="ToastAuthError",S="AuthStateChange"},497:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a,r,o=n(23);!function(e){e.BACK_TO_SIGN_IN="Back to Sign In",e.CHANGE_PASSWORD_ACTION="Change",e.CHANGE_PASSWORD="Change Password",e.CODE_LABEL="Verification code",e.CODE_PLACEHOLDER="Enter code",e.CONFIRM_SIGN_UP_CODE_LABEL="Confirmation Code",e.CONFIRM_SIGN_UP_CODE_PLACEHOLDER="Enter your code",e.CONFIRM_SIGN_UP_HEADER_TEXT="Confirm Sign up",e.CONFIRM_SIGN_UP_LOST_CODE="Lost your code?",e.CONFIRM_SIGN_UP_RESEND_CODE="Resend Code",e.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT="Confirm",e.CONFIRM_SMS_CODE="Confirm SMS Code",e.CONFIRM_TOTP_CODE="Confirm TOTP Code",e.CONFIRM="Confirm",e.CREATE_ACCOUNT_TEXT="Create account",e.EMAIL_LABEL="Email Address *",e.EMAIL_PLACEHOLDER="Enter your email address",e.FORGOT_PASSWORD_TEXT="Forgot your password?",e.LESS_THAN_TWO_MFA_VALUES_MESSAGE="Less than two MFA types available",e.NEW_PASSWORD_LABEL="New password",e.NEW_PASSWORD_PLACEHOLDER="Enter your new password",e.NO_ACCOUNT_TEXT="No account?",e.USERNAME_REMOVE_WHITESPACE="Username cannot contain whitespace",e.PASSWORD_REMOVE_WHITESPACE="Password cannot start or end with whitespace",e.PASSWORD_LABEL="Password *",e.PASSWORD_PLACEHOLDER="Enter your password",e.PHONE_LABEL="Phone Number *",e.PHONE_PLACEHOLDER="(555) 555-1212",e.QR_CODE_ALT="qrcode",e.RESET_PASSWORD_TEXT="Reset password",e.RESET_YOUR_PASSWORD="Reset your password",e.SELECT_MFA_TYPE_HEADER_TEXT="Select MFA Type",e.SELECT_MFA_TYPE_SUBMIT_BUTTON_TEXT="Verify",e.SEND_CODE="Send Code",e.SUBMIT="Submit",e.SETUP_TOTP_REQUIRED="TOTP needs to be configured",e.SIGN_IN_ACTION="Sign In",e.SIGN_IN_HEADER_TEXT="Sign in to your account",e.SIGN_IN_TEXT="Sign in",e.SIGN_IN_WITH_AMAZON="Sign in with Amazon",e.SIGN_IN_WITH_AUTH0="Sign in with Auth0",e.SIGN_IN_WITH_AWS="Sign in with AWS",e.SIGN_IN_WITH_FACEBOOK="Sign in with Facebook",e.SIGN_IN_WITH_GOOGLE="Sign in with Google",e.SIGN_OUT="Sign Out",e.SIGN_UP_EMAIL_PLACEHOLDER="Email",e.SIGN_UP_HAVE_ACCOUNT_TEXT="Have an account?",e.SIGN_UP_HEADER_TEXT="Create a new account",e.SIGN_UP_PASSWORD_PLACEHOLDER="Password",e.SIGN_UP_SUBMIT_BUTTON_TEXT="Create Account",e.SIGN_UP_USERNAME_PLACEHOLDER="Username",e.SUCCESS_MFA_TYPE="Success! Your MFA Type is now:",e.TOTP_HEADER_TEXT="Scan then enter verification code",e.TOTP_LABEL="Enter Security Code:",e.TOTP_ISSUER="AWSCognito",e.TOTP_SETUP_FAILURE="TOTP Setup has failed",e.TOTP_SUBMIT_BUTTON_TEXT="Verify Security Token",e.TOTP_SUCCESS_MESSAGE="Setup TOTP successfully!",e.UNABLE_TO_SETUP_MFA_AT_THIS_TIME="Failed! Unable to configure MFA at this time",e.USERNAME_LABEL="Username *",e.USERNAME_PLACEHOLDER="Enter your username",e.VERIFY_CONTACT_EMAIL_LABEL="Email",e.VERIFY_CONTACT_HEADER_TEXT="Account recovery requires verified contact information",e.VERIFY_CONTACT_PHONE_LABEL="Phone Number",e.VERIFY_CONTACT_SUBMIT_LABEL="Submit",e.VERIFY_CONTACT_VERIFY_LABEL="Verify",e.ADDRESS_LABEL="Address",e.ADDRESS_PLACEHOLDER="Enter your address",e.NICKNAME_LABEL="Nickname",e.NICKNAME_PLACEHOLDER="Enter your nickname",e.BIRTHDATE_LABEL="Birthday",e.BIRTHDATE_PLACEHOLDER="Enter your birthday",e.PICTURE_LABEL="Picture URL",e.PICTURE_PLACEHOLDER="Enter your picture URL",e.FAMILY_NAME_LABEL="Family Name",e.FAMILY_NAME_PLACEHOLDER="Enter your family name",e.PREFERRED_USERNAME_LABEL="Preferred Username",e.PREFERRED_USERNAME_PLACEHOLDER="Enter your preferred username",e.GENDER_LABEL="Gender",e.GENDER_PLACEHOLDER="Enter your gender",e.PROFILE_LABEL="Profile URL",e.PROFILE_PLACEHOLDER="Enter your profile URL",e.GIVEN_NAME_LABEL="First Name",e.GIVEN_NAME_PLACEHOLDER="Enter your first name",e.ZONEINFO_LABEL="Time zone",e.ZONEINFO_PLACEHOLDER="Enter your time zone",e.LOCALE_LABEL="Locale",e.LOCALE_PLACEHOLDER="Enter your locale",e.UPDATED_AT_LABEL="Updated At",e.UPDATED_AT_PLACEHOLDER="Enter the time the information was last updated",e.MIDDLE_NAME_LABEL="Middle Name",e.MIDDLE_NAME_PLACEHOLDER="Enter your middle name",e.WEBSITE_LABEL="Website",e.WEBSITE_PLACEHOLDER="Enter your website",e.NAME_LABEL="Full Name",e.NAME_PLACEHOLDER="Enter your full name",e.PHOTO_PICKER_TITLE="Picker Title",e.PHOTO_PICKER_HINT="Ancillary text or content may occupy this space here",e.PHOTO_PICKER_PLACEHOLDER_HINT="Placeholder hint",e.PHOTO_PICKER_BUTTON_TEXT="Button",e.IMAGE_PICKER_TITLE="Add Profile Photo",e.IMAGE_PICKER_HINT="Preview the image before upload",e.IMAGE_PICKER_PLACEHOLDER_HINT="Tap to image select",e.IMAGE_PICKER_BUTTON_TEXT="Upload",e.PICKER_TEXT="Pick a file",e.TEXT_FALLBACK_CONTENT="Fallback Content",e.CONFIRM_SIGN_UP_FAILED="Confirm Sign Up Failed",e.SIGN_UP_FAILED="Sign Up Failed"}(a||(a={})),function(e){e.CHATBOT_TITLE="ChatBot Lex",e.TEXT_INPUT_PLACEHOLDER="Write a message",e.VOICE_INPUT_PLACEHOLDER="Click mic to speak",e.CHAT_DISABLED_ERROR="Error: Either voice or text must be enabled for the chatbot",e.NO_BOT_NAME_ERROR="Error: Bot name must be provided to ChatBot"}(r||(r={}));var i=Object.assign(Object.assign(Object.assign({},a),o.a),r)},498:function(e,t,n){"use strict";var a,r,o,i,E;n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"d",(function(){return E})),n.d(t,"e",(function(){return i})),function(e){e.SignUp="signup",e.SignOut="signout",e.SignIn="signin",e.Loading="loading",e.SignedOut="signedout",e.SignedIn="signedin",e.SigningUp="signingup",e.ConfirmSignUp="confirmSignUp",e.confirmingSignUpCustomFlow="confirmsignupcustomflow",e.ConfirmSignIn="confirmSignIn",e.confirmingSignInCustomFlow="confirmingsignincustomflow",e.VerifyingAttributes="verifyingattributes",e.ForgotPassword="forgotpassword",e.ResetPassword="resettingpassword",e.SettingMFA="settingMFA",e.TOTPSetup="TOTPSetup",e.CustomConfirmSignIn="customConfirmSignIn",e.VerifyContact="verifyContact"}(a||(a={})),function(e){e.TOTP="TOTP",e.SMS="SMS",e.NOMFA="NOMFA"}(r||(r={})),function(e){e.SoftwareTokenMFA="SOFTWARE_TOKEN_MFA",e.SMSMFA="SMS_MFA",e.NewPasswordRequired="NEW_PASSWORD_REQUIRED",e.MFASetup="MFA_SETUP",e.CustomChallenge="CUSTOM_CHALLENGE"}(o||(o={})),function(e){e.Password="password"}(i||(i={})),function(e){e.username="username",e.email="email",e.phone_number="phone_number"}(E||(E={}))},499:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return O})),n.d(t,"d",(function(){return L})),n.d(t,"e",(function(){return A})),n.d(t,"f",(function(){return S})),n.d(t,"g",(function(){return g})),n.d(t,"h",(function(){return C})),n.d(t,"i",(function(){return T}));var a=n(64),r=n(487),o=n(494),i=n(498),E=n(495),u=n(497),_=n(496),c=function(e,t,n,a){return new(n||(n=Promise))((function(r,o){function i(e){try{u(a.next(e))}catch(t){o(t)}}function E(e){try{u(a.throw(e))}catch(t){o(t)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,E)}u((a=a.apply(e,t||[])).next())}))},s=function(e,t){var n,a,r,o,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:E(0),throw:E(1),return:E(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function E(o){return function(E){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,a&&(r=2&o[0]?a.return:o[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,o[1])).done)return r;switch(a=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,a=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(r=(r=i.trys).length>0&&r[r.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){i.label=o[1];break}if(6===o[0]&&i.label<r[1]){i.label=r[1],r=o;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(o);break}r[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(E){o=[6,E],a=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,E])}}},l=new a.a("helpers"),A=function(e,t){return function n(a){if(!a||a===document||a===window)return null;if(a.matches(e))return t;a.assignedSlot&&(a=a.assignedSlot);var r=a.closest(e);return r||n(a.getRootNode().host)}(t)},d=function(e){r.a.dispatch(_.g,{event:_.f,message:o.a.get(e.message)})},L=function(e,t){r.a.dispatch(_.g,{event:_.h,message:e,data:t})},f=function(e){if(!e.phoneNumberValue)throw new Error(_.e);var t=e.phoneNumberValue.replace(/[-()\s]/g,"");return""+e.countryDialCodeValue+t},O=function(e){if(!(e in i.d))throw new Error("Invalid username Alias - "+e+". Instead use "+Object.values(i.d))},T=function(e){var t=function(t){return c(void 0,void 0,void 0,(function(){var n,a;return s(this,(function(r){switch(r.label){case 0:return n=t.payload,n.event===_.h?[3,1]:[3,8];case 1:if(!n.message)return[3,7];if(n.message!==i.a.SignedIn)return[3,6];r.label=2;case 2:return r.trys.push([2,4,,5]),[4,E.a.currentAuthenticatedUser()];case 3:return a=r.sent(),e(n.message,a),[3,5];case 4:return r.sent(),l.error("User is not authenticated"),[3,5];case 5:return[3,7];case 6:e(n.message,n.data),r.label=7;case 7:return[3,8];case 8:return[2]}}))}))};r.a.listen(_.g,t);return function(){e=function(){},r.a.remove(_.g,t)}},C=function(e){return!(null===e.hint||"string"===typeof e.hint)},S=function(){return{address:{label:o.a.get(u.a.ADDRESS_LABEL),placeholder:o.a.get(u.a.ADDRESS_PLACEHOLDER)},nickname:{label:o.a.get(u.a.NICKNAME_LABEL),placeholder:o.a.get(u.a.NICKNAME_PLACEHOLDER)},birthdate:{label:o.a.get(u.a.BIRTHDATE_LABEL),placeholder:o.a.get(u.a.BIRTHDATE_PLACEHOLDER)},phone_number:{label:o.a.get(u.a.PHONE_LABEL),placeholder:o.a.get(u.a.PHONE_PLACEHOLDER)},email:{lable:o.a.get(u.a.EMAIL_LABEL),placeholder:o.a.get(u.a.EMAIL_PLACEHOLDER)},picture:{label:o.a.get(u.a.PICTURE_LABEL),placeholder:o.a.get(u.a.PICTURE_PLACEHOLDER)},family_name:{label:o.a.get(u.a.FAMILY_NAME_LABEL),placeholder:o.a.get(u.a.FAMILY_NAME_PLACEHOLDER)},preferred_username:{label:o.a.get(u.a.PREFERRED_USERNAME_LABEL),placeholder:o.a.get(u.a.PREFERRED_USERNAME_PLACEHOLDER)},gender:{label:o.a.get(u.a.GENDER_LABEL),placeholder:o.a.get(u.a.GENDER_PLACEHOLDER)},profile:{label:o.a.get(u.a.PROFILE_LABEL),placeholder:o.a.get(u.a.PROFILE_PLACEHOLDER)},given_name:{label:o.a.get(u.a.GIVEN_NAME_LABEL),placeholder:o.a.get(u.a.GIVEN_NAME_PLACEHOLDER)},zoneinfo:{label:o.a.get(u.a.ZONEINFO_LABEL),placeholder:o.a.get(u.a.ZONEINFO_PLACEHOLDER)},locale:{label:o.a.get(u.a.LOCALE_LABEL),placeholder:o.a.get(u.a.LOCALE_PLACEHOLDER)},updated_at:{label:o.a.get(u.a.UPDATED_AT_LABEL),placeholder:o.a.get(u.a.UPDATED_AT_PLACEHOLDER)},middle_name:{label:o.a.get(u.a.MIDDLE_NAME_LABEL),placeholder:o.a.get(u.a.MIDDLE_NAME_PLACEHOLDER)},website:{label:o.a.get(u.a.WEBSITE_LABEL),placeholder:o.a.get(u.a.WEBSITE_PLACEHOLDER)},name:{label:o.a.get(u.a.NAME_LABEL),placeholder:o.a.get(u.a.NAME_PLACEHOLDER)}}};function g(e,t){var n=e.target.name,a=e.target.value;n===_.b&&(t.countryDialCodeValue=a),n===_.i&&(t.phoneNumberValue=a)}}}]);
//# sourceMappingURL=6.eef49660.chunk.js.map