/** Índice id -> categoría, reutilizado durante la ejecución. */
const getCategoriesById = () => {
  let data = new Map();

  getAllCategories().forEach((category) => {
    data.set(String(category.id), category);
  });

  return data;
};

const getProductsTable = () => {
  const categoriesById = getCategoriesById();
  const products = getAllProducts();

  const rows = products.map((product) => {
    const category = categoriesById.get(String(product.categoryID));

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      unit: product.unit,
      stockCurrent: product.stockCurrent,
      stockMin: product.stockMin,
      purchasePrice: product.purchasePrice,
      categoryName: category ? category.name : "Sin categoría",
      sellingprice: product.sellingprice,
      status: product.status,
    };
  });

  return JSON.stringify(rows);
};

const setNewProduct = (data) => {
  const productTable = getTables().Products;
  const id = productTable._incrementId();
  const skuTotal = 6;
  const idCount = skuTotal - id.toString().length;
  const sku = Array.from({ length: idCount }).map(() => 0);

  const nuevo = productTable._create({
    id,
    ...data,
    sku: `SKU-${sku.join("")}${id}`,
    stockCurrent: 0,
    status: true,
    create: Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd H:mm:ss",
    ),
  });
  return nuevo;
};

const setEditProduct = ({ id, ...data }) => {
  const productTable = getTables().Products;
  const product = productTable._find(id);

  if (!product) return null;

  Object.assign(product, data);
  product._save();

  return product;
};

const getCategoriesForm = () =>
  JSON.stringify(getAllCategories().map(({ id, name }) => ({ id, name })));

const setDisabledProduct = (id) => {
  const productTable = getTables().Products;
  const product = productTable._find(id);

  if (!product) return null;

  product.status = !product.status;
  product._save();

  return product;
};
