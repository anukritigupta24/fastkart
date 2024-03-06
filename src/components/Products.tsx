import { useEffect, useState } from "react";
import { Container, Row, Col, Stack, Button } from 'react-bootstrap';
import { Product } from "../types";
import styled from "styled-components";
import { observer } from 'mobx-react';
import ProductsStore from "../stores/ProductsStore";
import useThrottleFunction from "../customHooks/useThrottle";
import CartStore from "../stores/CartStore";
import { NavLink } from "react-router-dom";
import CartButtonGroup from "./CartButtonGroup";

const StyledContainer = styled(Container)`
    margin-top: 32px;
`;

const StyledCol = styled(Col)`
    // border: 1px solid gray;
`;

const StyledProduct = styled(Stack)`
    margin-inline: auto;
    border: 1px solid lightgray;
    width: 85%;
    height: 80%;
    margin: 40px;
    padding: 40px;
    justify-content: space-between;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 60%;
    overflow: hidden;
`;

const ProductTitle = styled.div`
    text-align: center;
    font-size: 30px;
    font-weight: 600;
`;

const ProductDescription = styled.div`
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
`;

const ProductPriceStack = styled(Stack)`
    justify-content: space-between;
    margin: 0px 16px;
`;

const ProductPrice = styled.div`
    font-size: 24px;
    font-weight: 600;
`;

const ViewCartButton = styled.div`
    position: fixed;
    top: 10px;
    right: 60px;
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
`;

const Products = observer(() => {
    const handleScroll = useThrottleFunction(() => {
        ProductsStore.incrementSkip();
      }, 1000);

    useEffect(() => {
        ProductsStore.fetchProducts();
    }, [ProductsStore.skip]);

    useEffect(() => {  
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return(
        <StyledContainer fluid data-testid="products-page">
            <ViewCartButton>
                <Button variant="warning"><StyledNavLink to="/cart">View Cart</StyledNavLink></Button>
            </ViewCartButton>
            <Row>
                {
                    ProductsStore.products?.map((product: Product, index: number) => {
                        let productQuantity: number = CartStore.cartItems[product.id];

                        return (
                            <StyledCol xs={12} sm={12} md={6} lg={3} key={index}>
                                <StyledProduct>
                                    <StyledImg src={product.thumbnail} />
                                    <ProductTitle>{product.title}</ProductTitle>
                                    <ProductDescription>{product.description}</ProductDescription>
                                    <ProductPriceStack direction="horizontal">
                                        <ProductPrice>₹{product.price}</ProductPrice>
                                        {
                                            productQuantity ? (
                                                <CartButtonGroup productId={product.id} />
                                            ) : (
                                                <Button variant="primary" size="sm" onClick={() => CartStore.addItemToCart(product.id)}>Add to Cart</Button>

                                            )
                                        }
                                    </ProductPriceStack> 
                                </StyledProduct>
                            </StyledCol>
                        );
                    })
                }
            </Row>
        </StyledContainer>
    );
});

export default Products;