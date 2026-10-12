export type ServiceFAQ = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  intro: string;
  benefits: string[];
  problems: string[];
  steps: { title: string; description: string }[];
  faqs: ServiceFAQ[];
  imageIds: string[];
  approval: "pending" | "approved";
  specialty: boolean;
};

// Offering descriptions are editable proposals. Confirm actual scope with the
// owner before public promotion; supplied photographs do not verify a service.
export const services: Service[] = [
  {
    slug: "irrigation-installation",
    title: "Irrigation Installation",
    shortDescription:
      "Plan watering around your lawn, planting beds, and the way you use your property.",
    intro:
      "A useful irrigation system begins with the landscape, not a collection of sprinkler heads. Sun exposure, slopes, soil, planting needs, and available water all shape a sensible design. Discuss a new system or an addition with GreenMan so the proposed scope can be assessed before installation is scheduled.",
    benefits: [
      "Watering zones suited to different parts of the landscape",
      "A plan for lawn areas and planting beds",
      "Controller settings that can change with the season",
      "An opportunity to coordinate irrigation with landscape preparation",
    ],
    problems: [
      "Hand watering takes time and leaves uneven results",
      "A new lawn or planting area needs reliable coverage",
      "An existing system does not reach a landscape addition",
      "Sprays overlap paths or miss the edge of the lawn",
    ],
    steps: [
      {
        title: "Understand the property",
        description:
          "Review the areas to be watered, landscape plans, water source, and access. Identify information needed to assess pressure, flow, and site constraints.",
      },
      {
        title: "Agree on a proposed layout",
        description:
          "Discuss zones, sprinkler or drip options, controller placement, installation access, and the work included in the estimate.",
      },
      {
        title: "Review operation and care",
        description:
          "After approved work, check system operation and explain controller use, seasonal adjustments, and follow-up care appropriate to the installed system.",
      },
    ],
    faqs: [
      {
        question: "Can irrigation be planned before landscaping is finished?",
        answer:
          "Yes. Sharing planting plans, grading plans, and hardscape locations early can help avoid conflicts. Final design and scheduling depend on the site's readiness and the agreed scope.",
      },
      {
        question: "Does every property need the same number of zones?",
        answer:
          "No. Water supply and the needs of each landscape area determine how a system should be divided. A lawn and a planting bed may need different equipment and schedules.",
      },
      {
        question: "Will installation disturb my lawn?",
        answer:
          "Installing underground pipe generally involves ground access. Ask how access, existing landscaping, and restoration will be addressed in the estimate; methods vary by property.",
      },
      {
        question: "Can I request an estimate for only part of my property?",
        answer:
          "Yes. Describe the areas you want to water and any future plans. GreenMan can confirm whether the requested scope is available and what assessment is needed.",
      },
    ],
    imageIds: ["GM_08_yard-irrigation-and-site", "GM_07_trench-and-groundwork"],
    approval: "pending",
    specialty: false,
  },
  {
    slug: "sprinkler-repair",
    title: "Sprinkler Repair",
    shortDescription:
      "Start with the symptoms, find the cause, and discuss a practical repair.",
    intro:
      "A dry patch, a puddle, or a sprinkler that will not rise can have several causes. An operating check helps distinguish a damaged head from a valve, pipe, pressure, or controller issue. Tell GreenMan what you are seeing and when it happens so the appropriate repair assessment can be discussed.",
    benefits: [
      "Attention to the cause behind visible symptoms",
      "More consistent coverage after appropriate repairs",
      "Less unwanted watering of walks and buildings",
      "Clearer choices between repair and component replacement",
    ],
    problems: [
      "Broken, tilted, or buried sprinkler heads",
      "Zones that fail to start or will not stop",
      "Water collecting around a head or valve area",
      "Weak spray, misting, or an uneven watering pattern",
    ],
    steps: [
      {
        title: "Describe the symptoms",
        description:
          "Note the affected zone, controller behavior, and whether the problem occurs every cycle. A photograph can help explain the issue during an inquiry.",
      },
      {
        title: "Check system operation",
        description:
          "An agreed inspection can look at visible heads, valves, controller settings, and signs of leaks to narrow down the likely cause.",
      },
      {
        title: "Confirm repair scope",
        description:
          "Discuss recommended work and authorization before proceeding. After repairs, affected zones should be checked again for operation and coverage.",
      },
    ],
    faqs: [
      {
        question: "Should I keep running a zone if I see a leak?",
        answer:
          "If a zone is actively leaking or causing pooling, stop that zone and request help. If water continues with the controller off, use the system's appropriate shutoff if you know how to do so safely.",
      },
      {
        question: "Is a brown patch always a broken sprinkler?",
        answer:
          "No. Coverage, soil, shade, drainage, turf health, and watering schedules can all contribute. Observing a full watering cycle is a useful first step.",
      },
      {
        question: "Can one sprinkler head be replaced?",
        answer:
          "Often, but the replacement should suit the zone's equipment, spray pattern, and water conditions. Confirm the cause of the issue before choosing a component.",
      },
      {
        question: "What should I include in a repair request?",
        answer:
          "Include the address or ZIP code, the symptoms, when the problem started, affected zones if known, and a preferred contact method. Avoid opening electrical or pressurized components yourself.",
      },
    ],
    imageIds: ["GM_08_sprinkler-operating-closeup"],
    approval: "pending",
    specialty: false,
  },
  {
    slug: "drip-irrigation",
    title: "Drip Irrigation",
    shortDescription:
      "Consider targeted watering for garden beds, shrubs, and planted borders.",
    intro:
      "Planting beds often need a different approach from a lawn. Drip tubing and emitters can deliver water close to the root area, with layout and run time chosen for the plants and soil. Discuss a new bed or an existing irrigation zone with GreenMan to determine whether a drip approach fits the property.",
    benefits: [
      "Targeted watering around planted areas",
      "Fewer sprays across nearby paths when properly designed",
      "Separate scheduling for beds with different needs",
      "A flexible option as planting layouts change",
    ],
    problems: [
      "Lawn sprinklers overspray a garden bed",
      "New shrubs have different watering needs from nearby turf",
      "Hand watering is difficult to maintain consistently",
      "Existing drip emitters appear clogged or uneven",
    ],
    steps: [
      {
        title: "Review the planting layout",
        description:
          "Identify plant types, spacing, sun exposure, and soil conditions. Discuss how the planting bed may change over time.",
      },
      {
        title: "Assess system compatibility",
        description:
          "Determine how pressure regulation, filtration, zone control, and maintenance access would fit the existing or proposed system.",
      },
      {
        title: "Check and adjust watering",
        description:
          "Review distribution, controller settings, and inspection needs. Drip systems still require seasonal attention and checks for damage or blockage.",
      },
    ],
    faqs: [
      {
        question: "Is drip irrigation suitable for every garden?",
        answer:
          "It can be useful for many planted areas, but plant needs, soil, slope, and water conditions matter. A property assessment helps identify an appropriate approach.",
      },
      {
        question: "Can drip irrigation run on my lawn sprinkler zone?",
        answer:
          "Sprays and drip equipment commonly need different pressure and run times. Compatibility should be reviewed rather than assuming they can share a zone.",
      },
      {
        question: "Does drip irrigation need maintenance?",
        answer:
          "Yes. Tubing, connections, filters, and emitters should be checked for leaks, damage, or clogs, especially after landscape work or seasonal changes.",
      },
      {
        question: "Do drip lines still need winter care in Massachusetts?",
        answer:
          "Yes. The water supply and components need winter preparation appropriate to the installed equipment. Ask for system-specific guidance before freezing weather.",
      },
    ],
    imageIds: [
      "GM_03_landscape-garden-beds",
      "GM_03_garden-irrigation-watering",
    ],
    approval: "pending",
    specialty: false,
  },
  {
    slug: "spring-startup",
    title: "Spring Startup",
    shortDescription:
      "Bring the system back into service with an operating check and seasonal settings.",
    intro:
      "A spring startup is more than turning the controller on. After a Massachusetts winter, a system benefits from a careful return to operation and a check of each zone. Timing depends on weather, ground conditions, equipment, and the property rather than a single calendar date.",
    benefits: [
      "A chance to identify winter damage early",
      "A review of sprinkler coverage before regular watering",
      "Controller settings suited to current conditions",
      "An organized starting point for seasonal care",
    ],
    problems: [
      "The controller is on but zones do not water",
      "Heads were damaged or moved over winter",
      "Sprays land outside their intended area",
      "Last year's schedule no longer suits the landscape",
    ],
    steps: [
      {
        title: "Choose suitable conditions",
        description:
          "Confirm the system is ready to return to operation, taking ongoing freeze risk and ground conditions into account.",
      },
      {
        title: "Run and observe zones",
        description:
          "Check visible operation, coverage, and signs of leaks. Flag repairs or adjustments that need separate authorization.",
      },
      {
        title: "Review the schedule",
        description:
          "Discuss current watering needs and controller settings, including any weather-based features supported by the equipment.",
      },
    ],
    faqs: [
      {
        question:
          "When should I start irrigation in northeastern Massachusetts?",
        answer:
          "Wait until conditions are suitable and the risk of damaging freezes has eased. Spring weather varies; the property's equipment and current conditions should guide timing.",
      },
      {
        question: "Can I use last year's watering schedule?",
        answer:
          "It is a starting point, but weather, plant growth, and landscape changes may call for adjustments. Early spring often needs less supplemental watering than hot summer periods.",
      },
      {
        question: "Does startup include repairs?",
        answer:
          "Ask what the agreed visit includes. A startup can reveal repair needs, and additional work should be discussed and authorized rather than assumed.",
      },
      {
        question: "Will a startup prove there are no underground leaks?",
        answer:
          "An operating check can reveal signs of problems but does not guarantee every concealed issue is visible. Tell the technician about unusual water use or persistent wet areas.",
      },
    ],
    imageIds: ["GM_03_garden-irrigation-watering"],
    approval: "pending",
    specialty: false,
  },
  {
    slug: "mid-season-inspection",
    title: "Mid-Season Inspection",
    shortDescription:
      "Revisit coverage and controller settings as summer conditions change.",
    intro:
      "A system that looked balanced in spring can need attention after months of plant growth, mowing, and changing weather. A mid-season review looks at the way zones are operating and whether watering still suits the landscape. Discuss dry areas, pooling, or recent landscape changes when requesting a visit.",
    benefits: [
      "A fresh check of coverage during the growing season",
      "Attention to heads blocked by growing plants",
      "A review of schedules against current conditions",
      "Early identification of visible wear or damage",
    ],
    problems: [
      "Plants now block a sprinkler's spray",
      "Summer dry areas appear despite regular watering",
      "A head was damaged by mowing or outdoor work",
      "Watering continues during periods of adequate rain",
    ],
    steps: [
      {
        title: "Review what has changed",
        description:
          "Discuss weather, landscape additions, controller changes, and any trouble spots since the last system review.",
      },
      {
        title: "Observe watering patterns",
        description:
          "Run agreed zones and look for blocked sprays, poor alignment, pooling, leaks, and inconsistent operation.",
      },
      {
        title: "Recommend adjustments",
        description:
          "Review suitable settings and identify repairs or upgrades for separate approval. Keep a record of items requiring follow-up.",
      },
    ],
    faqs: [
      {
        question:
          "Is a mid-season check useful if the system turns on normally?",
        answer:
          "Yes. A working controller does not show whether water reaches the intended areas. Plant growth and minor damage can change coverage without stopping a zone.",
      },
      {
        question: "Should I increase watering whenever the lawn turns brown?",
        answer:
          "First consider the cause. Coverage, soil, drainage, turf stress, and weather all matter. More run time can worsen pooling without correcting a damaged or misaligned head.",
      },
      {
        question: "Can scheduling be adjusted during the visit?",
        answer:
          "Controller review can be discussed as part of the scope. Available adjustments depend on the equipment and any current local watering restrictions.",
      },
      {
        question: "How often do systems need inspections?",
        answer:
          "Spring activation and seasonal preparation are useful checkpoints; a growing-season review may also help. Frequency depends on equipment, property use, and problems observed.",
      },
    ],
    imageIds: ["GM_01_active-sprinklers-residential"],
    approval: "pending",
    specialty: false,
  },
  {
    slug: "winterization",
    title: "Irrigation Winterization",
    shortDescription:
      "Prepare the system for freezing weather with an equipment-appropriate approach.",
    intro:
      "Water remaining in exposed or vulnerable irrigation components can expand as it freezes and damage equipment. Winter preparation should match the design of the system and its manufacturer's guidance. Arrange care before sustained freezing conditions, allowing for the variability of northeastern Massachusetts fall weather.",
    benefits: [
      "Reduced risk from water trapped in vulnerable components",
      "A planned transition out of the watering season",
      "Attention to exposed equipment and controller settings",
      "A record of issues to revisit before spring activation",
    ],
    problems: [
      "The irrigation system has not been prepared for winter",
      "Exposed components may still contain water",
      "The fall schedule continues after watering is no longer needed",
      "Previous freeze damage needs attention",
    ],
    steps: [
      {
        title: "Review system requirements",
        description:
          "Identify relevant equipment, shutoffs, and manufacturer guidance. Discuss the appropriate scope and access requirements.",
      },
      {
        title: "Prepare for cold conditions",
        description:
          "Use a winterization method appropriate to the installed system. Pressurized work requires suitable equipment and knowledge.",
      },
      {
        title: "Plan the next season",
        description:
          "Review controller handling and note visible issues that may need attention when the system returns to operation.",
      },
    ],
    faqs: [
      {
        question: "When should I winterize in Massachusetts?",
        answer:
          "Arrange winter preparation before sustained freezes. There is no reliable date for every year or property; check forecast conditions and allow time to schedule suitable care.",
      },
      {
        question: "Is turning off the controller enough?",
        answer:
          "No. Turning off the controller does not necessarily remove water from pipes, valves, or exposed equipment. The system needs preparation suited to its design.",
      },
      {
        question: "Can I use a small air compressor myself?",
        answer:
          "Incorrect pressure or technique can damage equipment and create hazards. Follow the system manufacturer's guidance and seek qualified help rather than improvising a blowout.",
      },
      {
        question: "What if freezing weather has already arrived?",
        answer:
          "Stop unnecessary watering and request advice promptly. The appropriate next step depends on current conditions and whether components are already frozen or damaged.",
      },
    ],
    imageIds: [],
    approval: "pending",
    specialty: false,
  },
  {
    slug: "drainage-solutions",
    title: "Drainage Solutions",
    shortDescription:
      "Discuss persistent wet areas and the assessment needed before drainage work.",
    intro:
      "Persistent standing water needs a careful look at where water comes from, how the ground drains, and where it could safely go. Overwatering, a leak, soil conditions, and surface grading can produce similar symptoms. This specialty offering remains subject to owner confirmation; design, permitting, and any engineering requirements must be established for the specific property.",
    benefits: [
      "A clearer understanding of the source of excess water",
      "A coordinated review of irrigation and site conditions",
      "A discussion of feasible next steps before excavation",
      "Attention to property boundaries and appropriate discharge",
    ],
    problems: [
      "Water remains after rain or a watering cycle",
      "Low spots stay soft or muddy",
      "Irrigation may be adding water to an already wet area",
      "Landscape plans need a review of water movement",
    ],
    steps: [
      {
        title: "Document wet conditions",
        description:
          "Note when pooling occurs, how long it lasts, and whether it follows rainfall or irrigation. Photographs over time can be useful.",
      },
      {
        title: "Establish assessment needs",
        description:
          "Discuss site conditions, existing drainage, utilities, and whether another qualified professional or local review is required.",
      },
      {
        title: "Confirm a suitable scope",
        description:
          "Only proceed with a supported solution after service availability, required approvals, discharge considerations, and responsibilities are confirmed.",
      },
    ],
    faqs: [
      {
        question: "Does standing water mean I need a drain installed?",
        answer:
          "Not necessarily. A leak, irrigation schedule, soil, or grading may be contributing. The source should be assessed before selecting a solution.",
      },
      {
        question: "Is GreenMan's drainage service confirmed?",
        answer:
          "This specialty page is prepared for owner review. Availability, supported scope, and any necessary professional qualifications must be confirmed before booking or public promotion.",
      },
      {
        question: "Can water be directed onto a neighboring property?",
        answer:
          "Drainage changes need appropriate planning. Do not assume a discharge location is acceptable; property boundaries, local requirements, and downstream effects should be reviewed.",
      },
      {
        question: "Do the supplied gallery photographs show drainage work?",
        answer:
          "No verified drainage project has been established from the supplied photographs. Images of wet paved areas are listed descriptively in the Operations gallery and are not evidence of drainage services.",
      },
    ],
    imageIds: [],
    approval: "pending",
    specialty: true,
  },
  {
    slug: "backflow-testing",
    title: "Backflow Testing",
    shortDescription:
      "Confirm testing requirements and qualified service availability for your device.",
    intro:
      "Backflow protection helps separate an irrigation connection from the drinking-water supply. Testing and reporting requirements can depend on the device and local water authority. This specialty service requires owner confirmation of availability, applicable credentials, and supported reporting before any public claim of certified testing is made.",
    benefits: [
      "An organized review of device and water-authority requirements",
      "A clear distinction between visual inspection and formal testing",
      "A path to appropriate documentation when testing is available",
      "Attention to maintenance or repair recommendations from a qualified tester",
    ],
    problems: [
      "A water authority has requested a test report",
      "A device's service history is unclear",
      "A backflow component is leaking or visibly damaged",
      "A new irrigation connection needs requirements confirmed",
    ],
    steps: [
      {
        title: "Identify the device and notice",
        description:
          "Provide the device information if available and any testing notice from the local water authority. Do not publish serial numbers in a public gallery.",
      },
      {
        title: "Confirm qualified availability",
        description:
          "Verify that the provider can perform the required test, holds applicable credentials, and can submit the documentation the authority requires.",
      },
      {
        title: "Review results and follow-up",
        description:
          "A qualified tester should explain results and any required next steps. Repairs, retesting, and reporting responsibilities must be agreed separately where needed.",
      },
    ],
    faqs: [
      {
        question: "Is GreenMan a certified backflow tester?",
        answer:
          "No certification claim is made on this website. The owner must confirm applicable qualifications and service availability before this specialty is publicly promoted or booked.",
      },
      {
        question: "Is a visual inspection the same as backflow testing?",
        answer:
          "No. Formal testing can require specific procedures, instruments, credentials, and reporting. Confirm the requirements with your water authority and a qualified provider.",
      },
      {
        question: "How often does my device need testing?",
        answer:
          "Requirements vary by local authority and device. Follow your water authority's notice and confirm the applicable schedule rather than relying on a general website answer.",
      },
      {
        question: "What information should I provide?",
        answer:
          "Share your property location, the water authority's request, device type if known, and relevant service history. GreenMan can confirm whether a suitable service is available.",
      },
    ],
    imageIds: [],
    approval: "pending",
    specialty: true,
  },
  {
    slug: "smart-irrigation",
    title: "Smart Irrigation",
    shortDescription:
      "Explore controller options that make seasonal watering easier to manage.",
    intro:
      "A controller upgrade can make irrigation scheduling easier, and compatible weather-aware features can help schedules respond to changing conditions. The right choice depends on the existing system, connectivity, property needs, and how you prefer to manage watering. No controller replaces good coverage, sound equipment, or regular attention.",
    benefits: [
      "More convenient scheduling with supported equipment",
      "Weather-aware options where compatible",
      "A controller that fits your preferences and property",
      "A review of existing zones before an upgrade",
    ],
    problems: [
      "The current controller is difficult to program",
      "Schedules are rarely changed as weather shifts",
      "You want to review compatible remote-control options",
      "A replacement controller must work with existing equipment",
    ],
    steps: [
      {
        title: "Review the current system",
        description:
          "Identify controller and zone requirements, sensors, connectivity, and any problems that a new controller alone would not solve.",
      },
      {
        title: "Compare appropriate options",
        description:
          "Discuss compatible features, ownership of accounts, connectivity needs, and any ongoing costs disclosed by the selected provider.",
      },
      {
        title: "Set up and understand controls",
        description:
          "If an upgrade is agreed, review scheduling, supported weather features, manual operation, and access so you can manage the system confidently.",
      },
    ],
    faqs: [
      {
        question: "Will a smart controller fix uneven watering?",
        answer:
          "It can improve scheduling options, but damaged heads, poor layout, or pressure issues still need attention. Coverage should be reviewed separately.",
      },
      {
        question: "Does every smart controller need Wi-Fi?",
        answer:
          "Features vary. Some connected functions require reliable internet access; review the manufacturer's requirements and behavior when connectivity is unavailable.",
      },
      {
        question: "Can I keep using my existing valves and heads?",
        answer:
          "Possibly. Compatibility and system condition should be checked before selecting a replacement controller.",
      },
      {
        question: "Are water savings guaranteed?",
        answer:
          "No. Results depend on the previous schedule, weather, equipment, and landscape. GreenMan does not promise a specific savings percentage.",
      },
    ],
    imageIds: ["GM_01_residential-lawn-sprinkler"],
    approval: "pending",
    specialty: false,
  },
  {
    slug: "system-inspections",
    title: "Irrigation System Inspections",
    shortDescription:
      "Build a clearer picture of visible system condition and watering performance.",
    intro:
      "An irrigation inspection provides a useful starting point when you have inherited a system, noticed a problem, or want to plan maintenance. An agreed operating review can identify visible issues and priorities. The scope should be clear: an irrigation condition review is not a guarantee about every concealed pipe or a formal backflow test.",
    benefits: [
      "An overview of visible operating condition",
      "A list of issues to discuss before authorizing repairs",
      "A review of coverage and controller settings",
      "A practical basis for maintenance planning",
    ],
    problems: [
      "You recently moved into a property with irrigation",
      "System history or zone layout is unclear",
      "Watering results are inconsistent",
      "You want to prioritize repairs or upgrades",
    ],
    steps: [
      {
        title: "Set the inspection scope",
        description:
          "Discuss concerns, known system details, access, and the areas to be reviewed. Identify checks that require a separate specialist or visit.",
      },
      {
        title: "Review visible operation",
        description:
          "Observe agreed zones, controller functions, coverage, and visible signs of leaks or damage.",
      },
      {
        title: "Discuss findings",
        description:
          "Explain observed issues, uncertainties, and recommended next steps. Repairs or upgrades should be authorized separately from the inspection.",
      },
    ],
    faqs: [
      {
        question: "Is an inspection useful before buying a property?",
        answer:
          "A system review may help you understand visible condition and possible follow-up needs. Confirm the scope and coordinate any property-access requirements with the owner.",
      },
      {
        question: "Will the inspection include a written report?",
        answer:
          "Ask what documentation is available when arranging service. Report format, detail, and included checks should be agreed in advance.",
      },
      {
        question: "Can an inspection find every underground problem?",
        answer:
          "No. Some concealed issues may need further investigation. A visible operating review can identify symptoms and help decide what should be checked next.",
      },
      {
        question: "Is backflow testing included?",
        answer:
          "Do not assume so. Formal backflow testing has separate requirements and must be confirmed with an appropriately qualified provider.",
      },
    ],
    imageIds: ["GM_08_sprinkler-watering-new-site"],
    approval: "pending",
    specialty: false,
  },
  {
    slug: "maintenance",
    title: "Seasonal Irrigation Maintenance",
    shortDescription:
      "Connect spring preparation, growing-season attention, and winter care.",
    intro:
      "Regular irrigation care brings the season into focus: return the system to service when conditions permit, watch its performance as the landscape grows, and prepare it before freezing weather. Discuss your property's needs with GreenMan to establish available visits and a clearly agreed scope. Suggested maintenance plans remain owner-review concepts, not guaranteed packages.",
    benefits: [
      "A planned approach to seasonal system care",
      "Opportunities to identify visible problems earlier",
      "Controller settings reviewed as needs change",
      "A continuing record of maintenance priorities",
    ],
    problems: [
      "Seasonal visits are easy to overlook",
      "A system is only checked when something breaks",
      "Landscape changes affect watering needs",
      "Repair recommendations need organized follow-up",
    ],
    steps: [
      {
        title: "Discuss seasonal needs",
        description:
          "Review the system, property, prior issues, and the kind of care you want. Confirm which visits and tasks are available.",
      },
      {
        title: "Agree on included care",
        description:
          "Document visit scope, scheduling expectations, and how additional repairs are approved. Do not assume a proposed plan includes unlimited work.",
      },
      {
        title: "Review after each visit",
        description:
          "Keep findings and recommendations together, adjust priorities as conditions change, and plan the next seasonal checkpoint.",
      },
    ],
    faqs: [
      {
        question: "Does GreenMan offer a confirmed maintenance package?",
        answer:
          "The Seasonal Essentials and Complete Season Care plans shown here are configurable concepts awaiting owner approval. Contact GreenMan to confirm current services and terms.",
      },
      {
        question: "Are repairs automatically included in seasonal care?",
        answer:
          "Not unless they are expressly included in an agreed scope. Repairs, parts, and additional visits should be discussed and authorized.",
      },
      {
        question: "What might ongoing care cover?",
        answer:
          "Depending on the agreed service, it may include spring activation, seasonal operating checks, controller review, and winter preparation. Exact inclusions require confirmation.",
      },
      {
        question: "Can I ask about care for an older system?",
        answer:
          "Yes. Describe the equipment and any known issues. An initial assessment can help identify whether repair, regular maintenance, or replacement planning is appropriate.",
      },
    ],
    imageIds: ["GM_03_lawn-edge-watering"],
    approval: "pending",
    specialty: false,
  },
];
