import React from "react";
import { Stack } from 'react-bootstrap';
import styled from "styled-components";
import { observer } from 'mobx-react';
import CartStore from "../stores/CartStore";

const ProductToggler = styled.div`
    margin-left: 4px;
    width: 40px;
    border: 1px solid lightblue;
    padding: 4px;
    text-align: center;
    cursor: pointer;
`;

type Props = {
    productId: number;
}

const CartButtonGroup = observer(({ productId }: Props) => {
    let productQuantity: number = CartStore.cartItems[productId];

    return (
        <>
            <Stack direction="horizontal">
                <ProductToggler onClick={() => CartStore.deleteItemFromCart(productId)}>-</ProductToggler>
                <ProductToggler onClick={() => CartStore.addItemToCart(productId)}>+</ProductToggler>
            </Stack>
            <div>Quantity: {productQuantity}</div>
        </>
    );
});

export default CartButtonGroup;