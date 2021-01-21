#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkCrossStackSsmStack } from '../lib/cdk-cross-stack-ssm-stack';

const app = new cdk.App();
new CdkCrossStackSsmStack(app, 'CdkCrossStackSsmStack');
