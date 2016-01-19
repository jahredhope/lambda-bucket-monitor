var AWS = require('aws-sdk');

exports.handler = function(event, context) {
  var s3 = new AWS.S3();

  var bucket = 'dev-develop-inside';
  var apps = require('data');
  var app = apps[0];
  s3.listObjects({
    Bucket: bucket,
    Prefix: app + '/'
  }, function(err, data) {
    if (err) {
      console.log('error', err); // an error occurred
      context.done();
      return;
    }
    var output = {
      app: app,
      files: []
    };

    if (data && data.Contents.length === 0) {
      console.log('No Content in ', app);
      context.done();
      return;
    }
    data.Contents.forEach(function(content) {
      if (content.Size === 1) {
        return; // Skip Folders
      }
      output.files.push(content.Key);
    });
    s3.putObject({
      Bucket: bucket,
      Key: app + '.json',
      Body: JSON.stringify(output, undefined, 2)
    }, function() {
      if (err) console.log('error', err, err.stack); // an error occurred
      else console.log('Successful files', output.files.length); // successful response
      context.done();
    });
  });
}
