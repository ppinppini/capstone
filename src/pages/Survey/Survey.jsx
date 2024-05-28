// import { useState } from "react";

// const page1Questions = ["빅데이터인공지능전공은 나의 흥미를 유발한다.", "의료공학전공은 나의 흥미를 유발한다.", "의료경영전공은 나의 흥미를 유발한다."];
// const page2Questions = ["가장 느낌이 가깝다", "가장 느낌이 멀다"];
// const page3Questions = ["빅데이터인공지능전공의 이름이 마음에 든다.", "의료공학전공의 이름이 마음에 든다.", "의료경영전공의 이름이 마음에 든다."];
// const page4Questions = ["가장 느낌이 가깝다", "가장 느낌이 멀다"];
// const page5Questions = [
//     "빅데이터인공지능전공으로 졸업하면 관련 직종으로 취업을 할 수 있을 것 같다",
//     "의료공학전공으로 졸업하면 관련 직종으로 취업을 할 수 있을 것 같다",
//     "의료경영전공으로 졸업하면 관련 직종으로 취업을 할 수 있을 것 같다",
// ];
// const page6Questions = ["가장 느낌이 가깝다", "가장 느낌이 멀다"];

// const choices = [
//     { label: "매우 낮음", value: 1 },
//     { label: "낮음", value: 2 },
//     { label: "보통", value: 3 },
//     { label: "높음", value: 4 },
//     { label: "매우 높음", value: 5 },
// ];
// const choices2 = [
//     { label: "매우 생소함", value: 1 },
//     { label: "생소함", value: 2 },
//     { label: "중간", value: 3 },
//     { label: "관심있음", value: 4 },
//     { label: "매우 관심있음", value: 5 },
// ];
// const choices3 = [
//     { label: "빅데이터 인공지능전공", value: 1 },
//     { label: "의료공학전공", value: 2 },
//     { label: "의료경영전공", value: 3 },
// ];

// const Survey = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [responsesPage1, setResponsesPage1] = useState(Array(page1Questions.length).fill(null));
//     const [responsesPage2, setResponsesPage2] = useState(Array(page2Questions.length).fill(null));
//     const [responsesPage3, setResponsesPage3] = useState(Array(page3Questions.length).fill(null));
//     const [responsesPage4, setResponsesPage4] = useState(Array(page4Questions.length).fill(null));
//     const [responsesPage5, setResponsesPage5] = useState(Array(page5Questions.length).fill(null));
//     const [responsesPage6, setResponsesPage6] = useState(Array(page6Questions.length).fill(null));
//     const [errorMessage, setErrorMessage] = useState("");

//     const handleOptionChange = (questionIndex, value, page) => {
//         const setResponses = (setter, responses) => {
//             const newResponses = [...responses];
//             newResponses[questionIndex] = value;
//             setter(newResponses);
//             setErrorMessage(""); // Clear error message when an option is selected
//         };

//         switch (page) {
//             case 1:
//                 setResponses(setResponsesPage1, responsesPage1);
//                 break;
//             case 2:
//                 setResponses(setResponsesPage2, responsesPage2);
//                 break;
//             case 3:
//                 setResponses(setResponsesPage3, responsesPage3);
//                 break;
//             case 4:
//                 setResponses(setResponsesPage4, responsesPage4);
//                 break;
//             case 5:
//                 setResponses(setResponsesPage5, responsesPage5);
//                 break;
//             case 6:
//                 setResponses(setResponsesPage6, responsesPage6);
//                 break;
//             default:
//                 break;
//         }
//     };

//     const validateResponses = (responses) => {
//         return responses.every((response) => response !== null);
//     };

//     const handleNextPage = () => {
//         const responsesMap = {
//             1: responsesPage1,
//             2: responsesPage2,
//             3: responsesPage3,
//             4: responsesPage4,
//             5: responsesPage5,
//             6: responsesPage6,
//         };

//         if (!validateResponses(responsesMap[currentPage])) {
//             setErrorMessage("모든 항목에 답해주세요.");
//             return;
//         }

//         setCurrentPage(currentPage + 1);
//     };

//     const handlePrevPage = () => {
//         setCurrentPage(currentPage - 1);
//     };

//     const handleSubmit = () => {
//         if (!validateResponses(responsesPage6)) {
//             setErrorMessage("모든 항목에 답해주세요.");
//             return;
//         }

//         console.log("Responses Page 1:", responsesPage1);
//         console.log("Responses Page 2:", responsesPage2);
//         console.log("Responses Page 3:", responsesPage3);
//         console.log("Responses Page 4:", responsesPage4);
//         console.log("Responses Page 5:", responsesPage5);
//         console.log("Responses Page 6:", responsesPage6);
//         console.log("All Responses:", [...responsesPage1, ...responsesPage2, ...responsesPage3, ...responsesPage4, ...responsesPage5, ...responsesPage6]);
//         fetch("api주소", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//             },
//             body: JSON.stringify(...responsesPage1, ...responsesPage2, ...responsesPage3, ...responsesPage4, ...responsesPage5, ...responsesPage6),
//         })
//             .then((res) => {
//                 console.log(res);

