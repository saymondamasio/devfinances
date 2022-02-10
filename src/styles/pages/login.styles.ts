import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  background: #2a6315;

  > div {
    max-width: 1440px;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  > div > img {
    position: absolute;
    left: 0;
    z-index: 0;
  }

  main {
    max-width: 420px;
    margin-right: 10%;
    z-index: 100;
  }

  main h1 {
    margin-top: 96px;

    font-weight: 600;
    font-size: 36px;
    line-height: 46px;
    /* identical to box height, or 128% */

    color: #ffffff;
  }

  main button {
    margin-top: 24px;
    width: 318px;
    background-color: transparent;
    padding: 15px 20px;

    border: 1px solid #a8a8b3;
    border-radius: 8px;

    display: flex;
    align-items: center;

    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    /* or 150% */

    /* Texto Azul */

    color: #e0e3ff;

    text-align: left;
  }

  main button img {
    margin-right: 24px;
  }
`
