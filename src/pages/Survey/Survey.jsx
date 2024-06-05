import { useState, useEffect } from "react";
import Header from "../../components/Header";
import styles from "../Login/Login.module.css";
import header from "../../assets/loginFooter.png";
import { json } from "react-router-dom";
import style from "./Survey.module.css";
import sex__icon from "../../assets/sex.png";
import major__icon from "../../assets/pencil.png";
import Select, { components } from "react-select";
import mbti_icon from "../../assets/mbti_icon.png";
import { Footer } from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const page1Questions = ["빅데이터인공지능전공은 나의 흥미를 유발한다.", "의료공학전공은 나의 흥미를 유발한다.", "의료경영전공은 나의 흥미를 유발한다."];
const page2Questions = ["가장 느낌이 가깝다", "가장 느낌이 멀다"];
const page3Questions = ["빅데이터인공지능전공의 이름이 마음에 든다.", "의료공학전공의 이름이 마음에 든다.", "의료경영전공의 이름이 마음에 든다."];
const page4Questions = ["가장 느낌이 가깝다", "가장 느낌이 멀다"];
const page5Questions = [
    "빅데이터인공지능전공으로 졸업하면 관련 직종으로 취업을 할 수 있을 것 같다",
    "의료공학전공으로 졸업하면 관련 직종으로 취업을 할 수 있을 것 같다",
    "의료경영전공으로 졸업하면 관련 직종으로 취업을 할 수 있을 것 같다",
];
const page6Questions = ["가장 느낌이 가깝다", "가장 느낌이 멀다"];

const choices = [
    { id: 0, label: "매우 낮음", value: 1, className: "veryLow" },
    { id: 1, label: "낮음", value: 2, className: "low" },
    { id: 2, label: "보통", value: 3, className: "commonly" },
    { id: 3, label: "높음", value: 4, className: "high" },
    { id: 4, label: "매우 높음", value: 5, className: "veryHigh" },
];
const choices2 = [
    { label: "매우 낮음", value: 1 },
    { label: "매우 높음", value: 2 },
];
const choices3 = [
    { id: 0, label: "빅데이터 인공지능전공", value: 1, className: "bigData" },
    { id: 1, label: "의료공학전공", value: 2, className: "medicalEngeneering" },
    { id: 2, label: "의료경영전공", value: 3, className: "medicalManagement" },
];
const result = 1000;

const options = [
    { value: "0000", label: "ISTJ" },
    { value: "0001", label: "ISTP" },
    { value: "0010", label: "ISFJ" },
    { value: "0011", label: "ISFP" },
    { value: "0100", label: "INTJ" },
    { value: "0101", label: "INTP" },
    { value: "0110", label: "INFJ" },
    { value: "0111", label: "INFP" },
    { value: "1000", label: "ESTJ" },
    { value: "1001", label: "ESTP" },
    { value: "1010", label: "ESFJ" },
    { value: "1011", label: "ESFP" },
    { value: "1100", label: "ENTJ" },
    { value: "1101", label: "ENTP" },
    { value: "1110", label: "ENFJ" },
    { value: "1111", label: "ENFP" },
];
const CustomPlaceholder = (props) => {
    return (
        <components.Placeholder {...props}>
            <div className={style.mbti}>
                <img src={mbti_icon} alt="mbti_icon" style={{ marginRight: 8 }} />
                <span className={style.mbtiPlaceholder}>MBTI 선택</span>
            </div>
        </components.Placeholder>
    );
};

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: "none",
        borderColor: state.isFocused ? "#fe7f38" : "#ccc",
        boxShadow: state.isFocused ? "0 0 0 1px #fe7f38" : "none",
        backgroundColor: state.hasValue ? "#fe7f38" : "white",
        cursor: "pointer",
        borderRadius: 8,
        "&:hover": {
            borderColor: state.isFocused ? "#fe7f38" : "#aaa",
        },
        whiteSpace: "nowrap",
        height: "70px", // 추가된 높이 설정
        fontSize: "22px", // 폰트 크기 설정
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,
        borderRadius: 8,
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        transition: "transform 0.3s ease", // 애니메이션 효과를 위한 설정
        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null, // 열려있을 때 회전
    }),
    option: (provided, state) => ({
        ...provided,
        borderRadius: 8,
        backgroundColor: state.isSelected ? "#fe7f38" : state.isFocused ? "#fe7f38" : "#ffff",
        color: state.isSelected ? "white" : "black",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: state.isSelected ? "#fe7f38" : "#fe7f38",
        },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        backgroundColor: "#fe7f38",
        color: "white",
        padding: 5,
        borderRadius: 5,
        fontSize: "22px", // 폰트 크기 설정
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        borderRadius: 8,
        backgroundColor: state.hasValue ? "#fe7f38" : "white",
        height: "100%", // valueContainer 높이를 부모 요소에 맞춤
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        borderRadius: 8,
        backgroundColor: state.hasValue ? "#fe7f38" : "white",
        height: "100%", // indicatorsContainer 높이를 부모 요소에 맞춤
    }),
    input: (provided) => ({
        ...provided,
        caretColor: "transparent", // 커서 깜빡임을 투명하게 설정
        fontSize: "22px", // 폰트 크기 설정
    }),
    container: (provided) => ({
        ...provided,
        width: "80%",

        margin: "0 auto",
        marginTop: 60,

        // margin-top을 100px로 설정
    }),
};

