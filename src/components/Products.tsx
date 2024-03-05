import { useEffect, useState } from "react";
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { Product } from "../types";
import styled from "styled-components";
import { inject, observer } from 'mobx-react';
import ProductsStore from "../stores/ProductsStore";
import { Table, Column } from'react-virtualized';
import useThrottleFunction from "../customHooks/useThrottle";

const StyledContainer = styled(Container)`
    margin-top: 32px;
`;

const StyledCol = styled(Col)`
    // border: 1px solid gray;

`;

const StyledProduct = styled(Stack)`
    margin-inline: auto;
    border: 1px solid lightgray;
    width: 400px;
    height: 550px;
    margin: 40px;
    padding: 40px;
    justify-content: flex-start;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 60%;
    overflow: hidden;
`;

const Products = observer(() => {
    const handleScroll = useThrottleFunction(() => {
        console.log('scrolling');
        ProductsStore.incrementSkip();
        ProductsStore.fetchProducts();
      }, 3000);
      

    useEffect(() => {
        ProductsStore.fetchProducts();
    }, []);

    useEffect(() => {  
    window.addEventListener('scroll', handleScroll);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
    }
    }, []);

    return(
        <StyledContainer fluid>
            <Row>
                {
                    ProductsStore.products?.map((product: Product) => (
                        <StyledCol xs={12} md={3} key={product.id}>
                            <StyledProduct>
                                <StyledImg src={product.thumbnail} />
                                <div>{product.title}</div>
                                <div>{product.price}</div>
                                <div>Add to Cart</div>
                            </StyledProduct>
                        </StyledCol>
                    ))
                
                }
            </Row>
            {/* <Table height={400} width={600} rowHeight={200} rowCount={5} headerHeight={0} rowGetter={()=>{

            }}>
                <Column
                dataKey="k"
                width={30}
                cellRenderer={(product: any)=>{
                    return <StyledProduct>
                    <StyledImg src={product.thumbnail} />
                </StyledProduct>
                }}
                />
            </Table> */}
        </StyledContainer>
    );
});

export default Products;