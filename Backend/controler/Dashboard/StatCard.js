/** Reúne las métricas que muestran las tarjetas del dashboard. */
const getProductStats = () => {
  const products = getAllProducts();
  const stats = {
    activeProductsCount: countActiveProducts_(products),
    outOfStockProductsCount: countOutOfStockProducts_(products),
    lowStockProductsCount: countLowStockProducts_(products),
    inventoryValue: getInventoryValue_(products),
  };
  return JSON.stringify(stats);
};

/** Cuenta los productos activos. */
const countActiveProducts_ = (products) => {
  try {
    const activeProducts = products.filter(
      (product) => product.status === true,
    );
    return activeProducts ? activeProducts.length : 0;
  } catch (error) {
    return 0;
  }
};

/** Cuenta los productos que se quedaron sin stock. */
const countOutOfStockProducts_ = (products) => {
  try {
    const outOfStockProducts = products.filter(
      (product) => product.stockCurrent === 0,
    );
    return outOfStockProducts ? outOfStockProducts.length : 0;
  } catch (error) {
    return 0;
  }
};

/** Cuenta los productos por debajo del stock mínimo. */
const countLowStockProducts_ = (products) => {
  try {
    const lowStockProducts = products.filter(
      (product) =>
        product.stockCurrent != 0 && product.stockCurrent < product.stockMin,
    );
    return lowStockProducts ? lowStockProducts.length : 0;
  } catch (error) {
    return 0;
  }
};

/** Suma el valor del inventario con el stock disponible. */
const getInventoryValue_ = (products) => {
  try {
    const productsInStock = products.filter(
      (product) => product.stockCurrent != 0,
    );

    const inventoryValue = productsInStock.reduce(
      (total, { stockCurrent, purchasePrice }) => {
        return total + stockCurrent * purchasePrice;
      },
      0,
    );

    return inventoryValue;
  } catch (error) {
    return 0;
  }
};
