const makeId = (item) => {
  return `${item.company}-${item.id}`;
};

const sortItems = (items, key, dir) => {
  return items.sort((a, b) => {
    if (dir === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

const paginate = (items, size, page) => {
  const start = (page - 1) * size;
  const end = start + size;
  return items.slice(start, end);
};

module.exports = { makeId, sortItems, paginate };
