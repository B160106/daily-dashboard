import styled from 'styled-components';
import { Switch } from '@mui/material';

export const SidebarContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--separator-color); /* Adjust color as needed */
  margin: 10px 0; /* Adjust spacing as needed */
`;

export const AccordionContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export const AccordionHeader = styled.div`
  font-family: var(--font-family-primary);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  color: var(--widget-text-color-primary);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: var(--widget-hover-background-color);
  }
`;

export const AccordionContent = styled.div`
  padding: 10px;
  background-color: var(--widget-background-color);
  border-radius: 5px;
  margin-top: 5px;
  animation: slide-down 0.3s ease-out;

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledSwitch = styled(Switch)`
  && {
    .MuiSwitch-switchBase {
      color: #d3d3d3; // Mild gray for the thumb when off

      &.Mui-checked {
        color: deeppink;

        .MuiSwitch-thumb {
          background-color: deeppink;

          &::before {
            content: '✔';
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 0.75rem;
            color: white;
          }
        }

        & + .MuiSwitch-track {
          background-color: deeppink;
        }
      }

      .MuiSwitch-thumb {
        background-color: #d3d3d3; // Mild gray for the thumb when off
        width: 1.5rem;
        height: 1.5rem;

        &::before {
          content: '✖';
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          font-size: 0.75rem;
          color: gray; // Darker gray for the cross mark
        }
      }
    }

    .MuiSwitch-track {
      background-color: #f5f5f5; // Mild gray for the track when off
    }
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`;
