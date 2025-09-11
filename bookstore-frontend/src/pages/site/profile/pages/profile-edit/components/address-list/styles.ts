import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 32px;
`

export const Header = styled.div`
  margin-bottom: 20px;
`

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_800};
  margin-bottom: 8px;
`

export const RequiredMessage = styled.div`
  padding: 12px 16px;
  background: ${({ theme }) => theme.COLORS.WARNING_LIGHT};
  border: 1px solid ${({ theme }) => theme.COLORS.WARNING_MAIN};
  border-radius: 8px;
  color: ${({ theme }) => theme.COLORS.WARNING_DARKER};
  font-size: 0.875rem;
  font-weight: 500;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  background: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  border-radius: 12px;
`

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
`

export const EmptyTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_700};
  margin-bottom: 8px;
`

export const EmptyDescription = styled.p`
  color: ${({ theme }) => theme.COLORS.NEUTRAL_500};
  font-size: 0.875rem;
`

export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const AddressCard = styled.div<{ $isMain: boolean }>`
  background: ${({ theme }) => theme.COLORS.NEUTRAL_50};
  border: 2px solid ${({ theme }) => theme.COLORS.NEUTRAL_200};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

export const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`

export const AddressName = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.NEUTRAL_800};
  display: flex;
  align-items: center;
  gap: 8px;
`

export const AddressType = styled.span`
  background: ${({ theme }) => theme.COLORS.SECONDARY_MAIN};
  color: ${({ theme }) => theme.COLORS.SECONDARY_DARKER};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
`

export const AddressInfo = styled.div`
  margin-bottom: 16px;
`

export const AddressLine = styled.p`
  color: ${({ theme }) => theme.COLORS.NEUTRAL_600};
  font-size: 0.875rem;
  margin-bottom: 4px;
  line-height: 1.4;

  &:last-child {
    margin-bottom: 0;
  }
`

export const AddressActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`
