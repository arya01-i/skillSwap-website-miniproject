// ===================== Auth =====================
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Signup successful. Please login.");
    window.location.href = "login.html";
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials");
    }
  });
}

// ===================== Header Auth Link =====================
const authLink = document.getElementById("auth-link");
if (authLink) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  authLink.textContent = isLoggedIn ? "Sign Out" : "Sign In";
  authLink.href = isLoggedIn ? "#" : "login.html";

  if (isLoggedIn) {
    authLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      window.location.reload();
    });
  }
}

// ===================== Navigation Guard =====================
const dashboardLink = document.getElementById("dashboard-link");
const marketplaceLink = document.getElementById("marketplace-link");

function guardNavigation(event, targetUrl) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    event.preventDefault();
    window.location.href = "signup.html";
  } else {
    window.location.href = targetUrl;
  }
}

if (dashboardLink) {
  dashboardLink.addEventListener("click", function (e) {
    guardNavigation(e, "dashboard.html");
  });
}

if (marketplaceLink) {
  marketplaceLink.addEventListener("click", function (e) {
    guardNavigation(e, "marketplace.html");
  });
}


const marketplaceSkills = [
  {
    id: 101,
    owner: "Alice",
    photo: "images/guitar.jpg",
    name: "Guitar",
    price: 30,
    desc: "Learn to play acoustic and electric guitar from scratch",
    exchangeNeeds: "Looking for Piano or Vocal lessons"
  },
  {
    id: 102,
    owner: "Charlie",
    photo: "images/cooking.jpg",
    name: "Cooking",
    price: 35,
    desc: "Master Italian and Mediterranean cooking techniques",
    exchangeNeeds: "Open to Yoga or Guitar lessons"
  },
    {
    id: 103,
    owner: "Fiona",
    photo: "images/photography.jpg",
    name: "Photography Guide (PDF)",
    price: 15,
    desc: "Comprehensive PDF guide",
    exchangeNeeds: "Looking for Cooking or Spanish classes"
  },
  {
    id: 104,
    owner: "Diana",
    photo: "images/yoga.jpg",
    name: "Yoga",
    price: 20,
    desc: "Hatha and Vinyasa yoga for beginners and intermediates",
    exchangeNeeds: "Looking for Spanish or Meditation coaching"
  },
  {
    id: 105,
    owner: "Ethan",
    photo: "images/python.jpg",
    name: "Python",
    price: 40,
    desc: "Learn Python programming from basics to advanced",
    exchangeNeeds: "Wants Web Design or JavaScript lessons"
  },
    {
    id: 106,
    owner: "Bob",
    photo: "images/spanish.jpg",
    name: "Spanish",
    price: 25,
    desc: "Beginner to intermediate conversational Spanish course",
    exchangeNeeds: "Wants Photography or Cooking classes"
  },
  {
    id: 107,
    owner: "George",
    photo: "images/js.jpg",
    name: "30-Day JavaScript Course",
    price: 35,
    desc: "Hands-on JavaScript fundamentals with projects",
    exchangeNeeds: "Open to any"
  },
  {
    id: 108,
    owner: "Ian",
    photo: "images/socialmedia.jpg",
    name: "Social Media Strategy",
    price: 45,
    desc: "Create effective social media marketing plans",
    exchangeNeeds: "Wants Logo Design or JavaScript courses"
  }
];


// ===================== Get Started =====================
const getStartedBtn = document.getElementById("get-started-btn");
if (getStartedBtn) {
  getStartedBtn.addEventListener("click", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      window.location.href = "#details";
    } else {
      window.location.href = "signup.html";
    }
  });
}
const detailsSection = document.getElementById("details");
const featuredCards = document.getElementById("featured-cards");

if (detailsSection && localStorage.getItem("isLoggedIn") === "true") {
  detailsSection.style.display = "block";

  // Show first 3 marketplace skills
  const topSkills = marketplaceSkills.slice(0, 3);
  featuredCards.innerHTML = topSkills
    .map(skill => `
      <div class="card">
        <img src="${skill.photo}" alt="${skill.name}" />
        <div class="card-body">
          <h3>${skill.name}</h3>
          <p><em>By: ${skill.owner}</em></p>
          <p>${skill.desc}</p>
          <p><strong>Price:</strong> €${skill.price}</p>
        </div>
      </div>
    `)
    .join('');
}

