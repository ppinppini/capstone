import { useState, useEffect } from "react";

import styles from "../Login/Login.module.css";
import header from "../../assets/loginFooter.png";
import { json } from "react-router-dom";
import style from "./Survey.module.css";
import sex__icon from "../../assets/sex.png";
import major__icon from "../../assets/pencil.png";
import Select, { components } from "react-select";
import mbti_icon from "../../assets/mbti_icon.png";
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
    { label: "매우 낮음", value: 1, className: "veryLow" },
    { label: "낮음", value: 2, className: "Low" },
    { label: "보통", value: 3, className: "commonly" },
    { label: "높음", value: 4, className: "high" },
    { label: "매우 높음", value: 5, className: "veryHigh" },
];
const choices2 = [
    { label: "매우 생소함", value: 1 },
    { label: "생소함", value: 2 },
    { label: "중간", value: 3 },
    { label: "관심있음", value: 4 },
    { label: "매우 관심있음", value: 5 },
];
const choices3 = [
    { label: "빅데이터 인공지능전공", value: 1 },
    { label: "의료공학전공", value: 2 },
    { label: "의료경영전공", value: 3 },
];
const answer = 0;

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
        borderColor: state.isFocused ? "#fe7f38" : "#ccc",
        boxShadow: state.isFocused ? "0 0 0 1px #fe7f38" : "none",
        backgroundColor: state.hasValue ? "#fe7f38" : "white",
        cursor: "pointer",
        borderRadius: 8,
        "&:hover": {
            borderColor: state.isFocused ? "#fe7f38" : "#aaa",
        },
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
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        borderRadius: 8,
        backgroundColor: state.hasValue ? "#fe7f38" : "white",
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        borderRadius: 8,
        backgroundColor: state.hasValue ? "#fe7f38" : "white",
    }),
    input: (provided) => ({
        ...provided,
        caretColor: "transparent", // 커서 깜빡임을 투명하게 설정
    }),
    container: (provided) => ({
        ...provided,
        marginTop: 30,
        // margin-top을 100px로 설정
    }),
};

