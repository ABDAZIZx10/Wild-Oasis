import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type MouseEvent,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;


const StyledToggle = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type Position = { x: number; y: number };

const StyledList = styled.ul<
  { position: Position | null } & HTMLAttributes<HTMLUListElement>
>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position?.x ?? 0}px;
  top: ${(props) => props.position?.y ?? 0}px;
`;

const StyledButton = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusContextValue = {
  openId: string | number;
  close: () => void;
  open: (id: string | number) => void;
  position: Position | null;
  setPosition: (pos: Position) => void;
};

const MenusContext = createContext<MenusContextValue | null>(null);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | number>("");
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string | number }) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Menus.Toggle used outside Menus");
  const { openId, close, open, setPosition } = context;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const rect = (e.target as HTMLElement)
      .closest("button")!
      .getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({
  id,
  children,
}: {
  id: string | number;
  children: ReactNode;
}) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Menus.List used outside Menus");
  const { openId, position, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close, false);

  if (openId !== id) return null;

  return createPortal(
    <div ref={ref}>
      <StyledList position={position}>{children}</StyledList>
    </div>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
  disabled,
}: {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Menus.Button used outside Menus");
  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
