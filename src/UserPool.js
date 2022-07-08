/*  Video Series
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_W7kwrX4oC',
    ClientId: '2iun3e1hqj4uihgvvq4dp1p36t'
};

export default new CognitoUserPool(poolData);*/

import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_BevsnL9Sg',
    ClientId: '5eg5cb8q20eopnac4k3d4ipk5j',
};
export default new CognitoUserPool(poolData);