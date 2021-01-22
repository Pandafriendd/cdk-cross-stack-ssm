#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { IamSsmStack } from '../lib/iam';
import { Ec2SsmStack } from '../lib/ec2'

const app = new cdk.App();

new IamSsmStack(app, 'IamSsmStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});


new Ec2SsmStack(app, 'Ec2SsmStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});
