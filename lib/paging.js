var PAGE_SIZE = 25;

module.exports = function(page, limit) {
  if (limit == null) limit = PAGE_SIZE;

  return { skip: (parseInt(page || 1, 10) - 1) * limit, limit: limit };
};