
import axios from 'axios'
export const ADD_COUNT = 'ADD_COUNT'
export const REMOVE_COUNT = 'REMOVE_COUNT'
export const GET_PRODUCT = 'GET_PRODUCT'
export const ON_SEARCH = 'ON_SEARCH'
export const FILTER_BY_CATEGORY ='FILTER_BY_CATEGORY'
export const RANDOM= 'RANDOM'
export const TOTAL_PRODUCT= 'TOTAL_PRODUCT'
export const CATEGORIES = 'CATEGORIES'


export function addcount (){
    return {
        type: ADD_COUNT,
    }
}
export function removecount (){
    return {
        type: REMOVE_COUNT,
    }
}
export function totalProds(listadoProductos){
    return {
        type: TOTAL_PRODUCT,
        payload: listadoProductos
    }
}
export function categories (datos){
    return {
        type: CATEGORIES,
        payload: datos
    }
}

function receiveStates(data) { 
  return { 
   type: FILTER_BY_CATEGORY, 
   payload: data, 
  }; 
} 

export function filterbyCategory(categorySearch) { 
  return dispatch => 
  axios
  .get(`http://localhost:3001/products/category/${categorySearch}`)
  .then(product => {
     return product.data})
    .then(data =>{
    dispatch(receiveStates(data))
   })
   .catch(error => console.log(error))
} 

// export function filterbyCategory(categorySearch) {

//     axios
//       .get(`http://localhost:3001/products/category/${categorySearch}`)
//       .then(product =>{
//           return{type:FILTER_BY_CATEGORY, payload: product.data }
//         })
//       .catch(error => console.log(error))
//   }

  export function getProducts() {
    axios
      .get(`http://localhost:3001/products`)
      .then(products =>{ return {type:GET_PRODUCT , payload:products.data}})
      .catch(error => console.log(error))
  }

  function receiveSta(data) { 
    return { 
     type: FILTER_BY_CATEGORY, 
     payload: data, 
    }; 
  } 
  export function onSearch(search) { 
    return dispatch => 
    axios
    .get(`http://localhost:3001/search?product=${search}`)
    .then(product => {
       return product.data})
      .then(data =>{
      dispatch(receiveSta(data))
     })
     .catch(error => console.log(error))
  } 

  // export function onSearch(search) {
  //   axios
  //   .get(`http://localhost:3001/search?product=${search}`)
  //   .then((recurso) => {
  //       return {type:ON_SEARCH, payload:recurso.data}
  //     });
  // }

 export function randomProduct() {
    let arrayDes = [];
    let value;
    axios.get("http://localhost:3001/products")
      .then((products) => {
        for (let i = 0; i < 4; i++) {
          value = Math.floor(Math.random() * products.data.length);
          arrayDes.push(products.data[value]);
          products.data.splice(value, 1);
        }
        return{type:RANDOM, payload:arrayDes};
      })
      .catch((err) => new Error(err));
  }