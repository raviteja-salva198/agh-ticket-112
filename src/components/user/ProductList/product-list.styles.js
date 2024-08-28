import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
`;

export const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

export const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ProductName = styled.h2`
  margin-top: 0;
  color: #333;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  color: #0066cc;
`;

export const ExpandButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const DetailsContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: ${props => props.disabled ? '#ccc' : '#4CAF50'};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#45a049'};
  }
`;

export const LinkContainer = styled.div`
  margin-top: 10px;
`;