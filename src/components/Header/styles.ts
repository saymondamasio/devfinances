import styled from 'styled-components'

export const Container = styled.header`
  background-color: var(--green);
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1rem 12rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    ul {
      display: flex;
      list-style: none;
      gap: 32px;

      li a {
        text-decoration: none;

        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height */

        /* Shape principal */

        color: #ffffff;
      }

      li {
        position: relative;
      }
      a.active {
        font-weight: 600;
      }

      a.active::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        background: var(--green-light);
        height: 2px;
      }
    }
  }
`
