import Footer from "./components/Footer";
import Header from "./components/Header";
import "./style.css"
import "./bootstrap.min.css"
import HomeScreen from "./screen/HomeScreen";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ProductScreen from "./screen/ProductScreen";
import Cart from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";
import ShippingScreen from "./screen/ShippingScreen";
import CheckoutStapes from "./components/CheckoutStapes";
import PaymentScreen from "./screen/paymentScreen";
import PlaceOrderScreen from "./screen/PlaceOrderScreen";
import OrderScreen from "./screen/OrderScreen";
import UserListScreen from "./screen/UserListScreen";
import ProductListScreen from "./screen/ProductListScreen";
import OrderListScreen from "./screen/OrderListScreen";
import UserEditScreen from "./screen/UserEditScreen";
import ProductEditScreen from "./screen/ProductEditScreen";


function App() {
  return (
    <Router>
      <Header />
      <main className="container">



        <Route path="/" component={HomeScreen} exact ></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/cart/:id?" component={Cart} ></Route>
        <Route path="/login" component={LoginScreen} ></Route>
        <Route path="/register" component={RegisterScreen} ></Route>
        <Route path="/profile" component={ProfileScreen}></Route>
        <Route path="/shipping" component={ShippingScreen}></Route>
        <Route path="/payment" component={PaymentScreen}></Route>

        <Route path="/checkout" component={CheckoutStapes}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/admin/userlist" component={UserListScreen}></Route>
        <Route path="/admin/productlist" component={ProductListScreen} exact></Route>
       
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />



        <Route path="/admin/product/:id/edit" component={ProductEditScreen}></Route>

        <Route path="/admin/orders" component={OrderListScreen}></Route>
        <Route path="/admin/user/:id/edit" component={UserEditScreen}></Route>

        <Route path="/search/:keyword" component={HomeScreen}></Route>
        <Route path='/page/:pageNumber' component={HomeScreen} exact />

        <Route
          path='/search/:keyword/page/:pageNumber'
          component={HomeScreen}
          exact
        />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
