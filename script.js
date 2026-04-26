const projects = [
  {
    id: "conveyor-product-counter",
    title: "Conveyor Product Counter",
    level: "Beginner",
    category: "Arduino",
    problem: "Count products passing on a conveyor using a photoelectric sensor.",
    outcome:
      "Build a working counter with live display, reset function, and basic false-count protection.",

    hardware: [
      "Arduino Uno or Nano",
      "Photoelectric sensor or proximity sensor",
      "16x2 I2C LCD display or OLED display",
      "Reset push button",
      "10kΩ resistor for button input",
      "5V relay/interface module if using industrial sensor output",
      "Breadboard and jumper wires",
      "Optional: 24V DC power supply for industrial sensor"
    ],

    overview: [
      "Learning objective: Build a simple product counting system that detects each product once and displays the total count.",
      "Problem: Products may pass quickly, vibrate, or partially block the sensor.",
      "Skills: Digital input, sensor wiring, debounce logic, edge detection, reset function, and display output.",
      "Real engineering note: Counting errors often come from poor sensor alignment, unstable mounting, shiny surfaces, vibration, or incorrect delay settings."
    ],
    
    wiring: [
  "Sensor VCC → 5V",
  "Sensor GND → GND",
  "Sensor OUT → Arduino pin 2",
  "Reset button one side → Arduino pin 3",
  "Reset button other side → GND (INPUT_PULLUP)",
  "LCD SDA → A4",
  "LCD SCL → A5",
  "LCD VCC → 5V",
  "LCD GND → GND"
],

    build: [
      "Define the counting point on the conveyor.",
      "Connect the sensor signal to Arduino digital input pin 2.",
      "Connect the reset push button to Arduino digital input pin 3 using INPUT_PULLUP logic.",
      "Connect the LCD using I2C: SDA to A4 and SCL to A5 on Arduino Uno.",
      "Upload the starter code.",
      "Pass an object in front of the sensor and confirm the count increases once.",
      "Press reset and confirm the count returns to zero.",
      "Adjust debounce delay if one product counts more than once."
    ],

    test: [
      "Arduino powers up correctly.",
      "Sensor output changes when product passes.",
      "Count increases by one per product.",
      "Reset button clears the count.",
      "Test 20 object passes with no missed or double counts."
    ],

    faults: [
      "No count: Check sensor power, signal wire, ground, and input pin.",
      "Multiple counts: Increase debounce delay or improve mounting.",
      "Random counts: Check loose wiring, electrical noise, or reflective surfaces.",
      "LCD blank: Check I2C address, SDA/SCL wiring, and 5V/GND.",
      "Industrial sensor issue: Do not connect 24V directly to Arduino."
    ],

    resources: [
      "Wiring guide",
      "Arduino starter code",
      "Component list",
      "Testing checklist",
      "Fault-finding table",
      "Industrial upgrade notes"
    ],

    industrial: [
      "Replace Arduino with PLC such as Siemens LOGO or S7-1200.",
      "Use a 24V industrial photoelectric sensor.",
      "Add relay, optocoupler, or proper signal interface.",
      "Display count on HMI.",
      "Add reject output for faulty products.",
      "Include E-stop and guard interlocks where required.",
      "Use shielded cable to reduce electrical noise.",
      "Mount sensor on a rigid adjustable bracket."
    ],

    code: `// Conveyor Product Counter

const int sensorPin = 2;
const int resetButtonPin = 3;

int count = 0;
int lastSensorState = LOW;
unsigned long lastTriggerTime = 0;
const unsigned long debounceDelay = 250;

void setup() {
  pinMode(sensorPin, INPUT);
  pinMode(resetButtonPin, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  int sensorState = digitalRead(sensorPin);
  int resetState = digitalRead(resetButtonPin);

  if (resetState == LOW) {
    count = 0;
    Serial.println("Count reset");
    delay(300);
  }

  if (sensorState == HIGH && lastSensorState == LOW) {
    if (millis() - lastTriggerTime > debounceDelay) {
      count++;
      lastTriggerTime = millis();
      Serial.print("Product Count: ");
      Serial.println(count);
    }
  }

  lastSensorState = sensorState;
}`
  },

  {
    id: "plc-start-stop-motor-control",
    title: "PLC Start/Stop Motor Control",
    level: "Beginner",
    category: "PLC",
    problem:
      "Control a motor using start, stop, emergency stop, overload, and indicator lights.",
    outcome: "Build industrial-style motor control logic with safety interlocks.",

    hardware: [
      "Siemens LOGO! or S7-1200",
      "Start push button",
      "Stop push button",
      "Emergency stop",
      "Contactor",
      "Overload relay",
      "Pilot lights"
    ],

    overview: [
      "Learn the basic start/stop motor control logic used in industry.",
      "Understand seal-in logic, stop circuits, overloads, and fault indication."
    ],

    build: [
      "Define inputs and outputs.",
      "Create start/stop latch logic.",
      "Add emergency stop and overload conditions.",
      "Add run and fault indication.",
      "Test using simulation before real wiring."
    ],

    test: [
      "Start button latches motor output.",
      "Stop button breaks latch.",
      "E-stop disables output.",
      "Overload triggers fault light."
    ],

    faults: [
      "Motor will not latch: Check seal-in contact.",
      "Fault light always on: Check overload NC/NO logic.",
      "Output flickers: Check input bounce or loose wiring."
    ],

    resources: [
      "Input/output table",
      "Ladder logic sketch",
      "Panel wiring checklist",
      "Commissioning checklist"
    ],

    industrial: [
      "Use proper safety-rated emergency stop circuit.",
      "Use contactor and overload protection.",
      "Use labelled terminals and panel documentation.",
      "Add HMI status screen.",
      "Follow site electrical safety rules."
    ],

    code: `PLC Logic:

Inputs:
I1 = Start push button
I2 = Stop push button NC
I3 = Emergency stop NC
I4 = Overload NC

Outputs:
Q1 = Motor contactor
Q2 = Run lamp
Q3 = Fault lamp

Logic:
Q1 = (I1 OR Q1) AND I2 AND I3 AND I4`
  },

  {
    id: "predictive-maintenance-sensor-node",
    title: "Predictive Maintenance Sensor Node",
    level: "Intermediate",
    category: "AI / IoT",
    problem:
      "Monitor vibration, temperature, and current to detect abnormal machine behaviour.",
    outcome:
      "Create a data-logging sensor node ready for dashboard and AI analysis.",

    hardware: [
      "ESP32",
      "Vibration sensor",
      "DS18B20 temperature sensor",
      "ACS712 current sensor",
      "OLED display",
      "WiFi dashboard"
    ],

    overview: [
      "Monitor machine condition using vibration, temperature, and current.",
      "Start with thresholds before adding AI.",
      "Use logged data to identify normal and abnormal patterns."
    ],

    build: [
      "Verify each sensor individually.",
      "Create a combined monitoring sketch.",
      "Log normal running data.",
      "Simulate abnormal vibration/current.",
      "Create alert thresholds."
    ],

    test: [
      "Temperature updates correctly.",
      "Vibration changes when disturbed.",
      "Current changes with load.",
      "Abnormal condition triggers alert."
    ],

    faults: [
      "Current reads zero: Check ACS712 power and output pin.",
      "No temperature: Check pull-up resistor.",
      "WiFi fails: Check SSID/password."
    ],

    resources: [
      "ESP32 wiring map",
      "Sensor test code",
      "CSV logging template",
      "Dashboard layout",
      "AI upgrade plan"
    ],

    industrial: [
      "Move from breadboard to DIN rail enclosure.",
      "Use industrial current transducer.",
      "Use proper terminals and fused supply.",
      "Send alerts to maintenance dashboard.",
      "Integrate with CMMS later."
    ],

    code: `Predictive Maintenance Logic:

Read vibration
Read temperature
Read current

Create baseline values.

If vibration > limit:
  trigger warning

If current rises abnormally:
  trigger warning

If temperature trend increases:
  trigger warning

Next step:
Train AI model using logged CSV data.`
  }
];

