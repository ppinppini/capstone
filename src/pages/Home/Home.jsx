import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const nextPage = () => {
        navigate("/survey");
    };
    return (
        <div>
            <button onClick={nextPage}> 다음 페이지!</button>
        </div>
    );
};
