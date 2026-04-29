import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import myCV from "../assets/Fake-Resume.pdf"; // FILE NAME
import 'animate.css';
import TrackVisibility from "react-on-screen";

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);

    const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [text]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];

        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prev => prev / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    };

    // ✅ DOWNLOAD FUNCTION
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = myCV;
        link.download = "Hala_CV.pdf"; // name after download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">

                    {/* LEFT SIDE */}
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>

                                    <span className="tagline">Welcome to my Portfolio</span>

                                    <h1>
                                        {`Hi I'm Hala! `}
                                        <span className="wrap">{text}</span>
                                    </h1>

                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Debitis similique ut nemo doloremque.
                                    </p>

                                    {/* ✅ UPDATED BUTTON */}
                                    <button onClick={handleDownload}>
                                        Download CV <ArrowRightCircle size={25} />
                                    </button>

                                </div>
                            }
                        </TrackVisibility>
                    </Col>

                    {/* RIGHT SIDE */}
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                                    <img src={headerImg} alt="Header Img" />
                                </div>
                            }
                        </TrackVisibility>
                    </Col>

                </Row>
            </Container>
        </section>
    );
};