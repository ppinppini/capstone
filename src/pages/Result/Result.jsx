import axios from "axios";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import style from "./Result.module.css";
import resultImg from "../../assets/resultImg.png";

const result = [
    {
        name: "문기태",
        studentid: "2019162014",
        result: 1,
    },
    {
        name: "최경태",
        studentid: "2021162502",
        result: 2,
    },
    {
        name: "황유빈",
        studentid: "2019172043",
        result: 3,
    },
];

export const Result = () => {
    // axios
    //     .get("http://localhost:8080")
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     .then(function () {
    //         // 항상 실행
    //     });

    return (
        <div>
            <Header></Header>
            <div className={style.main} style={{ backgroundImage: `url(${resultImg})` }}>
                <div className={style.resultBox}>
                    <h1 className={style.resultMajor}>빅데이터 인공지능 전공</h1>
                    <div className={style.서비스멘트}>이 분야에서 여러분의 잠재력을 펼칠 수 있을 거예요!</div>
                    <div className={style.들어야되는멘트}>
                        <div>전공픽의 정보처리 결과</div>
                        <div>김픽미님의 적성과 성향을 고려한 결과로</div>
                        <div>김픽미님의 적성에 딱 맞는 전공을 찾았어요! 축하드려요! 이것은 여러분이 진정으로 흥미를 느낄 수 있는 분야일 거예요.</div>
                    </div>
                </div>
            </div>

            {/* <p>{json.stringify(response)}</p> */}

            <Footer></Footer>
        </div>
    );
};
