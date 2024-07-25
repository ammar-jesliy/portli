import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Cta from "./Cta";
import Footer from "./Footer"

const LandingContent = () => {
  return (
    <>
      <div className="w-full h-full bg-primaryLightBlue/15">
        <div className="max-w-[1250px] mx-auto py-4 px-4">
          <Header />
          <Hero />
          <Features />
          <Cta />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LandingContent;
