var PAGE_SIZE = 25;

module.exports = function(page, limit) {
  if (limit == null) {
    limit = PAGE_SIZE;
  } else {
    limit = parseInt(limit, 10);
  }

  page = parseInt(page || 1, 10);

  if (isNaN(page) || page < 1) page = 1;

  return { skip: (page - 1) * limit, limit: limit };
};