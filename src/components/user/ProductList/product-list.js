import React, { useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import productsData from './data.json';


const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap:wrap;
  gap: 20px;
  justify-content:center;
`;

const ProductCard = styled.div`
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${rgba('#000', 0.1)};
  justify-content:space-between;
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  text-align:left;
  position: relative;
  height:320px;
  width:250px;
  padding:20px;
`;

const ProductImage = styled.img`
  height: 100px;
  width:100px;
  border-radius:10px;
`;

const ProductInfo = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 10px;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 10px;
`;

const ProductCommission = styled.p`
  font-weight: bold;
  color: #28a745;
  margin: 0 0 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap:10px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 13px;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background-color: ${props => props.primary ? '#0056b3' : '#5a6268'};
  }
`;

const LinkContainer = styled.div`
  margin-top: 15px;
  display: flex;
`;

const LinkInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 0.9rem;
`;

const CopyButton = styled(Button)`
  border-radius: 0 4px 4px 0;
`;

const OutOfStock = styled.div`
  background-color: rgba(220, 53, 69, 0.8);
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-weight: bold;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

const PopupTitle = styled.h2`
  margin-top: 0;
  color: #333;
`;

const PopupDescription = styled.p`
  color: #666;
`;

const PopupCommission = styled.p`
  font-weight: bold;
  color: #28a745;
`;


const ProductList = () => {
  const [generatedLinks, setGeneratedLinks] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const generateLink = (productId) => {
    const product = productsData.find(p => p.id === productId);
    if (!product.inStock) return;
    const uniqueId = Math.random().toString(36).substring(7);
    const link = `https://example.com/affiliate/${uniqueId}/${productId}`;
    setGeneratedLinks(prev => ({
      ...prev,
      [productId]: link
    }));
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const openPopup = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <AppContainer>
      <Title>Affiliate Marketing Products</Title>
      <ProductGrid>
        {productsData.map(product => (
          <ProductCard key={product.id}>
            <ProductImage src={product.imageUrl} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductCommission>Commission: {product.commission}%</ProductCommission>
              <ButtonContainer>
                <Button onClick={() => openPopup(product)}>Show Details</Button>
                <Button 
                  primary 
                  onClick={() => generateLink(product.id)}
                  disabled={!product.inStock}
                >
                  Generate Link
                </Button>
              </ButtonContainer>
              {generatedLinks[product.id] && (
                <LinkContainer>
                  <LinkInput type="text" value={generatedLinks[product.id]} readOnly />
                  <CopyButton onClick={() => copyToClipboard(generatedLinks[product.id])}>
                    Copy
                  </CopyButton>
                </LinkContainer>
              )}
            </ProductInfo>
            {!product.inStock && <OutOfStock>Out of Stock</OutOfStock>}
          </ProductCard>
        ))}
      </ProductGrid>
      {selectedProduct && (
        <PopupOverlay onClick={closePopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closePopup}>&times;</CloseButton>
            <PopupTitle>{selectedProduct.name}</PopupTitle>
            <ProductImage src={selectedProduct.imageUrl} alt={selectedProduct.name} />
            <PopupDescription>{selectedProduct.description}</PopupDescription>
            <PopupCommission>Commission: {selectedProduct.commission}%</PopupCommission>
            <PopupDescription>{selectedProduct.marketingMaterials}</PopupDescription>
            {selectedProduct.inStock ? (
              <p>In Stock</p>
            ) : (
              <p style={{ color: 'red' }}>Out of Stock</p>
            )}
            {/* Add any additional details you want to show */}
          </PopupContent>
        </PopupOverlay>
      )}
    </AppContainer>
  );
};



export default ProductList;






// const ProductList = () => {
//   const [generatedLinks, setGeneratedLinks] = useState({});

//   const generateLink = (productId) => {
//     const product = productsData.find(p => p.id === productId);
//     if (!product.inStock) return;
//     const uniqueId = Math.random().toString(36).substring(7);
//     const link = `https://example.com/affiliate/${uniqueId}/${productId}`;
//     setGeneratedLinks(prev => ({
//       ...prev,
//       [productId]: link
//     }));
//   };

//   const copyToClipboard = (link) => {
//     navigator.clipboard.writeText(link);
//     alert('Link copied to clipboard!');
//   };

//   return (
//     <AppContainer>
//       <Title>Affiliate Marketing Products</Title>
//       <ProductGrid>
//         {productsData.map(product => (
//           <ProductCard key={product.id}>
//             <ProductImage src={product.imageUrl} alt={product.name} />
//             <ProductInfo>
//               <ProductName>{product.name}</ProductName>
//               <ProductDescription>{product.description}</ProductDescription>
//               <ProductCommission>Commission: {product.commission}%</ProductCommission>
//               <ButtonContainer>
//                 <Button>Show Details</Button>
//                 <Button 
//                   primary 
//                   onClick={() => generateLink(product.id)}
//                   disabled={!product.inStock}
//                 >
//                   Generate Link
//                 </Button>
//               </ButtonContainer>
//               {generatedLinks[product.id] && (
//                 <LinkContainer>
//                   <LinkInput type="text" value={generatedLinks[product.id]} readOnly />
//                   <CopyButton onClick={() => copyToClipboard(generatedLinks[product.id])}>
//                     Copy
//                   </CopyButton>
//                 </LinkContainer>
//               )}
//             </ProductInfo>
//             {!product.inStock && <OutOfStock>Out of Stock</OutOfStock>}
//           </ProductCard>
//         ))}
//       </ProductGrid>
//     </AppContainer>
//   );
// };