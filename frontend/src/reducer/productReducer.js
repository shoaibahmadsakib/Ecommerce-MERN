import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET } from '../constants/productsConstants'
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from '../constants/productsConstants'


export const productListReducer = (state = { products: [] }, action) => {
   switch (action.type) {
      case PRODUCT_LIST_REQUEST:
         return { loding: true, products: [] }
      case PRODUCT_LIST_SUCCESS:
         return {
            loding: false,
            products: action.payload.products,
            pages: action.payload.pages,
            page: action.payload.page,
         }
      case PRODUCT_LIST_FAIL:
         return { loding: false, error: action.payload }
      default:
         return state
   }
}
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
   switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
         return { loding: true, ...state }
      case PRODUCT_DETAILS_SUCCESS:
         return { loding: false, product: action.payload }
      case PRODUCT_DETAILS_FAIL:
         return { loding: false, error: action.payload }
      default:
         return state
   }
}
export const productDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
         return { loding: true, }
      case PRODUCT_DELETE_SUCCESS:
         return { loding: false, success: true }
      case PRODUCT_DELETE_FAIL:
         return { loding: false, error: action.payload }
      default:
         return state
   }
}
export const productCreateReducer = (state = {}, action) => {
   switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
         return { loding: true, }
      case PRODUCT_CREATE_SUCCESS:
         return { loding: false, success: true, product: action.payload }
      case PRODUCT_CREATE_FAIL:
         return { loding: false, error: action.payload }
      case PRODUCT_CREATE_RESET:
         return {}
      default:
         return state
   }
}
export const productUpdateReducer = (state = { product: {} }, action) => {
   switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
         return { loding: true, }
      case PRODUCT_UPDATE_SUCCESS:
         return {
            loding: false, success: true,

         }
      case PRODUCT_UPDATE_FAIL:
         return { loding: false, error: action.payload }
      case PRODUCT_UPDATE_RESET:
         return {}
      default:
         return state
   }
}