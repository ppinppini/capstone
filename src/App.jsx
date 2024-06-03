import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
// import Login from "./pages/Login/Login";
import Survey from "./pages/Survey/Survey";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home/Home";
import { Result } from "./pages/Result/Result";

// Container 컴포넌트에 스타일을 적용합니다.
const Container = styled.div`
    margin: 0 auto;
    text-align: center; // 가운데 정렬을 설정합니다.
    position: relative;
    width: 100%;
    height: 100%;
`;

function App() {
    return (
        <>
            <BrowserRouter>
                {/* Container 컴포넌트를 사용하여 모든 페이지의 스타일을 적용합니다. */}
                <Container>
                    <Routes>
                        {/* 각 페이지 컴포넌트를 Container 컴포넌트 내부에 래핑합니다. */}
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/login" element={<Login />} /> */}
                        <Route path="/survey" element={<Survey />} />

                        <Route path="/result" element={<Result />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </>
    );
}

export default App;
