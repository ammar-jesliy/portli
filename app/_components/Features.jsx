import React from "react";
import FeatureCard from "./FeatureCard";
import { Puzzle, LayoutTemplate, MonitorSmartphone, BarChart } from "lucide-react";

const Features = () => {
  return (
    <section className="w-full flex flex-col items-center py-20">
      <div>
        <h2 className="font-bricolage text-xl sm:text-3xl font-semibold text-center leading-[1] tracking-tighter">
          Build your site using <br />{" "}
          <span className="bg-gradient-to-r from-primaryLightBlue to-primaryBlue text-transparent bg-clip-text">
            dynamic components
          </span>
        </h2>
      </div>
      <div className="flex flex-col gap-6 items-center px-3 w-full pt-10">
        <FeatureCard
          title={"Customizable components"}
          highlightedText={
            "Elevate your mircrosite with customizable components."
          }
          text={
            " Tailor each element to fit your style—change colors, sizes, and layouts effortlessly."
          }
          icon={<Puzzle className="w-5 h-5 sm:w-10 sm:h-10" />}
        />
        <FeatureCard
          title={"Page Analytics"}
          highlightedText={
            "Track Views and Clicks with our Analytics tool."
          }
          text={
            " See how many views and clicks your page gets, and use these insights to enhance your content."
          }
          icon={<BarChart className="w-5 h-5 sm:w-10 sm:h-10" />}
        />
        <FeatureCard
          title={"Templates"}
          highlightedText={
            "Save time and effort with our pre-built templates."
          }
          text={
            " Select a design that suits your style, personalize it to your liking, and have a stunning page ready in minutes."
          }
          icon={<LayoutTemplate className="w-5 h-5 sm:w-10 sm:h-10" />}
        />
        <FeatureCard
          title={"Optimized for Any Device"}
          highlightedText={
            "Enjoy full customizability by separately editing your desktop and mobile layouts."
          }
          text={
            " This allows you to fine-tune your site’s design for each device, ensuring your page functions smoothly across all screens."
          }
          icon={<MonitorSmartphone className="w-5 h-5 sm:w-10 sm:h-10" />}
        />
      </div>
    </section>
  );
};

export default Features;
