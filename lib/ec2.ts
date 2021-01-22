import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as ssm from '@aws-cdk/aws-ssm';

export class Ec2SsmStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // import the default vpc
        const vpc = ec2.Vpc.fromLookup(this, 'vpc', {
            isDefault: true,
        });

        // import the ec2 instance role from role arn in SSM parameter store
        const ec2Role = iam.Role.fromRoleArn(
            this, 'ec2Role',
            ssm.StringParameter.fromStringParameterName(
                this, 'ec2RoleArn', '/iamVpcStack/instanceRoleArn').stringValue
        );

        // use the importing role for an ec2 instance 
        new ec2.Instance(this, 'testInstance', {
            machineImage: new ec2.AmazonLinuxImage(),
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T3,
                ec2.InstanceSize.NANO
            ),
            vpc,
            role: ec2Role, // use the imported role
        });
    }
}