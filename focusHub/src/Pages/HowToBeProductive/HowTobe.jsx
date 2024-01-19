import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Aside from "../../Layouts/Aside/Aside";
import "./HowToBe.css";

const HowToBe = () => {
  const containers = [
    {
      title: "How to Stay Productive",
      content:
        "Just showing up at your office isn’t enough in today’s fast-paced work environments. You have to get things done to thrive and survive. Let’s be honest — everyone is more productive some days than others, but if you find yourself in a slump, having a strategy for staying effective and efficient can help. Ready to make a plan? Make sure it’s tailored to your own list of distractions. Here are some tips to get you started:",
      listItems: [
        "Set specific and achievable goals",
        "Break tasks into smaller, manageable steps",
        "Manage your time effectively using techniques like Pomodoro Technique",
        "Eliminate distractions and create a focused work environment",
        "Take regular breaks to recharge and avoid burnout",
        "Stay organized with to-do lists and productivity tools",
      ],
      link: "https://www.futurelearn.com/info/blog/how-to-be-more-productive",
    },
    {
      title: "Healthy Habits",
      content:
        "Productivity goes hand in hand with maintaining a healthy lifestyle. By incorporating healthy habits into your daily routine, you can improve your overall well-being and enhance your productivity. Consider the following habits:",
      listItems: [
        "Eat a balanced diet to fuel your body and brain",
        "Exercise regularly to boost productivity and reduce stress",
        "Practice mindfulness or meditation to reduce stress",
      ],
      link: "https://www.futurelearn.com/info/blog/how-to-be-more-productive",
    },
    {
      title: "Time Management Techniques",
      content:
        "Effective time management is crucial for productivity. Explore various time management techniques to find what works best for you. Here are a few techniques to consider:",
      listItems: [
        "Use a productivity method like the Eisenhower Matrix",
        "Prioritize tasks based on importance and urgency",
        "Delegate tasks when possible",
        "Avoid multitasking and focus on one task at a time",
        "Use technology tools and apps to streamline your workflow",
      ],
      link: "https://www.futurelearn.com/info/blog/how-to-be-more-productive",
    },
  ];

  const splideOptions = {
    perPage: 1,
    start: 1,
  };

  return (
    <div className="ProductivityTips">
      <Aside />
      <div className="TipsContent">
        <Splide options={splideOptions}>
          {containers.map((container, index) => (
            <SplideSlide key={index}>
              <div className="container">
                <h1>{container.title}</h1>
                <p>{container.content}</p>
                <ul>
                  {container.listItems.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
                <a className="links" target="_blank" href={container.link} style={{color: 'white'}}>
                  Read More
                </a>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default HowToBe;
