import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as ssm from '@aws-cdk/aws-ssm';

export class IamSsmStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create an IAM Role for ec2 instance in another stack
    const ec2Role = new iam.Role(this, "ec2Role", {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    });

    // create an SSM parameters which store export values
    new ssm.StringParameter(this, 'ec2RoleArn', {
      parameterName: `/iamVpcStack/instanceRoleArn`,
      stringValue: ec2Role.roleArn
    })
  }
}