// ===================== Dashboard =====================
const dashboardPage = document.getElementById("dashboard-page");

if (dashboardPage) {
  // Check login
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  let user = JSON.parse(localStorage.getItem("user"));

  if (!isLoggedIn || !user) {
    window.location.href = "login.html";
  }
  if (!user.skills) {
    user.skills = [
      { id: 1, name: "Photography", desc: "Teach basics of DSLR", price: 20, img: "images/photography.jpg" },
      { id: 2, name: "Python", desc: "Intro to Python coding", price: 15, img: "images/python.jpg" }
    ];
    user.exchanged = ["Yoga", "Spanish"];
    user.bought = ["Guitar", "Cooking"];
    user.earnings = 35;
    localStorage.setItem("user", JSON.stringify(user));
  }

  // DOM references
  document.getElementById("profile-name").textContent = user.name || "No Name";
  document.getElementById("profile-email").textContent = user.email || "No Email";

  const skillsList = document.getElementById("skills-list");
  const boughtList = document.getElementById("bought-list");
  const exchangedList = document.getElementById("exchanged-list");

  function updateStats() {
    document.getElementById("skill-count").textContent = user.skills.length;
    document.getElementById("exchanged-count").textContent = user.exchanged.length;
    document.getElementById("bought-count").textContent = user.bought.length;
    document.getElementById("total-earnings").textContent = `€${user.earnings}`;
  }

  function renderSkills() {
    skillsList.innerHTML = "";
    user.skills.forEach(skill => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <img src="${skill.img || 'images/default.png'}" width="50" />
          <strong>${skill.name}</strong> - €${skill.price}<br/>
          <small>${skill.desc}</small>
        </div>
        <div>
          <button onclick="editSkill(${skill.id})">Edit</button>
          <button onclick="deleteSkill(${skill.id})">Delete</button>
        </div>
      `;
      skillsList.appendChild(li);
    });
    updateStats();
    localStorage.setItem("user", JSON.stringify(user));
  }

  function renderRecent() {
    boughtList.innerHTML = user.bought.map(b => `<li>${b}</li>`).join('');
    exchangedList.innerHTML = user.exchanged.map(e => `<li>${e}</li>`).join('');
  }

  // ======= Edit Skill Modal =======
  let editingId = null;

  window.editSkill = function (id) {
    const skill = user.skills.find(s => s.id === id);
    if (!skill) return;
    editingId = id;
    document.getElementById("edit-name").value = skill.name;
    document.getElementById("edit-desc").value = skill.desc;
    document.getElementById("edit-price").value = skill.price;
    document.getElementById("edit-modal").style.display = "flex";
  };

  window.closeModal = function () {
    document.getElementById("edit-modal").style.display = "none";
  };

  window.saveSkill = function () {
    const name = document.getElementById("edit-name").value;
    const desc = document.getElementById("edit-desc").value;
    const price = parseFloat(document.getElementById("edit-price").value);

    if (!name || isNaN(price)) {
      alert("Invalid input");
      return;
    }

    const skill = user.skills.find(s => s.id === editingId);
    if (skill) {
      skill.name = name;
      skill.desc = desc;
      skill.price = price;
    }

    closeModal();
    renderSkills();
  };
  document.getElementById("save-skill").onclick = saveSkill;

  window.deleteSkill = function (id) {
    const skill = user.skills.find(s => s.id === id);
    if (!skill) return;

    const confirmDelete = confirm(`Are you sure you want to delete "${skill.name}"?`);
    if (!confirmDelete) return;

    user.skills = user.skills.filter(s => s.id !== id);
    renderSkills();
    updateStats();
    localStorage.setItem("user", JSON.stringify(user));
  };


  // ======= Add Skill Modal =======
  const addSkillBtn = document.getElementById("add-skill-btn");
  const addModal = document.getElementById("add-modal");
  const closeAddModal = document.getElementById("close-add-modal");
  const addSkillForm = document.getElementById("add-skill-form");

  addSkillBtn.onclick = () => addModal.style.display = "flex";
  closeAddModal.onclick = () => addModal.style.display = "none";

  window.onclick = (e) => {
    if (e.target === addModal || e.target === document.getElementById("edit-modal")) {
      addModal.style.display = "none";
      closeModal();
    }
  };

  addSkillForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("add-name").value;
    const desc = document.getElementById("add-desc").value;
    const price = parseFloat(document.getElementById("add-price").value);
    const img = document.getElementById("add-img").value || "images/default.png";

    if (!name || isNaN(price)) {
      alert("Please provide valid name and price.");
      return;
    }

    const newSkill = {
      id: Date.now(),
      name,
      desc,
      price,
      img
    };

    user.skills.push(newSkill);
    addSkillForm.reset();
    addModal.style.display = "none";
    renderSkills();
  });

  // ======= Initial Load =======
  renderSkills();
  renderRecent();
}

// ===================== Marketplace =====================

const marketplaceCards = document.getElementById("marketplace-cards");
const swapModal = document.getElementById("swap-modal");
const buyModal = document.getElementById("buy-modal");
const swapClose = document.getElementById("swap-close");
const buyClose = document.getElementById("buy-close");

const theirSkillSelect = document.getElementById("their-skill-select");
const yourSkillSelect = document.getElementById("your-skill-select");
const priceDiffMsg = document.getElementById("price-diff-msg");
const swapConfirmBtn = document.getElementById("swap-confirm-btn");

const buySkillDetails = document.getElementById("buy-skill-details");
const payNowBtn = document.getElementById("pay-now-btn");
const paymentMsg = document.getElementById("payment-msg");

const getUserSkills = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  return userData?.skills || [
    { id: 1, name: "Photography", desc: "Teach basics of DSLR", price: 20 },
    { id: 2, name: "Python", desc: "Intro to Python coding", price: 15 }
  ];
};

function renderMarketplace() {
  if (!marketplaceCards) return;
  marketplaceCards.innerHTML = "";

  marketplaceSkills.forEach(skill => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${skill.photo}" alt="${skill.name}" />
      <div class="card-body">
        <h3>${skill.name}</h3>
        <p><em>By: ${skill.owner}</em></p>
        <p>${skill.desc}</p>
        <p><strong>Price:</strong> €${skill.price}</p>
        <p><strong>Exchange Needs:</strong> ${skill.exchangeNeeds}</p>
      </div>
      <div class="card-footer">
        <button class="swap-btn" data-id="${skill.id}">Swap</button>
        <button class="buy-btn" data-id="${skill.id}">Buy Now</button>
      </div>
    `;
    marketplaceCards.appendChild(card);
  });

  
  document.querySelectorAll(".swap-btn").forEach(btn =>
    btn.addEventListener("click", onSwapClick)
  );
  document.querySelectorAll(".buy-btn").forEach(btn =>
    btn.addEventListener("click", onBuyClick)
  );
}


