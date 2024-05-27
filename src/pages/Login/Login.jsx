import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import header from "../../assets/loginFooter.png";
export default function Login() {
    const [name, setName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [currentMajor, setCurrentMajor] = useState("");
    const [sex, setSex] = useState("");
    const [mbti, setMbti] = useState("");

    const navigate = useNavigate();

    const nextPage = () => {
        navigate("/survey");
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeStudentId = (e) => {
        setStudentId(e.target.value);
    };

    const onChangeMajor = (e) => {
        setCurrentMajor(e.target.value);
    };
    const onChangeSex = (e) => {
        setSex(e.target.value);
    };
    const onChangeMbti = (e) => {
        setMbti(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            studentId,
            currentMajor,
            mbti,
        };
        fetch("http://13.209.109.252:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                console.log(res);

                return res.json();
            })
            .then((res) => {
                console.log(res);
            });
        nextPage();
        console.log("Name:", name);
        console.log("Student ID:", studentId);
        console.log("Current Major:", currentMajor);
        console.log("Sex:", sex);
        console.log("MBTI:", mbti);
        // Add further form submission logic here (e.g., sending data to a server)
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <img src={header} alt="" className={styles.header} />
                <h1>회원정보</h1>
                <label htmlFor="name">개인정보입력</label><br />
                <input type="text" id="name" placeholder="이름입력" onChange={onChangeName} /><br />
                <input type="text" id="studentId" placeholder="학번입력" maxLength={10} onChange={onChangeStudentId} />

                
                <div onChange={onChangeMajor}>
                <label htmlFor="currentMajor">현재 재직 학과 선택</label><br />
                    <label>
                        <input type="radio" value="빅데이터 인공지능" name="major" />
                        빅데이터 인공지능
                    </label>
                    <label>
                        <input type="radio" value="1" name="major" />
                        의료공학과
                    </label>
                    <label>
                        <input type="radio" value="의료경영학과" name="major" />
                        의료경영학과
                    </label>
                </div>
                <label htmlFor="sex">성별</label>
                <select id="sex" onChange={onChangeSex}>
                    <option value="0">남자</option>
                    <option value="1">여자</option>
                </select>
                <label htmlFor="mbti">MBTI 선택</label>
                <select id="mbti" onChange={onChangeMbti}>
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
                <div>API 연동 PlZ</div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
