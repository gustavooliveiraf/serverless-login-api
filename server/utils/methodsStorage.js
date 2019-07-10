const fetch = require('node-fetch')
const FormData = require('form-data')
const { bucketName, bucketApi } = require('config/storage')

const postObject = async (req, res) => {
  var formData = new FormData();
  formData.append(
    "image",
    req.file.buffer,
    req.file.originalname
  );

  return res.status(201).send(await ( await fetch(`${bucketApi}/bucket/${bucketName}/files/` + req.params.userGuid, {
    method: 'post', body: formData
  })).json())
}

const getObject = async (req, res) => {
  return res.status(201).send(await ( await fetch(`${bucketApi}/bucket/${bucketName}/files/` + req.params.userGuid)).json())
}

module.exports = {
  postObject,
  getObject
}