let selectedMarketplaceSkill = null;

function onSwapClick(e) {
  const skillId = parseInt(e.target.dataset.id);
  selectedMarketplaceSkill = marketplaceSkills.find(s => s.id === skillId);
  if (!selectedMarketplaceSkill) return;

  theirSkillSelect.innerHTML = `<option value="${selectedMarketplaceSkill.id}">${selectedMarketplaceSkill.name} (€${selectedMarketplaceSkill.price})</option>`;

  const userSkills = getUserSkills();
  yourSkillSelect.innerHTML = "";
  userSkills.forEach(s => {
    const option = document.createElement("option");
    option.value = s.id;
    option.textContent = `${s.name} (€${s.price})`;
    yourSkillSelect.appendChild(option);
  });

  priceDiffMsg.textContent = "";
  swapConfirmBtn.disabled = true;

  swapModal.style.display = "flex";

  yourSkillSelect.onchange = calculatePriceDiff;
  theirSkillSelect.onchange = calculatePriceDiff;
  calculatePriceDiff();
}

function calculatePriceDiff() {
  const theirSkillId = parseInt(theirSkillSelect.value);
  const yourSkillId = parseInt(yourSkillSelect.value);
  const theirSkill = marketplaceSkills.find(s => s.id === theirSkillId);
  const userSkills = getUserSkills();
  const yourSkill = userSkills.find(s => s.id === yourSkillId);

  if (!theirSkill || !yourSkill) {
    priceDiffMsg.textContent = "";
    swapConfirmBtn.disabled = true;
    return;
  }

  const diff = theirSkill.price - yourSkill.price;
  if (diff > 0) {
    priceDiffMsg.textContent = `You need to pay €${diff.toFixed(2)} to swap.`;
  } else if (diff < 0) {
    priceDiffMsg.textContent = `${selectedMarketplaceSkill.owner} needs to pay you €${(-diff).toFixed(2)} after swap.`;
  } else {
    priceDiffMsg.textContent = `Prices match! No extra payment needed.`;
  }
  swapConfirmBtn.disabled = false;
}

