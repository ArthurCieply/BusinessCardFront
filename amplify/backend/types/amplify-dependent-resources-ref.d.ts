export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "businesscardsfront5a858dca": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "adminGroupRole": "string",
            "generalGroupRole": "string"
        }
    },
    "function": {
        "AdminQueries5ea6a4d4": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "storage": {
        "cardsimagebucket": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}