const Survey = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [name, setName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [currentMajor, setCurrentMajor] = useState("");
    const [sex, setSex] = useState("");
    const [mbti, setMbti] = useState("");
    const [responsesPage1, setResponsesPage1] = useState(Array(page1Questions.length).fill(null));
    const [responsesPage2, setResponsesPage2] = useState(Array(page2Questions.length).fill(null));
    const [responsesPage3, setResponsesPage3] = useState(Array(page3Questions.length).fill(null));
    const [responsesPage4, setResponsesPage4] = useState(Array(page4Questions.length).fill(null));
    const [responsesPage5, setResponsesPage5] = useState(Array(page5Questions.length).fill(null));
    const [responsesPage6, setResponsesPage6] = useState(Array(page6Questions.length).fill(null));
    const [errorMessage, setErrorMessage] = useState("");
    const [answer, setAnswer] = useState("");
    const [surveyBtnStyle, setSurveyBtnStyle] = useState({
        backgroundColor: "#ccc",
        color: "#000",
        transition: "background-color 3s ease",
    });
    useEffect(() => {
        if (name && studentId && currentMajor && sex && mbti) {
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
    }, [name, studentId, currentMajor, sex, mbti]);
    // const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        fetch("http://localhost:8080", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": `http://majorpick.s3-website.ap-northeast-2.amazonaws.com`,
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "liS,POST,GET",
            },
            body: JSON.stringify(answer),
            credentials: "include",
        }).then((res) => {
            console.log(res);

            return res.json();
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAnswer(null);
    };

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
            if (!name || !studentId || !currentMajor || !sex || !mbti) {
                setErrorMessage("모든 항목에 답해주세요.");
                return;
            }
        } else {
            const responsesMap = {
                1: responsesPage1,
                2: responsesPage2,
                3: responsesPage3,
                4: responsesPage4,
                5: responsesPage5,
                6: responsesPage6,
            };

            if (!validateResponses(responsesMap[currentPage])) {
                setErrorMessage("모든 항목에 답해주세요.");
                return;
            }
        }

        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleSubmit = () => {
        if (!validateResponses(responsesPage6)) {
            setErrorMessage("모든 항목에 답해주세요.");
            return;
        }

        const formData = {
            name,
            studentId,
            currentMajor,
            sex,
            mbti,
            responses: [...responsesPage1, ...responsesPage2, ...responsesPage3, ...responsesPage4, ...responsesPage5, ...responsesPage6],
            answer,
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

    const renderQuestions = (questions, choices, responses, page) => {
        return (
            <div>
                {questions.map((question, index) => (
                    <div key={index}>
                        <p style={{ color: "#FE7F38" }}>{question}</p>
                        {choices.map((choice) => (
                            <label key={choice.value} className={choice.className}> {/* 각 선택지에 해당하는 클래스 추가 */}
                                <input
                                    type="radio"
                                    name={`question-${index}-page${page}`}
                                    value={choice.value}
                                    checked={responses[index] === choice.value}
                                    onChange={() => handleliChange(index, choice.value, page)}
                                />
                                {choice.label}
                            </label>
                        ))}
                    </div>
                ))}
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
        );
    };

    return (
        <div className={style.form}>
            {currentPage === 0 && (
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
                    <div htmlFor="name" className={style.userInfo}>
                        개인정보입력
                    </div>
                    <br />
                    <input className={style.name} type="text" id="name" placeholder="이름입력" onChange={(e) => setName(e.target.value)} />
                    <br />
                    <input className={style.studentId} type="text" id="studentId" placeholder="학번입력" maxLength={10} onChange={(e) => setStudentId(e.target.value)} />
                    <div className={style.major__sex}>
                        <div className={style.currentMajor} onChange={(e) => setCurrentMajor(e.target.value)}>
                            <label htmlFor="major" className={style.select_current_majorTitle}>
                                <img src={major__icon} alt="전공 아이콘" />
                                <span className={style.select_current_Title_text}>현재 재직 학과 선택</span>{" "}
                            </label>
                            <div className={style.majorBox}>
                                <input className={style.majorBtn} id="major0" type="radio" value="빅데이터 인공지능" name="major" />
                                <label htmlFor="major0" className={style.majorLabel}>
                                    빅데이터 인공지능
                                </label>
                                <input className={style.majorBtn} type="radio" value="의료공학과" name="major" id="major1" />
                                <label htmlFor="major1" className={style.majorLabel}>
                                    의료공학과
                                </label>
                                <input className={style.majorBtn} type="radio" value="의료경영학과" name="major" id="major2" />
                                <label htmlFor="major2" className={style.majorLabel}>
                                    의료경영학과
                                </label>
                            </div>
                        </div>
                        <div className={style.currentSex} onChange={(e) => setSex(e.target.value)}>
                            <label htmlFor="sex" className={style.select_current_sexTitle}>
                                <img src={sex__icon} alt="" />
                                <span className={style.select_current_Title_text}>성별 선택</span>
                            </label>
                            <div className={style.sexBox}>
                                <input className={style.sexBtn} type="radio" value="남자" name="sex" id="man" />
                                <label htmlFor="man" className={style.sexLabel}>
                                    남자
                                </label>
                                <input className={style.sexBtn} type="radio" value="여자" name="sex" id="woman" />
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
                            style={{ backgroundColor: "#ffff", marginTop: "100" }}
                        ></Select>
                    </div>
                    <button type="submit" className={style.surveyBtn} style={surveyBtnStyle}>
                        설문조사 시작하기
                    </button>
                </form>
            )}
            {currentPage === 1 && (
                <div>
                    <h1>학부별 전공 흥미 조사</h1>
                    {renderQuestions(page1Questions, choices, responsesPage1, 1)}

                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 2 && (
                <div>
                    <h1>나의 흥미를 유발하는 전공이랑 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
                    {renderQuestions(page2Questions, choices, responsesPage2, 2)}

                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 3 && (
                <div>
                    <h1>학부별 전공 흥미조사2</h1>
                    {renderQuestions(page3Questions, choices2, responsesPage3, 3)}

                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 4 && (
                <div>
                    <h1>이름이 마음에 드는 전공이랑 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
                    {renderQuestions(page4Questions, choices2, responsesPage4, 4)}

                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 5 && (
                <div>
                    <h1>학부별 전공 흥미조사3</h1>
                    {renderQuestions(page5Questions, choices3, responsesPage5, 5)}

                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 6 && (
                <div>
                    <h1>관련 직종으로 취업에 대한 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
                    {renderQuestions(page6Questions, choices3, responsesPage6, 6)}

                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
            {currentPage > 6 && (
                <div>
                    <h2>Survey Completed</h2>
                    <p>Thank you for completing the survey!</p>
                    <p>Your Responses:</p>
                    <button onClick={openModal}>Open Modal</button>
                    {isModalOpen && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <span className={styles.close} onClick={closeModal}>
                                    &times;
                                </span>
                                <p>{json.stringify(answer)}</p>
                            </div>
                        </div>
                    )}
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
    );
};

export default Survey;
