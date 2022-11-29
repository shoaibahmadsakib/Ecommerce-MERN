import asyncHandler from "express-async-handler";
import Products from '../models/productsModel.js'



// @des Fetch all products
// @route get /api/products
// @addess Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 3
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}
  const count = await Products.countDocuments({ ...keyword })
  const products = await Products.find({ ...keyword }).limit(pageSize)
    .skip(pageSize * (page - 1))



  res.json({products, page, pages: Math.ceil(count / pageSize)})
})

// @des Fetch single products
// @route get /api/:id
// @addess Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id)

  if (product) {
    res.json(product)
  }
  else {
    res.status(404)
    throw new Error('product not found')
  }

})

// @des Delete a products
// @route delete /api/products/:id
// @addess private/admin
const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'products remove' })
  }
  else {
    res.status(404)
    throw new Error('product not found')
  }

})

// @des create a products
// @route post /api/products/
// @addess private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Products({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)

})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Products.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.catagory = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProducts, createProduct, updateProduct }  