//                 return res.json();
//             })
//             .then((res) => {
//                 console.log(res);
//             });
//     };

//     const renderQuestions = (questions, choices, responses, page) => {
//         return (
//             <div>
//                 {questions.map((question, index) => (
//                     <div key={index}>
//                         <p>{question}</p>
//                         {choices.map((choice) => (
//                             <label key={choice.value}>
//                                 <input
//                                     type="radio"
//                                     name={`question-${index}-page${page}`}
//                                     value={choice.value}
//                                     checked={responses[index] === choice.value}
//                                     onChange={() => handleOptionChange(index, choice.value, page)}
//                                 />
//                                 {choice.label}
//                             </label>
//                         ))}
//                     </div>
//                 ))}
//                 {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//             </div>
//         );
//     };

//     return (
//         <div>
//             <h1>Survey</h1>
//             {currentPage === 1 && (
//                 <div>
//                     <h1>학부별 전공 흥미 조사</h1>
//                     {renderQuestions(page1Questions, choices, responsesPage1, 1)}
//                     <button onClick={handleNextPage}>Next</button>
//                 </div>
//             )}
//             {currentPage === 2 && (
//                 <div>
//                     <h1>나의 흥미를 유발하는 전공이랑 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
//                     {renderQuestions(page2Questions, choices, responsesPage2, 2)}
//                     <button onClick={handlePrevPage}>Previous</button>
//                     <button onClick={handleNextPage}>Next</button>
//                 </div>
//             )}
//             {currentPage === 3 && (
//                 <div>
//                     <h1>학부별 전공 흥미조사2</h1>
//                     {renderQuestions(page3Questions, choices2, responsesPage3, 3)}
//                     <button onClick={handlePrevPage}>Previous</button>
//                     <button onClick={handleNextPage}>Next</button>
//                 </div>
//             )}
//             {currentPage === 4 && (
//                 <div>
//                     <h1>이름이 마음에 드는 전공이랑 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
//                     {renderQuestions(page4Questions, choices2, responsesPage4, 4)}
//                     <button onClick={handlePrevPage}>Previous</button>
//                     <button onClick={handleNextPage}>Next</button>
//                 </div>
//             )}
//             {currentPage === 5 && (
//                 <div>
//                     <h1>학부별 전공 흥미조사3</h1>
//                     {renderQuestions(page5Questions, choices3, responsesPage5, 5)}
//                     <button onClick={handlePrevPage}>Previous</button>
//                     <button onClick={handleNextPage}>Next</button>
//                 </div>
//             )}
//             {currentPage === 6 && (
//                 <div>
//                     <h1>관련 직종으로 취업에 대한 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
//                     {renderQuestions(page6Questions, choices3, responsesPage6, 6)}
//                     <button onClick={handlePrevPage}>Previous</button>
//                     <button onClick={handleSubmit}>Submit</button>
//                 </div>
//             )}
//             {currentPage > 6 && (
//                 <div>
//                     <h2>Survey Completed</h2>
//                     <p>Thank you for completing the survey!</p>
//                     <p>Your Responses:</p>
//                     <ul>
//                         {responsesPage1.map((response, index) => (
//                             <li key={`page1-response-${index}`}>{`Page 1, Question ${index + 1}: ${response}`}</li>
//                         ))}
//                         {responsesPage2.map((response, index) => (
//                             <li key={`page2-response-${index}`}>{`Page 2, Question ${index + 1}: ${response}`}</li>
//                         ))}
//                         {responsesPage3.map((response, index) => (
//                             <li key={`page3-response-${index}`}>{`Page 3, Question ${index + 1}: ${response}`}</li>
//                         ))}
//                         {responsesPage4.map((response, index) => (
//                             <li key={`page4-response-${index}`}>{`Page 4, Question ${index + 1}: ${response}`}</li>
//                         ))}
//                         {responsesPage5.map((response, index) => (
//                             <li key={`page5-response-${index}`}>{`Page 5, Question ${index + 1}: ${response}`}</li>
//                         ))}
//                         {responsesPage6.map((response, index) => (
//                             <li key={`page6-response-${index}`}>{`Page 6, Question ${index + 1}: ${response}`}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Survey;
import { useState } from "react";

