import AWS = require('aws-sdk');
import { config } from './config/config';

const c = config.dev;

//Configure AWS
var credentials = new AWS.SharedIniFileCredentials({profile: c.aws_profile});
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
    region: c.aws_region,
    params: {Bucket: c.todos_s3_bucket}
  });
