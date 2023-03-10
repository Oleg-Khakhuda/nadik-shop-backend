import repositoryProducts from "../../repository/products";
import { HttpCode } from "../../lib/constants";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await repositoryProducts.getAllProducts();
    if (products) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, products });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { id: categoryId } = req.category;
    const products = await repositoryProducts.listProducts(
      categoryId,
      req.query
    );
    if (products) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, products });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    // const reqFiles = [];

    // for (let i = 0; i < req.files.length; i++) {
    //   reqFiles.push(
    //     `http://localhost:${process.env.PORT}/${req.files[i].path}`
    //   );
    // }

    // console.log(req.params);

    const { id: categoryId } = req.category;
    // console.log(categoryId);
    const newProduct = await repositoryProducts.addProduct(
      categoryId,
      req.body
      // plateImage: reqFiles,
    );
    console.log(newProduct);
    if (newProduct) {
      return res.status(HttpCode.CREATED).json(newProduct);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await repositoryProducts.getProductById(id);
    console.log(product);
    if (product) {
      return res.status(HttpCode.OK).json(product);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await repositoryProducts.removeProduct(id);
    if (product) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, product });
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    console.log(id);
    const product = await repositoryProducts.updateProduct(id, req.body);
    console.log(product);
    if (product) {
      return res.status(HttpCode.OK).json(product);
    }
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Щось пішло не так",
    });
  }
};

export {
  getAllProducts,
  getProducts,
  addProduct,
  getProductById,
  removeProduct,
  updateProduct,
};