import styles from "../Login/Login.module.css";
import header from "../../assets/loginFooter.png";

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
    { label: "매우 낮음", value: 1 },
    { label: "낮음", value: 2 },
    { label: "보통", value: 3 },
    { label: "높음", value: 4 },
    { label: "매우 높음", value: 5 },
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
    // const navigate = useNavigate();

    const handleOptionChange = (questionIndex, value, page) => {
        const setResponses = (setter, responses) => {
            const newResponses = [...responses];
            newResponses[questionIndex] = value;
            setter(newResponses);
            setErrorMessage(""); // Clear error message when an option is selected
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
        fetch("http://43.200.172.87:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": `http://majorpick.s3-website.ap-northeast-2.amazonaws.com`,
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
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
                        <p>{question}</p>
                        {choices.map((choice) => (
                            <label key={choice.value}>
                                <input
                                    type="radio"
                                    name={`question-${index}-page${page}`}
                                    value={choice.value}
                                    checked={responses[index] === choice.value}
                                    onChange={() => handleOptionChange(index, choice.value, page)}
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
        <div>
            <h1>Survey</h1>
            {currentPage === 0 && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleNextPage();
                    }}
                    className={styles.form}
                >
                    <img src={header} alt="" className={styles.header} />
                    <h1>회원정보</h1>
                    <label htmlFor="name">개인정보입력</label>
                    <br />
                    <input type="text" id="name" placeholder="이름입력" onChange={(e) => setName(e.target.value)} />
                    <br />
                    <input type="text" id="studentId" placeholder="학번입력" maxLength={10} onChange={(e) => setStudentId(e.target.value)} />

                    <div onChange={(e) => setCurrentMajor(e.target.value)}>
                        <label htmlFor="major">현재 재직 학과 선택</label>
                        <br />
                        <label>
                            <input id="major" type="radio" value="빅데이터 인공지능" name="major" />
                            빅데이터 인공지능
                        </label>
                        <label>
                            <input type="radio" value="의료공학과" name="major" />
                            의료공학과
                        </label>
                        <label>
                            <input type="radio" value="의료경영학과" name="major" />
                            의료경영학과
                        </label>
                    </div>
                    <label htmlFor="sex">성별</label>
                    <select id="sex" onChange={(e) => setSex(e.target.value)}>
                        <option value="">선택하세요</option>
                        <option value="남자">남자</option>
                        <option value="여자">여자</option>
                    </select>
                    <label htmlFor="mbti">MBTI 선택</label>
                    <select id="mbti" onChange={(e) => setMbti(e.target.value)}>
                        <option value="">선택하세요</option>
                        <option value="0000">ISTJ</option>
                        <option value="0001">ISTP</option>
                        <option value="0010">ISFJ</option>
                        <option value="0011">ISFP</option>
                        <option value="0100">INTJ</option>
                        <option value="0101">INTP</option>
                        <option value="0110">INFJ</option>
                        <option value="0111">INFP</option>
                        <option value="1000">ESTJ</option>
                        <option value="1001">ESTP</option>
                        <option value="1010">ESFJ</option>
                        <option value="1011">ESFP</option>
                        <option value="1100">ENTJ</option>
                        <option value="1101">ENTP</option>
                        <option value="1110">ENFJ</option>
                        <option value="1111">ENFP</option>
                    </select>
                    <button type="submit">Next</button>
                </form>
            )}
            {currentPage === 1 && (
                <div>
                    <h1>학부별 전공 흥미 조사</h1>
                    {renderQuestions(page1Questions, choices, responsesPage1, 1)}
                    <button onClick={handlePrevPage}>Previous</button>
                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 2 && (
                <div>
                    <h1>나의 흥미를 유발하는 전공이랑 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
                    {renderQuestions(page2Questions, choices, responsesPage2, 2)}
                    <button onClick={handlePrevPage}>Previous</button>
                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 3 && (
                <div>
                    <h1>학부별 전공 흥미조사2</h1>
                    {renderQuestions(page3Questions, choices2, responsesPage3, 3)}
                    <button onClick={handlePrevPage}>Previous</button>
                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 4 && (
                <div>
                    <h1>이름이 마음에 드는 전공이랑 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
                    {renderQuestions(page4Questions, choices2, responsesPage4, 4)}
                    <button onClick={handlePrevPage}>Previous</button>
                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 5 && (
                <div>
                    <h1>학부별 전공 흥미조사3</h1>
                    {renderQuestions(page5Questions, choices3, responsesPage5, 5)}
                    <button onClick={handlePrevPage}>Previous</button>
                    <button onClick={handleNextPage}>Next</button>
                </div>
            )}
            {currentPage === 6 && (
                <div>
                    <h1>관련 직종으로 취업에 대한 느낌이 가장 가깝거나 먼 전공을 선택해주세요.</h1>
                    {renderQuestions(page6Questions, choices3, responsesPage6, 6)}
                    <button onClick={handlePrevPage}>Previous</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
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
    );
};

export default Survey;
