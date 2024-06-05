import axios from "axios";
import Header from "../../components/Header";

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
            
            {/* <p>{json.stringify(response)}</p> */}
        </div>
    );
};
