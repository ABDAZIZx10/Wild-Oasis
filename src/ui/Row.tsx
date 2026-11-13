import styled, { css } from "styled-components";
import type { HTMLAttributes } from "react";

type RowProps = {
  type?: "horizontal" | "vertical";
} & HTMLAttributes<HTMLDivElement>;

const Row = styled.div.attrs<RowProps>((props) => ({
  type: props.type || "vertical",
}))<RowProps>`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type !== "horizontal" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
