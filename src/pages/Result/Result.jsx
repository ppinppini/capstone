import { useState } from "react";
import styles from "./modal.module.css";
import axios from "axios";
export const Result = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    axios
        .get("http://localhost:8080")
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // 항상 실행
        });
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAnswer(null);
    };
    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={closeModal}>
                            &times;
                        </span>
                        
                    </div>
                </div>
            )}
            <p>{json.stringify(response)}</p>
        </div>
    );
};
