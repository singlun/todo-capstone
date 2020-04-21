export const config = {
  "dev": {
    "users_todo_table": process.env.USERS_TODO_TABLE,
    "userid_index": process.env.USERID_INDEX,
    "todos_s3_bucket": process.env.TODOS_S3_BUCKET,
    "thumbnails_s3_bucket": process.env.THUMBNAILS_S3_BUCKET,
    "signed_url_expiration": process.env.SIGNED_URL_EXPIRATION,
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "todo_version": process.env.TODO_VERSION, 
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

//Andrew
// export  const cert = `-----BEGIN CERTIFICATE-----
// MIIDBzCCAe+gAwIBAgIJGlE3uYNmrfqmMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
// BAMTFmRldi1scHhsNm9hdC5hdXRoMC5jb20wHhcNMjAwMzI5MTUxMzMwWhcNMzMx
// MjA2MTUxMzMwWjAhMR8wHQYDVQQDExZkZXYtbHB4bDZvYXQuYXV0aDAuY29tMIIB
// IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4pFHfG18lJmWVcEAyj0U+/7u
// rSTca98ew2nlpqiivDSRij17LvV6dtwmKPc2T9sx6+jYXQ5AN4UUP1wY5uzEh4i0
// qwYE1pw2bo47a+HcMf3Ny1i9VzieQtJRl+8nOiUaaA7JJ+90KIU1S8SQNWBw8b97
// qrc7dLCCojOobxufgrVyi5svR1FCzukmMxepugOw51RaSc6Qsn8Xa20pRuDW8R2T
// Cdnd9oBBJuRNEf0WtbUD1TsB3M1ZqeYsm82SkDHrwWVg09CMJ5Upe7u9rbqAECsc
// 1yWkO6pTg3NsPrYK5Znnj0ywgTl9GDZ3tTqyf/6wBnJLaXhUB2/zUWJzaMBr/wID
// AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSdq/lKvVzjqKvFPF42
// bHozBKKTkTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAH9hInm2
// RB8hqUHK27xLmrojU2plbSuTP46emQdouFb7g4tBoj8P3ov0sVLvcD1Eun22HojD
// +AkrZgOXQRR1X0wPwnMFg4F7dDe0RAJoeVVoZB9MqcXNK/T38MBsncKsDmtvKJ8S
// p/zvqzGgrubQXomrDRJhcdE56/mnArgeJ5mw/88AB+8H/p1/KKFPVB1us+u93geV
// viVLwuFM64P7W11nM0G/ezWoztTo+nLTTekP9LseBuhIaHqP5XeTuwJpIs39+gif
// hjWw8pKIbywJ7DFiOL4Pg9NlRW6p44EqLLDyZOQULVwxqsRBosRXnSbfmiUykyPj
// pUu6Jvrs+FnZLlA=
// -----END CERTIFICATE-----`

//Alan Auth0 Secrete Cert.
export  const cert = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJeDILzE/4wcrKMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi1yczVuYWx4eC5hdXRoMC5jb20wHhcNMTkxMjA5MDI1NDUzWhcNMzMw
ODE3MDI1NDUzWjAhMR8wHQYDVQQDExZkZXYtcnM1bmFseHguYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs3USl/wBkpjJTE8lP2PDI4zs
JEX8hUm0xUW/WaU1e0XbZVNfstQo7JxaEXJBrCuNcv1o7AbO0Ylfa8JcupZTPp8Q
c6DiJt4OZur7ENKpQs6hsb6wlF3t/0QWdodQmbHS4MwL1wSFnqFWFe2Xp8ja+t+F
wLltKswhafS/qbaTHO7HWdE5LBDeBaowpa5wtbqtkca7590xOxyV4dGXDSoUzyEY
kYIr1pt/mzc7Tr68DspY9BSNeguWseepw3kNxwYPnqkCGOQCFvX1+sKlQOiI/aSp
EnmX+r0cE7lHyScvFx4zROwPJFSRaTAhp29foIQ0tt4QGPHiqqmvcVrqL8+rMwID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRun632VkgBP3LSSez5
7GNAudef3zAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAHsOcg3w
tMuqCszs4IRwCh/B/WiRetbSivYyXz6gwnEFx1fPtVb6U5RYcgHzUIApUbp2zQhP
1JefX3aytqBik6xhFrNvK9s9u70nCxrgbHp9z9PbhY3/EStw9iY7SuZSAyf5+6gB
IeVJqsuHu06+W1wiIotbGHmmZAWjI7Sad7RTeCARXt3lgpc8lZv8jrNcXuTM8tHG
GasWjUcX2d9adG5lPxeVpETZni6E34svE2GjXgkCmI+pZz5Pvq43E1ofzAOSPp1Q
X/4fQ/WTR+CT7vEg+wPUrC8/ps44K1TWF5naMkk2ENdNt9XfzhiftmcWwQsl6pUA
v2CycNN53PiKBik=
-----END CERTIFICATE-----`
