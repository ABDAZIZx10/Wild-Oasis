import styled from "styled-components";
import type { LabelHTMLAttributes, ReactElement, ReactNode } from "react";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label<LabelHTMLAttributes<HTMLLabelElement>>`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowVerticalProps = {
  label?: string;
  error?: string;
  children: ReactElement<{ id?: string }> | ReactNode;
};

function FormRowVertical({ label, error, children }: FormRowVerticalProps) {
  const childId =
    children && typeof children === "object" && "props" in children
      ? children.props.id
      : undefined;

  return (
    <StyledFormRow>
      {label && <Label htmlFor={childId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
