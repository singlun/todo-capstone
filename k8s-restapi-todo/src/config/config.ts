export const config = {
  "dev": {
    "users_todo_table": process.env.USERS_TODO_TABLE,
    "userid_index": process.env.USERID_INDEX,
    "todos_s3_bucket": process.env.TODOS_S3_BUCKET,
    "thumbnails_s3_bucket": process.env.THUMBNAILS_S3_BUCKET,
    "signed_url_expiration": process.env.SIGNED_URL_EXPIRATION,
    "aws_reigion": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "url": process.env.URL    
  },
  "prod": {
    "todos_table": "",
    "users_todo_table": "",
    "userid_index": "",
    "todos_s3_bucket": "",
    "thumbnails_s3_bucket": "",
    "signed_url_expiration": "",
    "bucket_region": "",
    "aws_reigion": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "url": process.env.URL  
  },
  "jwt": {
    "secret": process.env.JWT_SECRET
  }  
}

export  const cert = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJGlE3uYNmrfqmMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi1scHhsNm9hdC5hdXRoMC5jb20wHhcNMjAwMzI5MTUxMzMwWhcNMzMx
MjA2MTUxMzMwWjAhMR8wHQYDVQQDExZkZXYtbHB4bDZvYXQuYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4pFHfG18lJmWVcEAyj0U+/7u
rSTca98ew2nlpqiivDSRij17LvV6dtwmKPc2T9sx6+jYXQ5AN4UUP1wY5uzEh4i0
qwYE1pw2bo47a+HcMf3Ny1i9VzieQtJRl+8nOiUaaA7JJ+90KIU1S8SQNWBw8b97
qrc7dLCCojOobxufgrVyi5svR1FCzukmMxepugOw51RaSc6Qsn8Xa20pRuDW8R2T
Cdnd9oBBJuRNEf0WtbUD1TsB3M1ZqeYsm82SkDHrwWVg09CMJ5Upe7u9rbqAECsc
1yWkO6pTg3NsPrYK5Znnj0ywgTl9GDZ3tTqyf/6wBnJLaXhUB2/zUWJzaMBr/wID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSdq/lKvVzjqKvFPF42
bHozBKKTkTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAH9hInm2
RB8hqUHK27xLmrojU2plbSuTP46emQdouFb7g4tBoj8P3ov0sVLvcD1Eun22HojD
+AkrZgOXQRR1X0wPwnMFg4F7dDe0RAJoeVVoZB9MqcXNK/T38MBsncKsDmtvKJ8S
p/zvqzGgrubQXomrDRJhcdE56/mnArgeJ5mw/88AB+8H/p1/KKFPVB1us+u93geV
viVLwuFM64P7W11nM0G/ezWoztTo+nLTTekP9LseBuhIaHqP5XeTuwJpIs39+gif
hjWw8pKIbywJ7DFiOL4Pg9NlRW6p44EqLLDyZOQULVwxqsRBosRXnSbfmiUykyPj
pUu6Jvrs+FnZLlA=
-----END CERTIFICATE-----`