const Survey = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [name, setName] = useState("");
    const [studentid, setStudentID] = useState("");
    const [major, setCurrentMajor] = useState("");
    const [sex, setSex] = useState("");
    const [mbti, setMbti] = useState("");
    const [responsesPage1, setResponsesPage1] = useState(Array(page1Questions.length).fill(null));
    const [responsesPage2, setResponsesPage2] = useState(Array(page2Questions.length).fill(null));
    const [responsesPage3, setResponsesPage3] = useState(Array(page3Questions.length).fill(null));
    const [responsesPage4, setResponsesPage4] = useState(Array(page4Questions.length).fill(null));
    const [responsesPage5, setResponsesPage5] = useState(Array(page5Questions.length).fill(null));
    const [responsesPage6, setResponsesPage6] = useState(Array(page6Questions.length).fill(null));
    const [errorMessage, setErrorMessage] = useState("");
    const [result, setResult] = useState("");
    const [surveyBtnPage1, setSurveyBtnPage1] = useState("");
    const [surveyBtnPage2, setSurveyBtnPage2] = useState("");
    const [surveyBtnPage3, setSurveyBtnPage3] = useState("");
    const [surveyBtnPage4, setSurveyBtnPage4] = useState("");
    const [surveyBtnPage5, setSurveyBtnPage5] = useState("");
    const [surveyBtnPage6, setSurveyBtnPage6] = useState("");
    const [surveyBtnStyle, setSurveyBtnStyle] = useState({
        backgroundColor: "#ccc",
        color: "#000",
        transition: "background-color 3s ease",
    });
    useEffect(() => {
        const allAnswered = responsesPage1.every((response) => response !== null);
        if (allAnswered == true) {
            setSurveyBtnPage1({
                backgroundColor: "#fe7f38",
                color: "#fff",
                transition: "background-color 1s ease",
                border: "1px solid #ffff",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        } else {
            setSurveyBtnPage1({
                backgroundColor: "#ffff",
                color: "#fe7f38",
                border: "1px solid #fe7f38",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        }
    }, [responsesPage1]);
    useEffect(() => {
        const allAnswered = responsesPage2.every((response) => response !== null);
        if (allAnswered == true) {
            setSurveyBtnPage2({
                backgroundColor: "#fe7f38",
                color: "#fff",
                transition: "background-color 1s ease",
                border: "1px solid #ffff",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        } else {
            setSurveyBtnPage2({
                backgroundColor: "#ffff",
                color: "#fe7f38",
                border: "1px solid #fe7f38",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        }
    }, [responsesPage2]);
    useEffect(() => {
        const allAnswered = responsesPage3.every((response) => response !== null);
        if (allAnswered == true) {
            setSurveyBtnPage3({
                backgroundColor: "#fe7f38",
                color: "#fff",
                transition: "background-color 1s ease",
                border: "1px solid #ffff",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        } else {
            setSurveyBtnPage3({
                backgroundColor: "#ffff",
                color: "#fe7f38",
                border: "1px solid #fe7f38",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        }
    }, [responsesPage3]);

    useEffect(() => {
        const allAnswered = responsesPage4.every((response) => response !== null);
        if (allAnswered == true) {
            setSurveyBtnPage4({
                backgroundColor: "#fe7f38",
                color: "#fff",
                transition: "background-color 1s ease",
                border: "1px solid #ffff",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        } else {
            setSurveyBtnPage4({
                backgroundColor: "#ffff",
                color: "#fe7f38",
                border: "1px solid #fe7f38",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        }
    }, [responsesPage4]);
    useEffect(() => {
        const allAnswered = responsesPage5.every((response) => response !== null);
        if (allAnswered == true) {
            setSurveyBtnPage5({
                backgroundColor: "#fe7f38",
                color: "#fff",
                transition: "background-color 1s ease",
                border: "1px solid #ffff",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        } else {
            setSurveyBtnPage5({
                backgroundColor: "#ffff",
                color: "#fe7f38",
                border: "1px solid #fe7f38",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        }
    }, [responsesPage5]);
    useEffect(() => {
        const allAnswered = responsesPage6.every((response) => response !== null);
        if (allAnswered == true) {
            setSurveyBtnPage6({
                backgroundColor: "#fe7f38",
                color: "#fff",
                transition: "background-color 1s ease",
                border: "1px solid #ffff",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
            });
        } else {
            setSurveyBtnPage6({
                backgroundColor: "#ffff",
                color: "#fe7f38",
                border: "1px solid #fe7f38",
                borderRadius: "15px",
                width: "33%",
                height: "50px",
                fontSize: "20px",
            });
        }
    }, [responsesPage6]);

    useEffect(() => {
        if (name && studentid && major && sex && mbti) {
            setSurveyBtnStyle({
                backgroundColor: "#fe7f38",
                color: "#fff",
                transition: "background-color 1s ease", // 배경색 변경 애니메이션 설정
            });
        } else {
            setSurveyBtnStyle({
                backgroundColor: "#ffff",
                color: "#fe7f38",
                border: "1px solid #fe7f38",
            });
        }
    }, [name, studentid, major, sex, mbti]);

    const handleliChange = (questionIndex, value, page) => {
        const setResponses = (setter, responses) => {
            const newResponses = [...responses];
            newResponses[questionIndex] = value;
            setter(newResponses);
            setErrorMessage(""); // Clear error message when an li is selected
        };

        switch (page) {
            case 1:
                setResponses(setResponsesPage1, responsesPage1);
                break;
            case 2:
                setResponses(setResponsesPage2, responsesPage2);
                break;
            case 3:
                setResponses(setResponsesPage3, responsesPage3);
                break;
            case 4:
                setResponses(setResponsesPage4, responsesPage4);
                break;
            case 5:
                setResponses(setResponsesPage5, responsesPage5);
                break;
            case 6:
                setResponses(setResponsesPage6, responsesPage6);
                break;
            default:
                break;
        }
    };

    const validateResponses = (responses) => {
        return responses.every((response) => response !== null);
    };

    const handleNextPage = () => {
        if (currentPage === 0) {
            if (name && studentid && studentid && major && sex && mbti) {
                setCurrentPage(currentPage + 1);
            }
        } else if (currentPage === 1) {
            if (responsesPage1.every((response) => response !== null)) {
                setCurrentPage(currentPage + 1);
            }
        } else if (currentPage === 2) {
            if (responsesPage2.every((response) => response !== null)) {
                setCurrentPage(currentPage + 1);
            }
        } else if (currentPage === 3) {
            if (responsesPage3.every((response) => response !== null)) {
                setCurrentPage(currentPage + 1);
            }
        } else if (currentPage === 4) {
            if (responsesPage4.every((response) => response !== null)) {
                setCurrentPage(currentPage + 1);
            }
        } else if (currentPage === 5) {
            if (responsesPage5.every((response) => response !== null)) {
                setCurrentPage(currentPage + 1);
            }
        } else if (currentPage === 6) {
            if (responsesPage6.every((response) => response !== null)) {
                setCurrentPage(currentPage + 1);
            }
        }
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const navigate = useNavigate();
    const nextPage = () => {
        navigate("/result");
    };
    const handleSubmit = () => {
        nextPage()
        if (!validateResponses(responsesPage6)) {
            setErrorMessage("모든 항목에 답해주세요.");
            return;
        }

        const responses = [...responsesPage1, ...responsesPage2, ...responsesPage3, ...responsesPage4, ...responsesPage5, ...responsesPage6];

        const interest1 = responses[0];
        const interest2 = responses[1];
        const interest3 = responses[2];
        const interest4 = responses[3];
        const interest5 = responses[4];
        const majorlike1 = responses[5];
        const majorlike2 = responses[6];
        const majorlike3 = responses[7];
        const majorlike4 = responses[8];
        const majorlike5 = responses[9];
        const jobemploy1 = responses[10];
        const jobemploy2 = responses[11];
        const jobemploy3 = responses[12];
        const jobemploy4 = responses[13];
        const jobemploy5 = responses[14];

        const formData = {
            name,
            studentid,
            major,
            sex,
            mbti,
            interest1,
            interest2,
            interest3,
            interest4,
            interest5,
            majorlike1,
            majorlike2,
            majorlike3,
            majorlike4,
            majorlike5,
            jobemploy1,
            jobemploy2,
            jobemploy3,
            jobemploy4,
            jobemploy5,
            result,
        };

        console.log("Form Data:", formData);
        fetch("http://localhost:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": `http://majorpick.s3-website.ap-northeast-2.amazonaws.com`,
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "liS,POST,GET",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        })
            .then((res) => {
                console.log(res);

                return res.json();
            })
            .then((res) => {
                console.log(res);
                setCurrentPage(currentPage + 1);
            });
    };

    const renderQuestions = (questions, choices, responses, page, labels) => {
        const renderLeftLabel = () => {
            if (choices === choices3) {
                return;
            } else {
                return <div className={style.choiceLeft}>매우 낮음</div>;
            }
        };
        const renderRigthLabel = () => {
            if (choices === choices3) {
                return;
            } else {
                return <div className={style.choiceRight}>매우 높음</div>;
            }
        };
        const getLabelText = (className) => {
            if (["bigData", "medicalEngeneering", "medicalManagement"].includes(className)) {
                const choice = choices.find((choice) => choice.className === className);
                return choice ? choice.label : "";
            }
            return "";
        };

        return (
            <div>
                {questions.map((question, index) => {
                    if ([page2Questions, page4Questions, page6Questions].includes(questions)) {
                        return (
                            <div key={index}>
                                <div className={style.choiceList}>
                                    <div className={style.labelMajor}>{question}</div>
                                    {renderLeftLabel()}
                                    {choices.map((choice) => {
                                        const inputId = `question-${index}-choice-${choice.id}`;
                                        return (
                                            <div key={choice.id} className={style.questionBtn}>
                                                <input
                                                    id={inputId}
                                                    type="radio"
                                                    name={`question-${index}-page${page}`}
                                                    value={choice.value}
                                                    checked={responses[index] === choice.value}
                                                    onChange={() => handleliChange(index, choice.value, page)}
                                                    className={style.questionBtnRadio}
                                                    required
                                                />
                                                <label
                                                    style={{ display: "block" }}
                                                    htmlFor={inputId}
                                                    className={` ${
                                                        choice.className === "veryLow"
                                                            ? style.veryLow
                                                            : choice.className === "low"
                                                            ? style.low
                                                            : choice.className === "commonly"
                                                            ? style.commonly
                                                            : choice.className === "high"
                                                            ? style.high
                                                            : choice.className === "veryHigh"
                                                            ? style.veryHigh
                                                            : choice.className === "bigData"
                                                            ? style.bigData
                                                            : choice.className === "medicalEngeneering"
                                                            ? style.medicalEngeneering
                                                            : choice.className === "medicalManagement"
                                                            ? style.medicalManagement
                                                            : choice.className === ""
                                                    }`}
                                                >
                                                    {getLabelText(choice.className)}
                                                </label>
                                            </div>
                                        );
                                    })}
                                    {renderRigthLabel()}
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className={style.choiceListBox}>
                                <h3>{question}</h3>
                                <div className={style.choiceList}>
                                    {renderLeftLabel()}
                                    {choices.map((choice) => {
                                        const inputId = `question-${index}-choice-${choice.id}`;
                                        return (
                                            <div key={choice.id} className={style.questionBtn}>
                                                <input
                                                    id={inputId}
                                                    type="radio"
                                                    name={`question-${index}-page${page}`}
                                                    value={choice.value}
                                                    checked={responses[index] === choice.value}
                                                    onChange={() => handleliChange(index, choice.value, page)}
                                                    className={style.questionBtnRadio}
                                                    required
                                                />
                                                <label
                                                    style={{ display: "block" }}
                                                    htmlFor={inputId}
                                                    className={` ${
                                                        choice.className === "veryLow"
                                                            ? style.veryLow
                                                            : choice.className === "low"
                                                            ? style.low
                                                            : choice.className === "commonly"
                                                            ? style.commonly
                                                            : choice.className === "high"
                                                            ? style.high
                                                            : choice.className === "veryHigh"
                                                            ? style.veryHigh
                                                            : choice.className === "bigData"
                                                            ? style.bigData
                                                            : choice.className === "medicalEngeneering"
                                                            ? style.medicalEngeneering
                                                            : choice.className === "medicalManagement"
                                                            ? style.medicalManagement
                                                            : choice.className === ""
                                                    }`}
                                                >
                                                    {getLabelText(choice.className)}
                                                </label>
                                            </div>
                                        );
                                    })}
                                    {renderRigthLabel()}
                                </div>
                            </div>
                        );
                    }
                })}
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        );
    };
    const allAnswered = responsesPage1.every((response) => response !== null);

    return (
        <>
            <Header />
            <div className={style.form}>
                {currentPage === 0 && (
                    <>
                        <h2 className={styles.formTitle}>
                            설문지를 만들었어요! <br />
                            회원정보를 입력해주세요.😀
                        </h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleNextPage();
                            }}
                            className={styles.form}
                            action="http://localhost:8080"
                            method="post"
                        >
                            <img src={header} alt="" className={styles.header} />
                            <h1 className={style.userInfo}>회원정보</h1>
                            <div htmlFor="name" className={style.userInfo} style={{ marginTop: "2rem", fontWeight: "600" }}>
                                개인정보입력
                            </div>
                            <br />
                            <input required className={style.name} type="text" id="name" placeholder="이름입력" onChange={(e) => setName(e.target.value)} />
                            <br />
                            <input required className={style.studentId} type="text" id="studentId" placeholder="학번입력" maxLength={10} onChange={(e) => setStudentID(e.target.value)} />
                            <div className={style.major__sex}>
                                <div className={style.currentMajor} onChange={(e) => setCurrentMajor(e.target.value)}>
                                    <div htmlFor="major" className={style.select_current_majorTitle}>
                                        <img src={major__icon} alt="전공 아이콘" style={{ width: "27px", height: "25px" }} className={style.major__icon} />
                                        <span className={style.select_current_Title_text} style={{ paddingTop: "2.5px" }}>
                                            현재 재직 학과 선택
                                        </span>
                                    </div>
                                    <div className={style.majorBox}>
                                        <input required className={style.majorBtn} id="major0" type="radio" value="빅데이터 인공지능" name="major" />
                                        <label htmlFor="major0" className={style.majorLabel}>
                                            빅데이터 인공지능
                                        </label>
                                        <input required className={style.majorBtn} type="radio" value="의료공학과" name="major" id="major1" />
                                        <label htmlFor="major1" className={style.majorLabel}>
                                            의료공학과
                                        </label>
                                        <input required className={style.majorBtn} type="radio" value="의료경영학과" name="major" id="major2" />
                                        <label htmlFor="major2" className={style.majorLabel}>
                                            의료경영학과
                                        </label>
                                    </div>
                                </div>
                                <div className={style.currentSex} onChange={(e) => setSex(e.target.value)}>
                                    <div htmlFor="sex" className={style.select_current_sexTitle}>
                                        <img src={sex__icon} alt="성별 아이" style={{ width: "37px", height: "19px", marginTop: "2.5px" }} className={style.sex__icon} />
                                        <span className={style.select_current_Title_text} style={{ paddingTop: "2.5px" }}>
                                            성별 선택
                                        </span>
                                    </div>
                                    <div className={style.sexBox}>
                                        <input required className={style.sexBtn} type="radio" value="남자" name="sex" id="man" />
                                        <label htmlFor="man" className={style.sexLabel}>
                                            남자
                                        </label>
                                        <input required className={style.sexBtn} type="radio" value="여자" name="sex" id="woman" />
                                        <label htmlFor="woman" className={style.sexLabel}>
                                            여자
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={style.mbtiBox}>
                                <Select
                                    options={options}
                                    styles={customStyles}
                                    components={{ Placeholder: CustomPlaceholder }}
                                    onChange={(selectedOption) => setMbti(selectedOption?.value)} // selectedOption is an array
                                    style={{ backgroundColor: "#ffff", marginTop: "100", width: "100%" }}
                                ></Select>
                            </div>
                            <button type="submit" className={style.surveyBtn} style={surveyBtnStyle}>
                                설문조사 시작하기
                            </button>
                        </form>
                    </>
                )}
                {currentPage === 1 && (
                    <>
                        <h2 className={styles.formTitle}>
                            학부별 전공흥미조사 질문을 만들었어요! <br />
                            해당 단어를 듣고 관심을 말해주세요.😁
                        </h2>
                        <div className={style.questionBox}>
                            <h1>학부별 전공 흥미 조사</h1>
                            {renderQuestions(page1Questions, choices, responsesPage1, 1, choices2)}

                            <button onClick={handleNextPage} style={surveyBtnPage1} className={style.surveyBtnPage}>
                                다음 페이지
                            </button>
                        </div>
                    </>
                )}
                {currentPage === 2 && (
                    <>
                        <h2 className={styles.formTitle}>
                            학부별 전공흥미조사 질문을 만들었어요! <br />
                            해당 단어를 듣고 관심을 말해주세요.😁
                        </h2>
                        <div className={style.questionBox}>
                            <h1>나의 흥미를 유발하는 전공이랑 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
                            {renderQuestions(page2Questions, choices3, responsesPage2, 2)}

                            <button onClick={handleNextPage} style={surveyBtnPage2} className={style.surveyBtnPage}>
                                다음 페이지
                            </button>
                        </div>
                    </>
                )}
                {currentPage === 3 && (
                    <>
                        <h2 className={styles.formTitle}>
                            학부별 전공흥미조사 질문을 만들었어요! <br />
                            해당 단어를 듣고 관심을 말해주세요.😁
                        </h2>
                        <div className={style.questionBox}>
                            <h1>학부별 전공 흥미조사2</h1>
                            {renderQuestions(page3Questions, choices, responsesPage3, 3)}

                            <button onClick={handleNextPage} style={surveyBtnPage3} className={style.surveyBtnPage}>
                                다음 페이지
                            </button>
                        </div>
                    </>
                )}
                {currentPage === 4 && (
                    <>
                        <h2 className={styles.formTitle}>
                            학부별 전공흥미조사 질문을 만들었어요! <br />
                            해당 단어를 듣고 관심을 말해주세요.😁
                        </h2>
                        <div className={style.questionBox}>
                            <h1>이름이 마음에 드는 전공이랑 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
                            {renderQuestions(page4Questions, choices3, responsesPage4, 4)}

                            <button onClick={handleNextPage} style={surveyBtnPage4} className={style.surveyBtnPage}>
                                다음 페이지
                            </button>
                        </div>
                    </>
                )}
                {currentPage === 5 && (
                    <>
                        <h2 className={styles.formTitle}>
                            학부별 전공흥미조사 질문을 만들었어요! <br />
                            해당 단어를 듣고 관심을 말해주세요.😁
                        </h2>
                        <div className={style.questionBox}>
                            <h1>학부별 전공 흥미조사3</h1>
                            {renderQuestions(page5Questions, choices, responsesPage5, 5)}

                            <button onClick={handleNextPage} style={surveyBtnPage5} className={style.surveyBtnPage}>
                                다음 페이지
                            </button>
                        </div>
                    </>
                )}
                {currentPage === 6 && (
                    <>
                        <h2 className={styles.formTitle}>
                            학부별 전공흥미조사 질문을 만들었어요! <br />
                            해당 단어를 듣고 관심을 말해주세요.😁
                        </h2>
                        <div className={style.questionBox}>
                            <h1>관련 직종으로 취업에 대한 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
                            {renderQuestions(page6Questions, choices3, responsesPage6, 6)}

                            <button onClick={handleSubmit} style={surveyBtnPage6} className={style.surveyBtnPage}>
                                제출 하기
                            </button>
                        </div>
                    </>
                )}
                {currentPage > 6 && (
                    <div>
                        <h2>Survey Completed</h2>
                        <p>Thank you for completing the survey!</p>
                        <p>Your Responses:</p>

                        <ul>
                            {responsesPage1.map((response, index) => (
                                <li key={`page1-response-${index}`}>{`Page 1, Question ${index + 1}: ${response}`}</li>
                            ))}
                            {responsesPage2.map((response, index) => (
                                <li key={`page2-response-${index}`}>{`Page 2, Question ${index + 1}: ${response}`}</li>
                            ))}
                            {responsesPage3.map((response, index) => (
                                <li key={`page3-response-${index}`}>{`Page 3, Question ${index + 1}: ${response}`}</li>
                            ))}
                            {responsesPage4.map((response, index) => (
                                <li key={`page4-response-${index}`}>{`Page 4, Question ${index + 1}: ${response}`}</li>
                            ))}
                            {responsesPage5.map((response, index) => (
                                <li key={`page5-response-${index}`}>{`Page 5, Question ${index + 1}: ${response}`}</li>
                            ))}
                            {responsesPage6.map((response, index) => (
                                <li key={`page6-response-${index}`}>{`Page 6, Question ${index + 1}: ${response}`}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Footer></Footer>
        </>
    );
};
export default Survey;