const categories = ["All", "Arduino", "PLC", "AI / IoT", "Automation"];

const tabs = [
  { key: "overview", label: "Overview", title: "Project overview" },
  { key: "hardware", label: "Hardware", title: "Recommended components" },
  { key: "build", label: "Build Steps", title: "Step-by-step build path" },
  { key: "test", label: "Testing", title: "Validation checklist" },
  { key: "faults", label: "Fault Guide", title: "Troubleshooting guide" },
  { key: "resources", label: "Resources", title: "Project resources" },
  { key: "code", label: "Code / Logic", title: "Starter code or control logic" },
  { key: "industrial", label: "Industrial Upgrade", title: "Industrial implementation" },
  { key: "wiring", label: "Wiring", title: "Wiring diagram" }
];

let selectedProject = projects[0];
let selectedCategory = "All";
let selectedTab = "overview";
let searchQuery = "";
let simCount = 0;

function $(id) {
  return document.getElementById(id);
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function getFilteredProjects() {
  return projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    const searchableText = [
      project.title,
      project.problem,
      project.outcome,
      project.category,
      project.level,
      ...project.hardware,
      ...project.overview,
      ...project.build,
      ...project.test,
      ...project.faults,
      ...project.resources,
      ...project.industrial,
      project.code
    ]
      .join(" ")
      .toLowerCase();

    return (
      matchesCategory &&
      searchableText.includes(searchQuery.trim().toLowerCase())
    );
  });
}

