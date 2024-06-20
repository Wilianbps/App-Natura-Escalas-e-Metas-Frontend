import styled from '@emotion/styled'

export const ContainerSidebar = styled.aside`
  background: linear-gradient(
    180deg,
    rgba(255, 192, 0, 0.1) 74%,
    rgba(217, 217, 217, 0) 100%
  );
  z-index: 10;
`

export const Header = styled.header`
  height: 6.25rem;
  /*   border-bottom: solid 1px #cfd1d4; */
  padding: 1.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    padding: 0;
    cursor: pointer;
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
    max-width: 5.625rem;
  }
`

export const ContentSidebarNavigation = styled.section`
  padding: 1rem 1.7rem 1.7rem;
  height: calc(100% - 100px);
`
