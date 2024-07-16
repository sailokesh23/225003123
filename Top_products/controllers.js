const axios = require('axios');
const { makeId, sortItems, paginate } = require('./utils');
require('dotenv').config();

const API_URL = process.env.ECOMMERCE_API_URL;
const TOKEN = process.env.AUTH_TOKEN; 

const fetchProd = async (cmp, cat) => {
  try {
    const res = await axios.get(`${API_URL}/${cmp}/categories/${cat}`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });

    if (res && res.data && Array.isArray(res.data.products)) {
      return res.data.products;
    } else {
      console.error(`Unexpected response from ${cmp}:`, res.data);
      return [];
    }
  } catch (err) {
    console.error(`Failed to fetch from ${cmp}: ${err.message}`);
    return [];
  }
};

const getTopProds = async (req, res) => {
  const { cat } = req.params;
  const { n = 10, page = 1, sort, order = 'asc' } = req.query;

  try {
    const cmpList = ['company1', 'company2', 'company3', 'company4', 'company5'];
    const responses = await Promise.all(cmpList.map(cmp => fetchProd(cmp, cat)));

    let prods = responses.flat();

    if (prods.length === 0) {
      console.warn('No products found.');
    }

    prods = prods.map(p => ({
      ...p,
      id: makeId(p)
    }));

    if (sort) {
      prods = sortItems(prods, sort, order);
    }
    const paginated = paginate(prods, n, page);

    res.json(paginated);
  } catch (err) {
    console.error(`Error in getTopProds: ${err.message}`);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProdDetails = async (req, res) => {
  const { cat, id } = req.params;

  try {
    const cmpList = ['company1', 'company2', 'company3', 'company4', 'company5'];
    const responses = await Promise.all(cmpList.map(cmp => {
      return axios.get(`${API_URL}/${cmp}/categories/${cat}/products/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      }).catch(() => null);
    }));

    const product = responses.find(res => res && res.data && res.data.product)?.data.product;

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error(`Error in getProdDetails: ${err.message}`);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};

module.exports = { getTopProds, getProdDetails };
