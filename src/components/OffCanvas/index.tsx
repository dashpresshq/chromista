import Offcanvas from "react-bootstrap/Offcanvas";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { Divider, Stack, Typo } from "../../ui-blocks";
import { SoftButton } from "../Button";
import { USE_ROOT_COLOR } from "../../theme";
import { NextPortal } from "../_/NextPortal";

export interface IProps {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  width?: number;
}

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const StyledBody = styled.div`
  flex-grow: 1;
  padding: 1rem;
  padding-top: 0.5rem;
  overflow-y: auto;
`;

const StyledRoot = styled.div<{ width: number }>`
  position: fixed;
  bottom: 0;
  z-index: 1045;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  visibility: hidden;
  background-color: ${USE_ROOT_COLOR("base-color")};
  background-clip: padding-box;
  outline: 0;
  transition: transform 0.3s ease-in-out;

  top: 0;
  right: 0;
  width: ${(props) => props.width}px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  transform: translateX(100%);

  &.show {
    transform: none;
  }
`;

const DEFAULT_CANVAS_WIDTH = 400;

export function OffCanvas({
  show,
  onClose,
  title,
  children,
  width = DEFAULT_CANVAS_WIDTH,
}: IProps) {
  return (
    <NextPortal>
      <StyledRoot
        as={Offcanvas}
        show={show}
        onHide={onClose}
        placement="end"
        width={width}
      >
        {show && (
          <>
            <StyledHeader>
              <Stack justify="space-between" align="center">
                <Typo.MD weight="bold">{title}</Typo.MD>
                <div>
                  <SoftButton
                    justIcon
                    icon="close"
                    action={onClose}
                    size="sm"
                  />
                </div>
              </Stack>
            </StyledHeader>
            <Divider />
            <StyledBody>{children}</StyledBody>
          </>
        )}
      </StyledRoot>
    </NextPortal>
  );
}
