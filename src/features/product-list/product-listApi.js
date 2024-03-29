// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchProductsByFilters(filter,sort,pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
// pagination = {_page:1,_limit=10}
  // TODO : on server we will support multi values in filter
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}`
  }
  console.log(pagination)
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products?'+queryString) 
    const data = await response.json()
    console.log(data,"product-listapi response")
    const totalItems = data.items
    resolve({data:{products:data.data,totalItems:+totalItems}})
  }
  );
}