import footer1 from "../assets/footer1.png";
import footer2 from "../assets/footer2.png";
import styles from "./Footer.module.css"; // Import styles as an object

export const Footer = () => {
    return (
        <section className={styles.imgSlider}>
            <div className={styles.sliderContainer}>
                <div className={styles.slide}>
                    <img src={footer1} alt="Footer Image 1" />
                </div>
                <div className={styles.slide}>
                    <img src={footer2} alt="Footer Image 2"/>
                </div>
            </div>
        </section>
    );
};