swapConfirmBtn.onclick = function () {
  alert(`Mail sent to ${selectedMarketplaceSkill.owner} to accept swap!`);
  swapModal.style.display = "none";
};

swapClose.onclick = () => { swapModal.style.display = "none"; };
buyClose.onclick = () => {
  buyModal.style.display = "none";
  paymentMsg.style.display = "none";
  payNowBtn.style.display = "inline-block";
};

let selectedBuySkill = null;

function onBuyClick(e) {
  const skillId = parseInt(e.target.dataset.id);
  selectedBuySkill = marketplaceSkills.find(s => s.id === skillId);
  if (!selectedBuySkill) return;

  buySkillDetails.innerHTML = `
    <p><strong>Skill:</strong> ${selectedBuySkill.name}</p>
    <p><strong>Price:</strong> €${selectedBuySkill.price}</p>
    <p><strong>Description:</strong> ${selectedBuySkill.desc}</p>
  `;

  paymentMsg.style.display = "none";
  payNowBtn.style.display = "inline-block";

  buyModal.style.display = "flex";
}

payNowBtn.onclick = function () {
  
  const cardNum = document.getElementById("card-number").value.trim();
  const cardExp = document.getElementById("card-expiry").value.trim();
  const cardCvc = document.getElementById("card-cvc").value.trim();

  if (!cardNum || !cardExp || !cardCvc) {
    alert("Please enter valid payment details.");
    return;
  }

  payNowBtn.disabled = true;

  setTimeout(() => {
    payNowBtn.disabled = false;
    payNowBtn.style.display = "none";
    paymentMsg.style.display = "block";

    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) user = { skills: [], exchanged: [], bought: [], earnings: 0 };

    user.bought = user.bought || [];
    user.earnings = user.earnings || 0;

    user.bought.push(selectedBuySkill.name);
    user.earnings += selectedBuySkill.price;

    localStorage.setItem("user", JSON.stringify(user));

    if (document.getElementById("bought-list") && document.getElementById("bought-count") && document.getElementById("total-earnings")) {
      document.getElementById("bought-list").innerHTML = user.bought.map(b => `<li>${b}</li>`).join('');
      document.getElementById("bought-count").textContent = user.bought.length;
      document.getElementById("total-earnings").textContent = user.earnings.toFixed(2);
    }

    setTimeout(() => {
      buyModal.style.display = "none";
      paymentMsg.style.display = "none";
      payNowBtn.style.display = "inline-block";
      document.getElementById("card-number").value = "";
      document.getElementById("card-expiry").value = "";
      document.getElementById("card-cvc").value = "";
    }, 2000);

  }, 1500); 
};

window.onclick = function(event) {
  if (event.target === swapModal) swapModal.style.display = "none";
  if (event.target === buyModal) buyModal.style.display = "none";
};

renderMarketplace();
