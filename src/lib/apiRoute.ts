const MAIN = process.env.NEXT_URL!;
const API = {
  USER: `${MAIN}/api/user`,
  CATEGORY: `${MAIN}/api/category`,
  PRODUCT: `${MAIN}/api/product`,
  STOCK: `${MAIN}/api/product/stock`,
};

export default API;
