import Banner from "../components/home/Banner";
import CallToAction from "../components/home/CallToAction";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Testimonial from "../components/home/Testimonial";
import About from "../components/home/About";

const Home = () => {
    return(
        <div>
            <Banner /> 
            <Hero />
            <Features/>
            <About />
            <Testimonial />
            <CallToAction />
            <Footer />
        </div>
    )
}

export default Home;