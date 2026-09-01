import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../../components/Navbar"
import Footer from "../../components/footer"
import HomepageBooking from "../../layouts/homeBookings"
import SecondLayout from "../../layouts/secondLayout"
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Share,
  ArrowLeft,
  X,
} from "lucide-react";
import MiddleContent from "../components/"


const HomePage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
         
        </Helmet>

        <div>
          <Navbar/>
        </div>

   <div>

        </div>






 <div>
          <Footer/>
        </div>
 
      </HelmetProvider>
    </>
  );
};

export default HomePage;