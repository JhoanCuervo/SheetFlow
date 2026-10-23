/** Suma las entradas y salidas de todos los movimientos. */
const getInOut = () => {
  const movements = getAllMovements();
  const valueInitial = {
    entries: {
      total: 0,
      name: "Unidades ingresadas",
      color: "#10B981",
    },
    exits: {
      total: 0,
      name: "Unidades retiradas",
      color: "#F43F5E",
    },
  };

  const totals = movements.reduce((values, { type, amount }) => {
    const {entries, exits} = values;
    if (type === "ENTRY") {
      entries.total += Number(amount) || 0;
    } else if (type === "EXIT") {
      exits.total += Number(amount) || 0;
    }
    return values;
  }, valueInitial);

  const dataTotal = Object.values(totals)
  
  return JSON.stringify(dataTotal);
};

/** Calcula el valor del inventario por categoría, de mayor a menor. */
const getCategoryValue = () => {
  const categoryMap = new Map(
    getAllCategories().map(({ id, name, color }) => [
      String(id),
      {
        name,
        total: 0,
        color,
      },
    ]),
  );

  getAllProducts().forEach(({ categoryID, stockCurrent, purchasePrice }) => {
    const category = categoryMap.get(String(categoryID));
    if (!category) return;

    category.total +=
      (Number(stockCurrent) || 0) * (Number(purchasePrice) || 0);
  });

  return JSON.stringify(
    [...categoryMap.values()].sort((a, b) => b.total - a.total),
  );
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
      name:month,
      total,
    }));

  return JSON.stringify(movementsByMonth);
};
