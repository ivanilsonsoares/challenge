import React from 'react';
import styled from 'styled-components';
type CustomButtonProps = {
  onChange: () => void,
  title: JSX.Element,
  colorButton: string,
  color: string,
  borderColor: string
}

const CustomButton: React.FC<CustomButtonProps> = (button: CustomButtonProps) => {
  return (
    <CustomButtonStyle 
      $color={button.color}
      $colorButton={button.colorButton}
      $borderColor={button.borderColor}
      className='custom-button'
      onClick={button.onChange}
    > 
      {button.title}
    </CustomButtonStyle>
  );
};

const CustomButtonStyle = styled.button<{ $colorButton: string; $color: string; $borderColor: string }>`
  display: flex;
  text-decoration: none;
  background-color: ${props => props.$colorButton};
  color: ${props => props.$color};
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 3px;
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid ${props => props.$borderColor};
`


export default CustomButton