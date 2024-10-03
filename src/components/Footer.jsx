import footer3 from "../assets/footer3.png"; // 하나로 합친 새로운 이미지
import styles from "./Footer.module.css"; // Import styles as an object

export const Footer = () => {
    return (
        <section className={styles.imgSlider}>
            <div className={styles.sliderContainer}>
                <div className={styles.slide}>
                    <img src={footer3} alt="Footer Image" />
                </div>
            </div>
        </section>
    );
};
