import React from 'react'
import { Route, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header/shop-header';
import HomePage from '../pages/home-page';
import CartPage from '../pages/cart-page';
import './app.css'


const App = () => {


    return (
        <main role='main' className='container'>
            <ShopHeader />
            <Switch>
                <Route path='/restore' component={HomePage} exact />
                <Route path='/cart' component={CartPage} />
            </Switch>
        </main>

    )
};

export default (App);