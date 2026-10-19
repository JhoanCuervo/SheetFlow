/** Suma las entradas y salidas de todos los movimientos. */
const getInOut = () => {
  const movements = getAllMovements();
  const totals = movements.reduce(
    (totals, { type, amount }) => {
      if (type === "ENTRY") {
        totals.entries += Number(amount) || 0;
      } else if (type === "EXIT") {
        totals.exits += Number(amount) || 0;
      }

      return totals;
    },
    { entries: 0, exits: 0 },
  );
  return JSON.stringify(totals);
};

/** Calcula el valor del inventario por categoría, de mayor a menor. */
const getCategoryValue = () => {
  const products = getAllProducts();
  const categories = getAllCategories();

  const categoryMap = new Map();

  categories.forEach(({ id, name, color }) => {
    categoryMap.set(String(id), {
      categoryId: String(id),
      category: name,
      value: 0,
      color,
    });
  });

  products.forEach(({ categoryID, stockCurrent, purchasePrice }) => {
    const categoryId = String(categoryID);
    const category = categoryMap.get(categoryId);

    if (!category) return;

    const stock = Number(stockCurrent) || 0;
    const price = Number(purchasePrice) || 0;

    category.value += stock * price;
  });

  const categoriesValue = Array.from(categoryMap.values()).sort(
    (a, b) => b.value - a.value,
  );

  return JSON.stringify(categoriesValue);
};

/** Agrupa los movimientos por mes en formato YYYY-MM. */
const getMovementsByMonth = () => {
  const movements = getAllMovements();

  const totals = movements.reduce((acc, { date }) => {
    if (!date) return acc;

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return acc;

    const month = [
      dateObj.getFullYear(),
      String(dateObj.getMonth() + 1).padStart(2, "0"),
    ].join("-");

    acc[month] = (acc[month] || 0) + 1;

    return acc;
  }, {});

  const movementsByMonth = Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({
      month,
      total,
    }));

  return JSON.stringify(movementsByMonth);
};
