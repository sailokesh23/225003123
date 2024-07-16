const makeId = (item) => {
  return `${item.company}-${item.id}`;
};

const paginate = (items, size, page) => {
  const start = (page - 1) * size;
  const end = start + size;
  return items.slice(start, end);
};
const sortItems = (items, key, dir) => {
  return items.sort((first, second) => {
    if (dir === 'asc') {
      return first[key] > second[key] ? 1 : -1;
    } else {
      return first[key] < second[key] ? 1 : -1;
    }
  });
};
module.exports = { makeId, sortItems, paginate };
