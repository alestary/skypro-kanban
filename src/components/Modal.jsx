import { useEffect, useRef } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: 16px; background: rgba(35,39,45,.48);
`;
const Panel = styled.section`
  width: 100%; max-width: ${({ $wide }) => $wide ? "760px" : "570px"};
  max-height: calc(100dvh - 32px); overflow-y: auto;
  padding: 32px 30px; border: 1px solid #d4dbe5; border-radius: 10px;
  background: white; box-shadow: 0 8px 30px rgba(0,0,0,.08);
  @media (max-width: 600px) { padding: 24px 16px; }
`;
const focusable = 'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]';

export default function Modal({ children, titleId, onClose, busy = false, wide = false }) {
  const panel = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    (panel.current.querySelector(focusable) || panel.current).focus();
    return () => {
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, []);

  function onKeyDown(event) {
    if (event.key === "Escape" && !busy) { event.preventDefault(); onClose(); }
    if (event.key !== "Tab") return;
    const items = [...panel.current.querySelectorAll(focusable)];
    const first = items[0];
    const last = items.at(-1);
    if (!first) { event.preventDefault(); return; }
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  return <Overlay onMouseDown={(event) => {
    if (event.target === event.currentTarget && !busy) onClose();
  }}>
    <Panel ref={panel} $wide={wide} role="dialog" aria-modal="true" aria-labelledby={titleId}
      aria-busy={busy} tabIndex={-1} onKeyDown={onKeyDown}>{children}</Panel>
  </Overlay>;
}
