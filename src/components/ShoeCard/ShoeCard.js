import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <CardAlert type={variant} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price strikethrough={variant === "on-sale"}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {
            variant === "on-sale" ?
              <SalePrice>{formatPrice(salePrice)}</SalePrice> : null
          }
        </Row>
      </Wrapper>
    </Link>
  );
};

const CardAlert = ({
  type
}) => {
  let color, text;
  if(type === 'on-sale') {
    color = COLORS.primary;
    text = 'Sale';
  } else if(type === 'new-release') {
    color = COLORS.secondary;
    text = 'Just Released!'
  } else {
    return null;
  }

  return (
    <StyledLabel style={{ '--color': color }}>{text}</StyledLabel>
  );
}

const StyledLabel = styled.label`
  padding: 5px 10px;
  background-color: var(--color);
  position: absolute;
  right: -4px;
  top: 12px;
  color: ${COLORS.white};
  font-weight: 700;
  border-radius: 2px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 350px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${p => p.strikethrough 
          ? 'text-decoration: line-through;' +
          ' color: ' + COLORS.gray[700] + ';' : ''}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