function renderFilters() {
  const filters = $("filters");
  clearElement(filters);

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter${selectedCategory === category ? " active" : ""}`;
    button.textContent = category;

    button.onclick = () => {
      selectedCategory = category;
      render();
    };

    filters.appendChild(button);
  });
}

function renderProjects() {
  const projectList = $("projectList");
  clearElement(projectList);

  const filteredProjects = getFilteredProjects();

  if (filteredProjects.length === 0) {
    projectList.innerHTML = `<p class="empty">No projects found.</p>`;
    return;
  }

  if (!filteredProjects.some((p) => p.id === selectedProject.id)) {
    selectedProject = filteredProjects[0];
    selectedTab = "overview";
  }

  filteredProjects.forEach((project) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `project-card${
      selectedProject.id === project.id ? " active" : ""
    }`;

    button.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.problem}</p>
      <span class="level ${
        project.level === "Intermediate" ? "intermediate" : ""
      }">${project.level}</span>
    `;

    button.onclick = () => {
      selectedProject = project;
      selectedTab = "overview";
      render();
    };

    projectList.appendChild(button);
  });
}

function renderTabs() {
  const tabsContainer = $("tabs");
  clearElement(tabsContainer);

  tabs.forEach((tab) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab${selectedTab === tab.key ? " active" : ""}`;
    button.textContent = tab.label;

    button.onclick = () => {
      selectedTab = tab.key;
      renderTabs();
      renderDetails();
    };

    tabsContainer.appendChild(button);
  });
}

function renderDetails() {
  
  
  const activeTab = tabs.find((tab) => tab.key === selectedTab) || tabs[0];
  const items = selectedProject[activeTab.key] || [];

  $("categoryLabel").textContent = `${selectedProject.category} • ${selectedProject.level}`;
  $("projectTitle").textContent = selectedProject.title;
  $("projectOutcome").textContent = selectedProject.outcome;
  $("sectionTitle").textContent = activeTab.title;

  const sectionItems = $("sectionItems");
  clearElement(sectionItems);
  
 if (activeTab.key === "wiring") {
  sectionItems.innerHTML = `
   <div style="padding:20px;background:#f1f5f9;border-radius:16px;text-align:center">
  <b>System Flow</b><br><br>

  <div style="display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap">
    <div style="padding:10px 16px;background:white;border-radius:10px">5V Power</div>
    →
    <div style="padding:10px 16px;background:white;border-radius:10px">Sensor</div>
    →
    <div style="padding:10px 16px;background:white;border-radius:10px">Arduino</div>
    →
    <div style="padding:10px 16px;background:white;border-radius:10px">Logic</div>
    →
    <div style="padding:10px 16px;background:white;border-radius:10px">LCD Display</div>
  </div>

  <br>

  <div style="display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap">
    <div style="padding:10px 16px;background:white;border-radius:10px">Reset Button</div>
    →
    <div style="padding:10px 16px;background:white;border-radius:10px">Arduino Pin 3</div>
  </div>
</div>

      <div>
        ${selectedProject.wiring.map(item => `
          <div style="background:#f8fafc;border:1px solid #e5e7eb;padding:14px;border-radius:16px;margin-bottom:10px">
            ${item}
          </div>
        `).join("")}
      </div>

    </div>
  `;
  return;
}

  if (activeTab.key === "code") {
    const pre = document.createElement("pre");
    pre.textContent = selectedProject.code;
    sectionItems.appendChild(pre);
    return;
  }

  if (activeTab.key === "resources") {
    const grid = document.createElement("div");
    grid.className = "resource-grid";

    items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "resource";
      div.innerHTML = `<strong>${item}</strong><span>Included in this module.</span>`;
      grid.appendChild(div);
    });

    sectionItems.appendChild(grid);
    return;
  }

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent =
      activeTab.key === "build" ? `${index + 1}. ${item}` : item;
    sectionItems.appendChild(div);
  });
}

function render() {
  renderFilters();
  renderProjects();
  renderTabs();
  renderDetails();
}

function scrollToProjects() {
  $("projectsSection").scrollIntoView({ behavior: "smooth" });
}

function openBuilder() {
  $("modalTitle").textContent = selectedProject.title;
  $("modalSubtitle").textContent = selectedProject.outcome;

  simCount = 0;
  resetSim();

  const checklist = $("progressChecklist");
  clearElement(checklist);

  const steps = [
    "Understand the problem",
    "Gather components",
    "Wire the system",
    "Upload code / build logic",
    "Test safely",
    "Troubleshoot faults",
    "Upgrade industrially"
  ];

  steps.forEach((step, index) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" ${
      index === 0 ? "checked" : ""
    }> ${step}`;
    checklist.appendChild(label);
  });

  $("simInstruction").textContent =
    selectedProject.category === "PLC"
      ? "Simulate a start signal and a fault condition."
      : "Simulate a sensor signal and inject a fault condition.";

  $("builderModal").classList.add("show");
}

function closeBuilder() {
  $("builderModal").classList.remove("show");
}

function simulateGoodSignal() {
  simCount++;
  $("simCounter").textContent = simCount;
  $("faultAlert").classList.remove("show");
}
function simulateNoSignal() {
  const alert = $("faultAlert");
  alert.textContent = "No detection: Check sensor alignment, wiring, or power supply.";
  alert.classList.add("show");
}

function simulateFault() {
  const randomJump = Math.floor(Math.random() * 3) + 1;
  simCount += randomJump;

  $("simCounter").textContent = simCount;

  const alert = $("faultAlert");
  alert.textContent =
    "Fault: Sensor bouncing detected. Solution: Add debounce logic or improve sensor mounting.";
  alert.classList.add("show");
}

function resetSim() {
  simCount = 0;
  $("simCounter").textContent = simCount;
  $("faultAlert").classList.remove("show");
}

$("search").addEventListener("input", (event) => {
  searchQuery = event.target.value;
  renderProjects();
  renderDetails();
});

render();