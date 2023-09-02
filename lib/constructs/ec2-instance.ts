import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as fs from "fs";
import * as path from "path";

export interface Ec2InstanceProps {
  vpc: cdk.aws_ec2.IVpc;
}

export class Ec2Instance extends Construct {
  readonly instance: cdk.aws_ec2.Instance;

  constructor(scope: Construct, id: string, props: Ec2InstanceProps) {
    super(scope, id);

    // User data
    const userDataScript = fs.readFileSync(
      path.join(__dirname, "../ec2/user-data.sh"),
      "utf8"
    );
    const userData = cdk.aws_ec2.UserData.forLinux({
      shebang: "#!/bin/bash",
    });
    userData.addCommands(userDataScript);

    // Instance
    this.instance = new cdk.aws_ec2.Instance(this, "Default", {
      machineImage: cdk.aws_ec2.MachineImage.lookup({
        name: "RHEL-9.2.0_HVM-20230726-x86_64-61-Hourly2-GP2",
        owners: ["309956199498"],
      }),
      instanceType: new cdk.aws_ec2.InstanceType("t3.micro"),
      blockDevices: [
        {
          deviceName: "/dev/sda1",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(10, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
        {
          deviceName: "/dev/sdb",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(1, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
        {
          deviceName: "/dev/sdc",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(2, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
        {
          deviceName: "/dev/sdd",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(3, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
        {
          deviceName: "/dev/sde",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(4, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
        {
          deviceName: "/dev/sdf",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(5, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
        {
          deviceName: "/dev/sdg",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(6, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
        {
          deviceName: "/dev/sdh",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(7, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
        {
          deviceName: "/dev/sdi",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(8, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
        {
          deviceName: "/dev/sdj",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(9, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
          }),
        },
      ],
      vpc: props.vpc,
      vpcSubnets: props.vpc.selectSubnets({
        subnetGroupName: "Public",
      }),
      ssmSessionPermissions: true,
      userData,
      requireImdsv2: true,
    });
  }
}
