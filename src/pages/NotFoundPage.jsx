import { Link } from "react-router-dom";
import styled from "styled-components";

const Page = styled.main`
  min-height: 100vh; min-height: 100dvh;
  display: grid; place-items: center;
  padding: 24px; text-align: center;
  h1 { color: #565eef; font-size: clamp(64px, 15vw, 100px); line-height: 1.1; }
  p { margin: 16px 0 24px; font-size: 20px; }
  a { display: inline-block; padding: 12px 18px; border-radius: 4px; background: #565eef; color: white; }
  a:hover { background: #33399b; }
`;
export default function NotFoundPage() {
  return <Page><div><h1>404</h1><p>Страница не найдена</p><Link to="/">Вернуться на главную</Link></div></Page>;
}
