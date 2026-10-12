"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  Clock3,
  Droplets,
  Gauge,
  LayoutGrid,
  Sprout,
  Wrench,
} from "lucide-react";

const topics = [
  {
    id: "controllers",
    title: "Smart controllers",
    icon: Clock3,
    heading: "The right water, at the right time.",
    description:
      "Your controller sets when each zone waters and for how long. A well-planned schedule accounts for plant needs, soil, sun exposure, and the season. Compatible smart controllers can adjust schedules using weather information.",
    tips: [
      "Group plants with similar water needs.",
      "Review run times as the seasons change.",
      "Ask about compatibility before upgrading.",
    ],
  },
  {
    id: "layout",
    title: "System layout",
    icon: LayoutGrid,
    heading: "Good coverage begins with a thoughtful plan.",
    description:
      "An irrigation layout brings water to the places that need it. Separate zones help manage lawns and planting beds differently, while considered head placement reduces dry patches and overspray onto paths.",
    tips: [
      "Map lawn areas and planted borders.",
      "Consider shade, slopes, and soil.",
      "Plan access for future system maintenance.",
    ],
  },
  {
    id: "heads",
    title: "Heads & valves",
    icon: Sprout,
    heading: "Small components make a big difference.",
    description:
      "Sprinkler heads distribute water, and valves control the flow to each zone. Matching nozzles and spray patterns to the area helps coverage stay consistent. A broken or misaligned head can leave plants dry while wasting water nearby.",
    tips: [
      "Watch for tilted, blocked, or damaged heads.",
      "Keep spray directed toward planted areas.",
      "Have valve issues diagnosed before replacing parts.",
    ],
  },
  {
    id: "pressure",
    title: "Pressure & coverage",
    icon: Gauge,
    heading: "A balanced system waters more evenly.",
    description:
      "Too much pressure can cause misting, while too little can limit sprinkler reach. Checking pressure and observing every zone helps identify leaks, obstructions, and coverage gaps before they affect the landscape.",
    tips: [
      "Look for fine mist or unusually short spray.",
      "Compare coverage across every zone.",
      "Have persistent pressure changes investigated.",
    ],
  },
  {
    id: "drainage",
    title: "Water management",
    icon: Droplets,
    heading: "Work with your soil and the weather.",
    description:
      "Irrigation and drainage both influence how water moves through a property. Soil absorption, slopes, rainfall, and watering schedules should be considered together. Repeated pooling is a reason to request an assessment of the cause.",
    tips: [
      "Reduce watering when rainfall is sufficient.",
      "Consider shorter cycles where water runs off.",
      "Discuss drainage needs during a site assessment.",
    ],
  },
  {
    id: "care",
    title: "Repairs & care",
    icon: Wrench,
    heading: "Keep your system ready for the season.",
    description:
      "Routine observation helps catch a leaking head, clogged nozzle, or schedule that needs attention. Seasonal startup checks and preparation for freezing conditions help you care for the system throughout the year.",
    tips: [
      "Walk the property while each zone runs.",
      "Address leaks and uneven coverage promptly.",
      "Plan seasonal service before temperature changes.",
    ],
  },
] as const;

export function SystemExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const activeTopic = topics[activeIndex];
  const ActiveIcon = activeTopic.icon;

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % topics.length;
        break;
      case "ArrowLeft":
        nextIndex = (index + topics.length - 1) % topics.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = topics.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabsRef.current[nextIndex]?.focus();
  }

  return (
    <div className="system-explorer">
      <div
        className="system-tabs"
        role="tablist"
        aria-label="Explore your irrigation system"
      >
        {topics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <button
              type="button"
              key={topic.id}
              ref={(element) => {
                tabsRef.current[index] = element;
              }}
              id={`${id}-tab-${topic.id}`}
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={`${id}-panel-${topic.id}`}
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKey(event, index)}
            >
              <Icon size={20} aria-hidden="true" />
              {topic.title}
            </button>
          );
        })}
      </div>
      {topics.map((topic, index) => (
        <div
          key={topic.id}
          className="system-panel"
          id={`${id}-panel-${topic.id}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${topic.id}`}
          hidden={activeIndex !== index}
          tabIndex={0}
        >
          {activeIndex === index && (
            <ActiveIcon className="system-icon" size={40} aria-hidden="true" />
          )}
          <h3 className="section-heading">{topic.heading}</h3>
          <p>{topic.description}</p>
          <ul>
            {topic.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SystemExplorer;
