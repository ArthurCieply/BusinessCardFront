(this.webpackJsonpbusinesscardsfront=this.webpackJsonpbusinesscardsfront||[]).push([[20],{471:function(E,e,_){"use strict";_.r(e),_.d(e,"amplify_picker",(function(){return T}));var t=_(15),n=_(494),r=_(497),T=function(){function E(E){Object(t.k)(this,E),this.pickerText=r.a.PICKER_TEXT,this.acceptValue="*/*"}return E.prototype.render=function(){var E=this;return Object(t.i)("div",{class:"picker"},Object(t.i)("slot",{name:"picker"},Object(t.i)("amplify-button",null,n.a.get(this.pickerText))),Object(t.i)("input",{title:n.a.get(this.pickerText),type:"file",accept:this.acceptValue,onChange:function(e){return E.inputHandler(e)}}))},E}();T.style=".picker{position:relative;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}input[type=file]{width:100%;height:100%;display:inline-block;position:absolute;left:0;top:0;opacity:0;cursor:pointer}"},497:function(E,e,_){"use strict";_.d(e,"a",(function(){return T}));var t,n,r=_(23);!function(E){E.BACK_TO_SIGN_IN="Back to Sign In",E.CHANGE_PASSWORD_ACTION="Change",E.CHANGE_PASSWORD="Change Password",E.CODE_LABEL="Verification code",E.CODE_PLACEHOLDER="Enter code",E.CONFIRM_SIGN_UP_CODE_LABEL="Confirmation Code",E.CONFIRM_SIGN_UP_CODE_PLACEHOLDER="Enter your code",E.CONFIRM_SIGN_UP_HEADER_TEXT="Confirm Sign up",E.CONFIRM_SIGN_UP_LOST_CODE="Lost your code?",E.CONFIRM_SIGN_UP_RESEND_CODE="Resend Code",E.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT="Confirm",E.CONFIRM_SMS_CODE="Confirm SMS Code",E.CONFIRM_TOTP_CODE="Confirm TOTP Code",E.CONFIRM="Confirm",E.CREATE_ACCOUNT_TEXT="Create account",E.EMAIL_LABEL="Email Address *",E.EMAIL_PLACEHOLDER="Enter your email address",E.FORGOT_PASSWORD_TEXT="Forgot your password?",E.LESS_THAN_TWO_MFA_VALUES_MESSAGE="Less than two MFA types available",E.NEW_PASSWORD_LABEL="New password",E.NEW_PASSWORD_PLACEHOLDER="Enter your new password",E.NO_ACCOUNT_TEXT="No account?",E.USERNAME_REMOVE_WHITESPACE="Username cannot contain whitespace",E.PASSWORD_REMOVE_WHITESPACE="Password cannot start or end with whitespace",E.PASSWORD_LABEL="Password *",E.PASSWORD_PLACEHOLDER="Enter your password",E.PHONE_LABEL="Phone Number *",E.PHONE_PLACEHOLDER="(555) 555-1212",E.QR_CODE_ALT="qrcode",E.RESET_PASSWORD_TEXT="Reset password",E.RESET_YOUR_PASSWORD="Reset your password",E.SELECT_MFA_TYPE_HEADER_TEXT="Select MFA Type",E.SELECT_MFA_TYPE_SUBMIT_BUTTON_TEXT="Verify",E.SEND_CODE="Send Code",E.SUBMIT="Submit",E.SETUP_TOTP_REQUIRED="TOTP needs to be configured",E.SIGN_IN_ACTION="Sign In",E.SIGN_IN_HEADER_TEXT="Sign in to your account",E.SIGN_IN_TEXT="Sign in",E.SIGN_IN_WITH_AMAZON="Sign in with Amazon",E.SIGN_IN_WITH_AUTH0="Sign in with Auth0",E.SIGN_IN_WITH_AWS="Sign in with AWS",E.SIGN_IN_WITH_FACEBOOK="Sign in with Facebook",E.SIGN_IN_WITH_GOOGLE="Sign in with Google",E.SIGN_OUT="Sign Out",E.SIGN_UP_EMAIL_PLACEHOLDER="Email",E.SIGN_UP_HAVE_ACCOUNT_TEXT="Have an account?",E.SIGN_UP_HEADER_TEXT="Create a new account",E.SIGN_UP_PASSWORD_PLACEHOLDER="Password",E.SIGN_UP_SUBMIT_BUTTON_TEXT="Create Account",E.SIGN_UP_USERNAME_PLACEHOLDER="Username",E.SUCCESS_MFA_TYPE="Success! Your MFA Type is now:",E.TOTP_HEADER_TEXT="Scan then enter verification code",E.TOTP_LABEL="Enter Security Code:",E.TOTP_ISSUER="AWSCognito",E.TOTP_SETUP_FAILURE="TOTP Setup has failed",E.TOTP_SUBMIT_BUTTON_TEXT="Verify Security Token",E.TOTP_SUCCESS_MESSAGE="Setup TOTP successfully!",E.UNABLE_TO_SETUP_MFA_AT_THIS_TIME="Failed! Unable to configure MFA at this time",E.USERNAME_LABEL="Username *",E.USERNAME_PLACEHOLDER="Enter your username",E.VERIFY_CONTACT_EMAIL_LABEL="Email",E.VERIFY_CONTACT_HEADER_TEXT="Account recovery requires verified contact information",E.VERIFY_CONTACT_PHONE_LABEL="Phone Number",E.VERIFY_CONTACT_SUBMIT_LABEL="Submit",E.VERIFY_CONTACT_VERIFY_LABEL="Verify",E.ADDRESS_LABEL="Address",E.ADDRESS_PLACEHOLDER="Enter your address",E.NICKNAME_LABEL="Nickname",E.NICKNAME_PLACEHOLDER="Enter your nickname",E.BIRTHDATE_LABEL="Birthday",E.BIRTHDATE_PLACEHOLDER="Enter your birthday",E.PICTURE_LABEL="Picture URL",E.PICTURE_PLACEHOLDER="Enter your picture URL",E.FAMILY_NAME_LABEL="Family Name",E.FAMILY_NAME_PLACEHOLDER="Enter your family name",E.PREFERRED_USERNAME_LABEL="Preferred Username",E.PREFERRED_USERNAME_PLACEHOLDER="Enter your preferred username",E.GENDER_LABEL="Gender",E.GENDER_PLACEHOLDER="Enter your gender",E.PROFILE_LABEL="Profile URL",E.PROFILE_PLACEHOLDER="Enter your profile URL",E.GIVEN_NAME_LABEL="First Name",E.GIVEN_NAME_PLACEHOLDER="Enter your first name",E.ZONEINFO_LABEL="Time zone",E.ZONEINFO_PLACEHOLDER="Enter your time zone",E.LOCALE_LABEL="Locale",E.LOCALE_PLACEHOLDER="Enter your locale",E.UPDATED_AT_LABEL="Updated At",E.UPDATED_AT_PLACEHOLDER="Enter the time the information was last updated",E.MIDDLE_NAME_LABEL="Middle Name",E.MIDDLE_NAME_PLACEHOLDER="Enter your middle name",E.WEBSITE_LABEL="Website",E.WEBSITE_PLACEHOLDER="Enter your website",E.NAME_LABEL="Full Name",E.NAME_PLACEHOLDER="Enter your full name",E.PHOTO_PICKER_TITLE="Picker Title",E.PHOTO_PICKER_HINT="Ancillary text or content may occupy this space here",E.PHOTO_PICKER_PLACEHOLDER_HINT="Placeholder hint",E.PHOTO_PICKER_BUTTON_TEXT="Button",E.IMAGE_PICKER_TITLE="Add Profile Photo",E.IMAGE_PICKER_HINT="Preview the image before upload",E.IMAGE_PICKER_PLACEHOLDER_HINT="Tap to image select",E.IMAGE_PICKER_BUTTON_TEXT="Upload",E.PICKER_TEXT="Pick a file",E.TEXT_FALLBACK_CONTENT="Fallback Content",E.CONFIRM_SIGN_UP_FAILED="Confirm Sign Up Failed",E.SIGN_UP_FAILED="Sign Up Failed"}(t||(t={})),function(E){E.CHATBOT_TITLE="ChatBot Lex",E.TEXT_INPUT_PLACEHOLDER="Write a message",E.VOICE_INPUT_PLACEHOLDER="Click mic to speak",E.CHAT_DISABLED_ERROR="Error: Either voice or text must be enabled for the chatbot",E.NO_BOT_NAME_ERROR="Error: Bot name must be provided to ChatBot"}(n||(n={}));var T=Object.assign(Object.assign(Object.assign({},t),r.a),n)}}]);
//# sourceMappingURL=20.5302b3a1.chunk.js.map