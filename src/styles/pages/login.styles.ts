import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  background: #2a6315;

  display: flex;
  align-items: center;
  justify-content: center;

  main {
    max-width: 420px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-top: 50px;

      font-weight: 600;
      font-size: 36px;
      line-height: 46px;
      /* identical to box height, or 128% */

      color: #ffffff;
    }

    p {
      margin-top: 20px;

      font-size: 18px;
      line-height: 46px;
      /* identical to box height, or 128% */

      color: #ffffff;
    }

    button {
      margin-top: 24px;
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

      img {
        margin-right: 24px;
      }
    }
  }
`
