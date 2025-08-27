import styled from 'styled-components'

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.SPACING.SM};
  margin-bottom: ${(props) => props.theme.SPACING.MD};
`

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${(props) => props.theme.SPACING.XS};
  font-size: ${(props) => props.theme.FONT_SIZE.SMALL};
  color: ${(props) => props.theme.COLORS.NEUTRAL_600};
  line-height: 1.4;

  svg {
    color: ${(props) => props.theme.COLORS.NEUTRAL_500};
    flex-shrink: 0;
    margin-top: 2px;
  }

  span {
    word-break: break-word;
  }
`

export const AddressText = styled.span`
  line-height: 1.4;
  word-break: break-word;
`
