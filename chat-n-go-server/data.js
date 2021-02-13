const AWS = require('aws-sdk')

// noinspection SpellCheckingInspection
class DataManager {
  uploadData (file, data) {
    return new AWS.S3({ apiVersion: '2006-03-01' }).putObject({
      Bucket: 'cloud-cube-au',
      Key: `k4o3nuzivu3m/${file}`,
      Body: JSON.stringify(data)
    }).promise()
  }

  readData (file) {
    return new AWS.S3({ apiVersion: '2006-03-01' }).getObject({
      Bucket: 'cloud-cube-au',
      Key: `k4o3nuzivu3m/${file}`
    }).promise()
  }
}

module.exports = DataManager
