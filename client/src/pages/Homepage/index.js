import React from "react";
import NavbarPage from "../../components/NavbarPage";
import StockSlider from "../../components/StockSlider";
import NewsHeader from "../../components/NewsHeader";
import NewsBody from "../../components/NewsBody";

const Homepage = () => {
    return(
        <div>
<NavbarPage />
<StockSlider />
<NewsHeader />
<br></br>
<NewsBody />
        </div>
    )
}

export default Homepage;