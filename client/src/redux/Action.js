import axios from "axios";
export const ADD_COUNT = "ADD_COUNT";
export const REMOVE_COUNT = "REMOVE_COUNT";
export const GET_PRODUCT = "GET_PRODUCT";
export const ON_SEARCH = "ON_SEARCH";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const REMOVE_BY_CATEGORY = "REMOVE_BY_CATEGORY";
export const TOTAL_PRODUCT = "TOTAL_PRODUCT";
export const CATEGORIES = "CATEGORIES";
export const DELETE_FILTER = "DELETE_FILTER";
export const CARRITO = "CARRITO";
export const DELETE_PROD = "DELETE_PROD";
export const COUNT_CART = "COUNT_CART";
export const REMOVE_COUNT_CART = "REMOVE_COUNT_CART";
export const ORDER_DETAIL = "ORDER_DETAIL";
export const DELETE_COUNT ="DELETE_COUNT";
export const STOCK = "STOCK";
export const FILTER_BY_CATEGORIES = "FILTER_BY_CATEGORIES";
export const STARS = "STARS";
export const LOGIN = "LOGIN";


export function logIn(user) {
  return {
    type: LOGIN,
    payload: user,
  }
}

export function addcount(stock) {
  return {
    type: ADD_COUNT,
    payload: stock
  };
}

export function removecount() {
  return {
    type: REMOVE_COUNT,
  };
}
export function deletecount() {
  return {
    type: DELETE_COUNT,
  };
}
export function stock(stock){
  return{
    type: stock,
    payload: stock
  }
}

export function totalProds(listadoProductos) {
  return {
    type: TOTAL_PRODUCT,
    payload: listadoProductos,
  };
}

export function categories(datos) {
  return {
    type: CATEGORIES,
    payload: datos,
  };
}

function receiveStates(data) {
  return {
    type: FILTER_BY_CATEGORY,
    payload: data,
  };
}
export function removeByCategory(data) {
  return {
    type: REMOVE_BY_CATEGORY,
    payload: data,
  };
}
export function setProductsFiltered(data) {
  return {
    type: FILTER_BY_CATEGORIES,
    payload: data,
  };
}
export function agregarCarrito(prod) {
  return {
    type: CARRITO,
    payload: prod,
  };
}
export function deleteProd(prod) {
  return {
    type: DELETE_PROD,
    payload: prod,
  };
}

export function countCart(x) {
  let countCart =localStorage.getItem('count')
  return {
    type: COUNT_CART,
    payload: x
  };
}
export function removecountCart() {
  return {
    type: REMOVE_COUNT_CART,
  };
}

export function deleteFilter() {
  return {
    type: DELETE_FILTER,
  };
}
export function selectStar(stars) {
  return {
    type: STARS,
    payload: stars
  };
}

export function filterbyCategory(categorySearch,bool) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/products/category/${categorySearch}`)
      .then((product) => {
        return product.data;
      })
      .then((data) => {
        if (bool) dispatch(receiveStates(data));
        if (!bool) dispatch(removeByCategory(data));
        return data
      }).then(p => p)
      .catch((error) => console.log(error));
}
  export function filterbyCategories(arrayNames){
    return dispatch =>{
    //   axios({
    //     method: 'get',
    //     url: `http://localhost:3001/products/category/filter`,
    //     processData: false,
    //     body:{name: "it works!"}
    // })
      axios
        .post(`http://localhost:3001/products/category/filter`,{categoryNames:arrayNames})
        .then((products) => {
          return products.data;
        })
        .then(products =>{
          dispatch(setProductsFiltered(products))
          return products
          })
        .catch((error) => {
          console.log(error)
          return error
        });
    }
  }
export function getProducts() {
  return axios
    .get(`http://localhost:3001/products`)
    .then((products) => {
      return { type: GET_PRODUCT, payload: products.data };
    })
    .catch((error) => console.log(error));
}

export function onSearch(search) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/search?product=${search}`)
      .then((product) => {
        return product.data;
      })
      .then((data) => {
        dispatch({
          type: ON_SEARCH,
          payload: data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function orderDetail(id) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/orders/${id}/cart`)
      .then((orders) => {
        return orders.data;
      })
      .then((data) => {
        dispatch({
          type: ORDER_DETAIL,
          payload: data
        });
      })
      .catch((error) => console.log(error));
  };
}