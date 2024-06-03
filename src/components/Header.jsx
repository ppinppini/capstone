import logo from "../assets/logo.png";
import logo_line from "../assets/logo_line.png";

import styled from "styled-components";
// Header 컴포넌트를 스타일링한 StyledHeader 컴포넌트를 정의합니다.

export default function Header() {
    const Head = styled.header`
        text-align: center;
    `;
    return (
        <Head>

            <img src={logo} className="logo" alt="" /> <br />
            <img src={logo_line} className="logo_line" alt="" />
        </Head>
    );
}
