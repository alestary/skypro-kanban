
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 660px) {
    align-items: flex-start;
    padding: 0;
  }
`;

const Panel = styled.section`
  width: 100%;
  max-width: 630px;
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  box-sizing: border-box;
  padding: 40px 30px 38px;
  border: 0.7px solid #d4dbe5;
  border-radius: 10px;
  background: #ffffff;
  color: #000000;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  font-family: Roboto, Arial, Helvetica, sans-serif;

  @media screen and (max-width: 660px) {
    max-height: 100dvh;
    min-height: 100dvh;
    border-radius: 0;
  }

  @media screen and (max-width: 495px) {
    padding: 20px 16px 32px;
  }
`;

const focusable =
  'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]';

export default function Modal({
  children,
  titleId,
  onClose,
  busy = false,
}) {
  const panel = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const firstElement = panel.current?.querySelector(focusable);
    (firstElement || panel.current)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;

      if (previous?.isConnected) {
        previous.focus();
      }
    };
  }, []);

  function onKeyDown(event) {
    if (event.key === "Escape" && !busy) {
      event.preventDefault();
      onClose();
    }

    if (event.key !== "Tab") return;

    const items = [
      ...panel.current.querySelectorAll(focusable),
    ];

    const first = items[0];
    const last = items[items.length - 1];

    if (!first) {
      event.preventDefault();
      return;
    }

    if (
      event.shiftKey &&
      (document.activeElement === first ||
        document.activeElement === panel.current)
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <Overlay
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) {
          onClose();
        }
      }}
    >
      <Panel
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-busy={busy}
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        {children}
      </Panel>
    </Overlay>
  );
}
