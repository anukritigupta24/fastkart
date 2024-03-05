import { Col, Container, Stack } from "react-bootstrap";
import CartStore from "../stores/CartStore";
import styled from "styled-components";
import { toJS } from 'mobx'
import { observer } from 'mobx-react';
import ProductsStore from "../stores/ProductsStore";
import { Product } from "../types";
import CartButtonGroup from "./CartButtonGroup";

const Title = styled.div`
    font-size: 32px;
    font-weight: 600;
    padding-bottom: 40px;
`;

const StyledContainer = styled(Container)`
    height: 100vh;
`;

const StyledStack = styled(Stack)`
    margin: auto;
    margin-top: 8rem;
    align-items: center;
    gap: 12px;
    height: 100%;
    width: 90%;
`;

const StyledCartItem = styled(Stack)`
    gap: 20rem;
    height: 15%;
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 30px;
    padding: 10px;
`;

const StyledImg = styled.img`
    width: 20%;
    height: 80%;
    overflow: hidden;
    border-radius: 30px;
`;

const StyledTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

const Cart = observer(() => {
    return (
        <StyledContainer>
            <StyledStack>
                <Title>Cart</Title>
                {
                    Object.keys(CartStore.cartItems).map((productId) => {
                        const quantity = CartStore.cartItems[Number(productId)];
                        const currentProduct = ProductsStore.products.find((product) => product.id === Number(productId));
                        const { title, thumbnail, price } = currentProduct || {};

                        return quantity && quantity > 0 ? (
                            <StyledCartItem key={productId} direction="horizontal">
                                <StyledImg src={thumbnail} />
                                <Stack>
                                    <StyledTitle>{title}</StyledTitle>
                                    <CartButtonGroup productId={Number(productId)} />
                                </Stack>
                                <StyledTitle>₹{price}</StyledTitle>
                            </StyledCartItem>
                        ): null;
                    })
                }
                <StyledTitle>
                    Total cart value: ₹{CartStore.totalCartValue}
                </StyledTitle>
            </StyledStack>
        </StyledContainer>
    );
});

export default Cart;