import styled from 'styled-components/native'
import theme from '../styles/theme'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Header>
      <PageTitle>{title}</PageTitle>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Header>
  )
}

const Header = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`
const PageTitle = styled.Text`
  font-family: ${theme.fonts.black};
  font-size: 24px;
  color: ${theme.colors.primary};
`
const Subtitle = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.secondary};
`
