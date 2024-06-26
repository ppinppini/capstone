import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import styled from "styled-components";
import homeImg from "../../assets/homeImg.png";
import { Footer } from "../../components/Footer";
import orange from "../../assets/orange.png";
import style from "./Home.module.css";
import fair from "../../assets/fair.png";

export const Home = () => {
    const navigate = useNavigate();
    const nextPage = () => {
        navigate("/survey");
    };
    const Head = styled.header`
        text-align: center;
        padding-top: 10px;
        padding-left: 10px;
        margin-bottom: 4em;
    `;
    const Main = styled.div`
        text-align: center;
    `;
    const Button = styled.button`
        width: 445px;
        height: 76px;
        background-color: #ffff;
        border: 1px solid #fe7f38;
        border-radius: 40px;
        margin: 0 auto;
        margin-top: 1rem;
        margin-bottom: 2.5rem;
        font-size: 16px;
        color: #fe7f38;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 1px;
        cursor: pointer;
        box-shadow: inset 0 0 0 0 #fe7f38;
        -webkit-transition: ease-out 0.4s;
        -moz-transition: ease-out 0.4s;
        transition: ease-out 0.4s;

        &:hover {
            background-color: #ffff; /* 버튼의 배경색을 어둡게 변경 */
            color: #ffff;
            border: 1px solid #ffff;
            cursor: pointer;
            font-size: 20px;
            box-shadow: inset 400px 0 0 0 #fe7f38;
        }
    `;

    return (
        <div>
            <Head>
                <img src={orange} alt="orange" className={style.orange} />
                <img src={logo} alt="로고 이미지" />
            </Head>
            <Main>
                <img src={homeImg} alt="홈 로고 이미지" className={style.homeImg} />
            </Main>
            <Button onClick={nextPage}>전공 찾기</Button>
            <img src={fair} alt="orange" className={style.fair} />
            <Footer></Footer>
        </div>
    );
};
