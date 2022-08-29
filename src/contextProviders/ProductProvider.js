import ProductContext from "../context/ProductContext";
import React from 'react';
import axios from 'axios'

export default class ProductProvider extends React.Component {
  state = {
    products: [],
    productToShow: [],
    figureTypes: [],
    collections: []
  };

  async componentDidMount() {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
    let productResponse = await axios.get(url + "products");
    let searchFieldsResponse = await axios.get(url + "products/fields");
    await this.setState({
      products: productResponse.data,
      figureTypes: searchFieldsResponse.data.allFigureTypes,
      collections: searchFieldsResponse.data.allCollections
    })
  };

  render() {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
    const productContext = {
      getProducts: () => {
        return this.state.products
      },
      showProduct: async (id) => {
        let productToShowResponse = await axios.get(url + "products/" + id + "/view");
        let productToShow = productToShowResponse.data.product
        console.log(productToShow)
        await this.setState({
          productToShow: productToShow
        });
        return productToShow
      },
      getProductToShow: () => {
        return this.state.productToShow
      },
      filterProducts: async (searchBox) => {
        let productResponse = await axios.get(url + "products/search", {
          params: {
            name: searchBox.search,
            min_cost: searchBox.min_cost,
            max_cost: searchBox.max_cost,
            figure_type_id: searchBox.figureType,
            collection_id: searchBox.collection,
            min_height: searchBox.min_height,
            max_height: searchBox.max_height,
            blind_box: searchBox.blind_box,
            launch_status: searchBox.launch_status
          }
        });
        console.log(productResponse.data)
        let products = productResponse.data;
        console.log(products);
        await this.setState({
          products: products
        });
        // return productContext.getProducts()
      },
      getFigureType: () => {
        return this.state.figureTypes
        console.log(this.state.figureTypes)
      },
      getCollections: () => {
        return this.state.collections
      }
    }
    return (
      <ProductContext.Provider value={productContext}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}