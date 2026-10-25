/** Índice id -> categoría, reutilizado durante la ejecución. */

const getCategoriesTable = () => {
  const categories = getAllCategories();
  const rows = categories.map((category) => {

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      status: category.status,
      color: category.color,
    };
  });
  return JSON.stringify(rows);
};


const setNewCategory = (data) => {
  const categoryTable = getTables().Categories;
  const id = categoryTable._incrementId();
 

  const newCategory = categoryTable._create({
    id,
    ...data,
    status: true,
  });
  return newCategory;
};

const setEditCategory = ({ id, ...data }) => {
  const categoryTable = getTables().Categories;
  const category = categoryTable._find(id);

  if (!category) return null;

  Object.assign(category, data);
  category._save();

  return category;
};


const setDisabledCategory = (id) => {
  const categoryTable = getTables().Categories;
  const category = categoryTable._find(id);

  if (!category) return null;

  category.status = !category.status;
  category._save();

  return category;
};
