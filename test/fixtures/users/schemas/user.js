module.exports = {
  required: true
, type: 'object'
, properties: {
    name: { required: true, type: 'string' }
  , email: { required: true, type: 'string' }
  , password: { type: 'string' }
  , dob: { type: 'string', format: 'date-time' }
  }
};