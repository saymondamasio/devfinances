import styled from 'styled-components'

export const Container = styled.main`
  margin: 0 auto;
`

export const Main = styled.div`
  width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-top: 64px;
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
    /* identical to box height */

    text-align: center;

    /* Títulos */

    color: #363f5f;
  }

  form {
    margin-top: 40px;

    background: #ffffff;
    border-radius: 5px;
    width: 736px;
    padding: 64px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .dropzone {
      width: 100%;
      height: 120px;
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23969CB3FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='32' stroke-linecap='square'/%3e%3c/svg%3e");
      border-radius: 5px;
      z-index: 10;

      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dropzone:hover {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%2349AA26FF' stroke-width='5' stroke-dasharray='6%2c 14' stroke-dashoffset='19' stroke-linecap='square'/%3e%3c/svg%3e");
    }

    .dropzone.reject {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23FF292EFF' stroke-width='5' stroke-dasharray='6%2c 14' stroke-dashoffset='19' stroke-linecap='square'/%3e%3c/svg%3e");
    }

    .dropzone span {
      font-size: 16px;
      line-height: 24px;
      /* identical to box height */

      /* Blue */

      color: #2d4a22;
    }

    footer {
      margin-top: 21px;

      width: 100%;
      display: flex;
      justify-content: space-between;

      span {
        display: flex;
        align-items: center;
        gap: 12px;

        font-size: 12px;
        line-height: 18px;
        /* identical to box height */

        /* Textos */

        color: #969cb3;
      }

      button {
        width: 224px;
        padding: 15px 20px;
        border-radius: 5px;

        display: flex;
        align-items: center;
        justify-content: center;
        background: #49aa26;
        border: none;

        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        /* identical to box height */

        text-align: center;

        /* Shape principal */

        color: #ffffff;
      }
    }
  }
`
