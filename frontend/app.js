/* ==========================================================================
   MOCK DATABASE (15 CHIKKUNDO PROFILES)
   ========================================================================== */
const mockProfiles = [
    {
        id: 1,
        name: "Ananya",
        age: 23,
        gender: "female",
        bio: "A certified coffee enthusiast who believes in mid-level energy. Let's debate which filter coffee joint is best in Kochi. Freelance UX Designer.",
        city: "Kochi",
        occupation: "UX Designer",
        trustScore: 98,
        interests: ["Music", "Travel", "Art", "Cooking"],
        lookingFor: "Friendship",
        image: "images/female_1.png",
        isOnline: true
    },
    {
        id: 2,
        name: "Gautham",
        age: 25,
        gender: "male",
        bio: "I build apps, but mostly I just play video games and look for the best beef fry in town. Looking for someone to match my chill gaming sessions.",
        city: "Kochi",
        occupation: "Software Engineer",
        trustScore: 95,
        interests: ["Gaming", "Coding", "Movies", "Music"],
        lookingFor: "Relationship",
        image: "images/male_1.png",
        isOnline: true
    },
    {
        id: 3,
        name: "Keerthi",
        age: 22,
        gender: "female",
        bio: "Just a content creator trying to find a normal person to hangout with outside of Instagram. I love bookstore dates and warm tea.",
        city: "Bangalore",
        occupation: "Content Creator",
        trustScore: 97,
        interests: ["Reading", "Art", "Travel", "Movies"],
        lookingFor: "Friendship",
        image: "images/female_2.png",
        isOnline: false
    },
    {
        id: 4,
        name: "Vivek",
        age: 26,
        gender: "male",
        bio: "Street photographer. I find beauty in the mundane. Let's explore local markets and shoot some candid street portraits.",
        city: "Chennai",
        occupation: "Photographer",
        trustScore: 92,
        interests: ["Art", "Travel", "Movies", "Fitness"],
        lookingFor: "Relationship",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
        isOnline: true
    },
    {
        id: 5,
        name: "Meera",
        age: 24,
        gender: "female",
        bio: "Architect. I look at buildings and dream about sustainable living. Love classical music and trying to learn how to cook Kerala dishes.",
        city: "Trivandrum",
        occupation: "Architect",
        trustScore: 96,
        interests: ["Music", "Cooking", "Art", "Reading"],
        lookingFor: "Friendship",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
        isOnline: false
    },
    {
        id: 6,
        name: "Rahul",
        age: 27,
        gender: "male",
        bio: "Product Manager by day, terrible acoustic guitarist by night. Let's exchange playlists and talk about tech trends.",
        city: "Bangalore",
        occupation: "Product Manager",
        trustScore: 94,
        interests: ["Music", "Coding", "Fitness", "Travel"],
        lookingFor: "Relationship",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
        isOnline: true
    },
    {
        id: 7,
        name: "Devika",
        age: 23,
        gender: "female",
        bio: "Illustrator and part-time comic artist. My life is 70% sketching and 30% worrying about deadline extensions. Let's sketch together!",
        city: "Kochi",
        occupation: "Illustrator",
        trustScore: 99,
        interests: ["Art", "Anime", "Movies", "Gaming"],
        lookingFor: "Friendship",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
        isOnline: true
    },
    {
        id: 8,
        name: "Keerthan",
        age: 25,
        gender: "male",
        bio: "Opened a small cafe recently. I can bake a mean chocolate chip cookie. Looking for friends to test out my new recipe creations on.",
        city: "Calicut",
        occupation: "Cafe Owner",
        trustScore: 93,
        interests: ["Cooking", "Music", "Travel", "Fitness"],
        lookingFor: "Friendship",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
        isOnline: false
    },
    {
        id: 9,
        name: "Shruti",
        age: 22,
        gender: "female",
        bio: "Postgrad student. Studying literature. I live in a world of fictional characters. Looking for anyone who can recommend a good book.",
        city: "Chennai",
        occupation: "Student",
        trustScore: 91,
        interests: ["Reading", "Movies", "Music", "Art"],
        lookingFor: "Friendship",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
        isOnline: true
    },
    {
        id: 10,
        name: "Arjun",
        age: 26,
        gender: "male",
        bio: "Bass guitarist for an indie band. Music is my escape. Let's grab some chai and hum some classic 90s Rahman songs.",
        city: "Kochi",
        occupation: "Musician",
        trustScore: 96,
        interests: ["Music", "Movies", "Travel", "Gaming"],
        lookingFor: "Relationship",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
        isOnline: false
    },
    {
        id: 11,
        name: "Riya",
        age: 24,
        gender: "female",
        bio: "Working in corporate HR. I spend my time telling people to submit documents, but I'm actually fun outside the office. Love badminton.",
        city: "Bangalore",
        occupation: "HR Associate",
        trustScore: 95,
        interests: ["Fitness", "Travel", "Movies", "Cooking"],
        lookingFor: "Relationship",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
        isOnline: true
    },
    {
        id: 12,
        name: "Sanjay",
        age: 28,
        gender: "male",
        bio: "Personal trainer and nutritionist. I help people get fit without starving. Let's plan outdoor workouts or just talk about food.",
        city: "Trivandrum",
        occupation: "Fitness Coach",
        trustScore: 97,
        interests: ["Fitness", "Cooking", "Travel", "Music"],
        lookingFor: "Relationship",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80",
        isOnline: true
    },
    {
        id: 13,
        name: "Neha",
        age: 23,
        gender: "female",
        bio: "Fashion Design student. Always stitching or sketching. I can customize a jacket for you if you're nice to me.",
        city: "Coimbatore",
        occupation: "Fashion Designer",
        trustScore: 94,
        interests: ["Art", "Travel", "Music", "Anime"],
        lookingFor: "Friendship",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
        isOnline: false
    },
    {
        id: 14,
        name: "Abhijith",
        age: 25,
        gender: "male",
        bio: "Aspiring screenwriter. Writing stories that will probably never make it to theatres. If you love cinema and scriptwriting, let's talk.",
        city: "Kochi",
        occupation: "Writer",
        trustScore: 95,
        interests: ["Movies", "Reading", "Music", "Coding"],
        lookingFor: "Friendship",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
        isOnline: true
    },
    {
        id: 15,
        name: "Divya",
        age: 25,
        gender: "female",
        bio: "Data Analyst. I love turning messy numbers into neat graphs. In my free time, I hike, run, and play board games.",
        city: "Bangalore",
        occupation: "Analyst",
        trustScore: 96,
        interests: ["Fitness", "Gaming", "Travel", "Reading"],
        lookingFor: "Relationship",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=80",
        isOnline: false
    }
];

// In-Memory Simulated State
let state = {
    currentUser: null,
    activeScreen: "screen-landing",
    selectedInterests: [],
    selectedLookingFor: "Friendship",
    activeProfileDetail: null,
    sentRequests: [], // Holds requests sent during session
    incomingRequests: [
        {
            id: 101,
            senderName: "Rahul V.",
            age: 25,
            city: "Kochi",
            reason: "We both love 🎮 Gaming and 🎧 Music. Let's co-op some games sometime!",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"
        },
        {
            id: 102,
            senderName: "Devika",
            age: 23,
            city: "Kochi",
            reason: "Saw your bio. I also spend too much time sketching! I'd like to be friends.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
        }
    ],
    activeChats: [
        {
            id: 1,
            name: "Ananya",
            avatar: "images/female_1.png",
            messages: [
                { sender: "them", text: "Hey! Saw your connection request. How's Kochi treating you?", time: "10:15 AM" },
                { sender: "you", text: "Hey! Kochi is great, just looking for some good cafe spots.", time: "10:18 AM" },
                { sender: "them", text: "Ah, you should try the vintage spot in Fort Kochi. Let me know when you go!", time: "10:20 AM" }
            ],
            isOnline: true
        }
    ],
    activeChatContactId: null,
    searchQuery: ""
};

/* ==========================================================================
   INITIALIZATION & SCREEN MANAGER
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Start Time Clock
    updateClock();
    setInterval(updateClock, 1000);

    // Setup Simulator Controller Drawer
    setupSimulatorControls();

    // Setup OTP inputs shifts
    setupOTPAutoShifting();

    // Setup Setup Tags selectors
    setupProfileSetupSelectors();

    // Populate Home suggestions
    renderSuggestions();

    // Populate Requests screen
    renderRequests();

    // Populate chats list
    renderChatsList();
});

// Update the simulated phone status-bar clock
function updateClock() {
    const timeEl = document.getElementById("statusTime");
    if (timeEl) {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // hour '0' should be '12'
        timeEl.textContent = `${hours}:${minutes} ${ampm}`;
    }
}

// Router navigation logic
function navigateTo(screenId) {
    const screens = document.querySelectorAll(".screen");
    let targetScreen = document.getElementById(screenId);

    if (!targetScreen) return;

    // Remove active state from current active screen
    const currentActive = document.querySelector(".screen.active");
    if (currentActive) {
        currentActive.classList.remove("active");
        currentActive.style.display = "none";
    }

    // Set active status on destination screen
    targetScreen.style.display = "flex";
    // Trigger browser reflow for CSS transitions
    targetScreen.offsetHeight;
    targetScreen.classList.add("active");

    state.activeScreen = screenId;

    // Sync Bottom Navigation items
    syncBottomNavigation(screenId);

    // Sync Simulator Panel Button highlights
    syncSimulatorPanelButtons(screenId);

    // Close mobile simulator menu drawer if active
    document.getElementById("demoControls").classList.remove("active");
}

// Keep Bottom Navigation bar items synchronized with the displayed screen
function syncBottomNavigation(screenId) {
    const bottomNavs = document.querySelectorAll(".bottom-nav");
    bottomNavs.forEach(nav => {
        const items = nav.querySelectorAll(".nav-item");
        items.forEach(item => {
            item.classList.remove("active");
            
            // Extract screen destination from item's action
            const clickAttr = item.getAttribute("onclick");
            if (clickAttr && clickAttr.includes(screenId)) {
                item.classList.add("active");
            }
        });
    });
}

// Synchronize Sidebar control indicators
function syncSimulatorPanelButtons(screenId) {
    const buttons = document.querySelectorAll(".demo-btn");
    buttons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute("data-screen") === screenId) {
            btn.classList.add("active");
        }
    });
}

// Simulator drawer behaviors
function setupSimulatorControls() {
    const demoControls = document.getElementById("demoControls");
    const openBtn = document.getElementById("openDemoControls");
    const closeBtn = document.getElementById("closeDemoControls");

    openBtn.addEventListener("click", () => {
        demoControls.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        demoControls.classList.remove("active");
    });

    // Wire up individual jump buttons
    const demoButtons = document.querySelectorAll(".demo-btn");
    demoButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const destScreen = btn.getAttribute("data-screen");
            navigateTo(destScreen);
        });
    });
}

/* ==========================================================================
   TOAST ALERTS SYSTEM
   ========================================================================== */
function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let iconName = "info";
    if (type === "success") iconName = "check-circle";
    if (type === "danger") iconName = "alert-triangle";

    toast.innerHTML = `
        <i data-lucide="${iconName}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Slide in & Auto remove
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(50px)";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ==========================================================================
   SCREEN 2: SIGNUP FORM HANDLERS
   ========================================================================== */
function handleSignup(event) {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const passError = document.getElementById("passwordError");

    // Clear previous errors
    passError.style.display = "none";

    // Verify Password Match
    if (password !== confirmPassword) {
        passError.style.display = "block";
        showToast("Passwords do not match!", "danger");
        return;
    }

    // Save temporary details for setup screen injection
    state.currentUser = {
        fullName,
        username,
        email,
        phone
    };

    // Auto fill verification text placeholders
    document.getElementById("otpEmailDest").textContent = email;
    document.getElementById("otpPhoneDest").textContent = phone;

    showToast("Account details saved! Verifying codes.", "success");
    navigateTo("screen-verification");
}

/* ==========================================================================
   SCREEN 3: OTP VERIFICATION
   ========================================================================== */
function setupOTPAutoShifting() {
    const otpGroups = ["email", "phone"];

    otpGroups.forEach(group => {
        const groupEl = document.querySelector(`[data-otp-group="${group}"]`);
        if (!groupEl) return;

        const inputs = groupEl.querySelectorAll(".otp-box");
        inputs.forEach((input, index) => {
            // Forward movement on typing
            input.addEventListener("input", (e) => {
                if (e.target.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Backward movement on delete key
            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    });
}

function handleVerificationSubmit() {
    // In a real application, we would check the inputs. For demo we assume they entered numbers.
    let valid = true;
    const allOtpInputs = document.querySelectorAll(".otp-box");
    
    allOtpInputs.forEach(input => {
        if (!input.value) {
            valid = false;
        }
    });

    if (!valid) {
        showToast("Please enter all 4-digit codes.", "danger");
        return;
    }

    showToast("Verification completed successfully!", "success");
    navigateTo("screen-setup");
}

function resendOTP() {
    showToast("OTP Codes resent successfully to your details!", "success");
}

/* ==========================================================================
   SCREEN 4: PROFILE SETUP FORM
   ========================================================================== */
function triggerPhotoUpload() {
    document.getElementById("photoInput").click();
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("avatarPreview").src = e.target.result;
            showToast("Photo uploaded successfully!", "success");
        };
        reader.readAsDataURL(file);
    }
}

function setupProfileSetupSelectors() {
    // Interest tag click behavior
    const container = document.getElementById("setupInterestsContainer");
    if (!container) return;

    container.addEventListener("click", (e) => {
        const tag = e.target.closest(".tag-selector");
        if (!tag) return;

        const interest = tag.getAttribute("data-interest");
        
        if (tag.classList.contains("selected")) {
            tag.classList.remove("selected");
            state.selectedInterests = state.selectedInterests.filter(i => i !== interest);
        } else {
            tag.classList.add("selected");
            state.selectedInterests.push(interest);
        }
    });

    // Looking for buttons selection
    const lookBtns = document.querySelectorAll(".looking-for-row .look-btn");
    lookBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            lookBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            state.selectedLookingFor = btn.getAttribute("data-looking");
        });
    });
}

function handleProfileSetup(event) {
    event.preventDefault();
    const dobValue = document.getElementById("setupDOB").value;
    const dobError = document.getElementById("dobError");
    const bio = document.getElementById("setupBio").value.trim();
    const city = document.getElementById("setupCity").value.trim();
    const occupation = document.getElementById("setupOcc").value.trim();

    dobError.style.display = "none";

    // 18+ Age Validation logic
    const birthDate = new Date(dobValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        dobError.style.display = "block";
        showToast("You must be 18 or older to join Chikkundo!", "danger");
        return;
    }

    if (state.selectedInterests.length < 3) {
        showToast("Please select at least 3 interests to match profiles.", "danger");
        return;
    }

    // Merge setups with current user state
    state.currentUser = {
        ...state.currentUser,
        age,
        bio,
        city,
        occupation,
        interests: state.selectedInterests,
        lookingFor: state.selectedLookingFor,
        avatar: document.getElementById("avatarPreview").src
    };

    showToast("Profile set up complete! Welcome to Chikkundo.", "success");
    navigateTo("screen-home");
}

/* ==========================================================================
   SCREEN 5: SUGGESTIONS FEED & SEARCH
   ========================================================================== */
function renderSuggestions() {
    const container = document.getElementById("suggestionsContainer");
    if (!container) return;

    container.innerHTML = "";

    // Filter based on state search query
    const filtered = mockProfiles.filter(profile => {
        const query = state.searchQuery.toLowerCase();
        if (!query) return true;

        const nameMatch = profile.name.toLowerCase().includes(query);
        const cityMatch = profile.city.toLowerCase().includes(query);
        const occMatch = profile.occupation.toLowerCase().includes(query);
        const interestMatch = profile.interests.some(interest => interest.toLowerCase().includes(query));

        return nameMatch || cityMatch || occMatch || interestMatch;
    });

    // Update suggestions count label
    document.getElementById("suggestionCount").textContent = `${filtered.length} profile${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i data-lucide="search-code"></i></div>
                <h3>No Matches Found</h3>
                <p>Try searching for a different interest or city name.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    filtered.forEach(profile => {
        const card = document.createElement("div");
        card.className = "profile-card";
        
        // Generate lists of interest badges
        const tagsHTML = profile.interests.slice(0, 3).map(interest => `<span class="tag">#${interest}</span>`).join("");
        
        // Check if request is already sent
        const isRequestSent = state.sentRequests.some(r => r.id === profile.id);
        const connectBtnLabel = isRequestSent ? "Request Sent" : `<i data-lucide="user-plus"></i> Connect`;
        const connectBtnClass = isRequestSent ? "btn-secondary" : "btn-primary";
        const connectBtnDisabledAttr = isRequestSent ? "disabled" : "";

        card.innerHTML = `
            <img src="${profile.image}" alt="${profile.name}" class="profile-card-img" onerror="this.src='https://placehold.co/380x380/2a1b4e/ffffff?text=${profile.name}';">
            <div class="profile-card-overlay">
                <div class="profile-card-header">
                    <h3>${profile.name}, ${profile.age}</h3>
                    <div class="trust-badge">
                        <i data-lucide="shield-check"></i>
                        <span>${profile.trustScore}% Trust</span>
                    </div>
                </div>
                <div class="profile-card-sub">${profile.occupation} • ${profile.city}</div>
                <p class="profile-card-bio">${profile.bio}</p>
                <div class="profile-card-tags">
                    ${tagsHTML}
                </div>
                <div class="profile-card-actions">
                    <button class="btn btn-secondary w-full" onclick="openProfileDetail(${profile.id})">View Profile</button>
                    <button class="btn ${connectBtnClass} w-full" id="connect-btn-${profile.id}" ${connectBtnDisabledAttr} onclick="triggerConnectFromFeed(${profile.id})">
                        ${connectBtnLabel}
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    lucide.createIcons();
}

function handleSearch() {
    state.searchQuery = document.getElementById("searchInput").value;
    renderSuggestions();
}

/* ==========================================================================
   SCREEN 6: PROFILE DETAILS
   ========================================================================== */
function openProfileDetail(profileId) {
    const profile = mockProfiles.find(p => p.id === profileId);
    if (!profile) return;

    state.activeProfileDetail = profile;

    // Set Hero backdrop
    const heroSec = document.getElementById("detailHeroSection");
    heroSec.style.backgroundImage = `url('${profile.image}')`;

    // Populate profile details
    document.getElementById("detailNameAge").textContent = `${profile.name}, ${profile.age}`;
    document.getElementById("detailTrustScore").textContent = `${profile.trustScore}% Trust`;
    document.getElementById("detailOccupation").textContent = profile.occupation;
    document.getElementById("detailCity").textContent = profile.city;
    document.getElementById("detailBio").textContent = profile.bio;
    document.getElementById("detailBtnName").textContent = profile.name;

    // Populate details interest tags
    const interestsContainer = document.getElementById("detailInterests");
    interestsContainer.innerHTML = profile.interests.map(interest => `<span class="tag-selector selected">#${interest}</span>`).join("");

    // Populate looking for section
    const lookingEl = document.getElementById("detailLookingFor");
    const lookingEmoji = profile.lookingFor === "Friendship" ? "🤝" : "❤️";
    lookingEl.innerHTML = `<span class="emoji">${lookingEmoji}</span> ${profile.lookingFor}`;

    // Manage Connect Button State
    const connectBtn = document.getElementById("detailConnectBtn");
    const isRequestSent = state.sentRequests.some(r => r.id === profile.id);
    if (isRequestSent) {
        connectBtn.innerHTML = `<i data-lucide="check"></i> Connection Request Sent`;
        connectBtn.className = "btn btn-secondary";
        connectBtn.disabled = true;
    } else {
        connectBtn.innerHTML = `<i data-lucide="user-plus"></i> Connect with <span>${profile.name}</span>`;
        connectBtn.className = "btn btn-primary";
        connectBtn.disabled = false;
    }

    navigateTo("screen-profile-detail");
    lucide.createIcons();
}

/* ==========================================================================
   SCREEN 7: CONNECT REQUEST MODAL HANDLERS
   ========================================================================== */
let activeConnectTarget = null;
let activePresetReason = "We have similar interests.";

function triggerConnectFromFeed(profileId) {
    const profile = mockProfiles.find(p => p.id === profileId);
    if (!profile) return;

    activeConnectTarget = profile;
    openConnectModal();
}

function openConnectModal() {
    // If opening from details page, get active detail profile
    if (!activeConnectTarget && state.activeProfileDetail) {
        activeConnectTarget = state.activeProfileDetail;
    }

    if (!activeConnectTarget) return;

    document.getElementById("modalProfileName").textContent = activeConnectTarget.name;
    document.getElementById("connectModal").classList.add("active");
    document.getElementById("customReason").value = "";

    // Reset preset chips
    const chips = document.querySelectorAll(".reason-chip");
    chips.forEach(c => c.classList.remove("active"));
    chips[0].classList.add("active");
    activePresetReason = chips[0].textContent;
}

function closeConnectModal() {
    document.getElementById("connectModal").classList.remove("active");
    activeConnectTarget = null;
}

function selectPresetReason(btn) {
    const chips = document.querySelectorAll(".reason-chip");
    chips.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    activePresetReason = btn.textContent;
}

function submitConnectRequest() {
    if (!activeConnectTarget) return;

    const customText = document.getElementById("customReason").value.trim();
    const finalReason = customText || activePresetReason;

    // Save to sent requests in state
    state.sentRequests.push({
        id: activeConnectTarget.id,
        name: activeConnectTarget.name,
        avatar: activeConnectTarget.image,
        city: activeConnectTarget.city,
        reason: finalReason,
        time: "Just now"
    });

    showToast(`Connect request sent to ${activeConnectTarget.name}!`, "success");

    // If details screen is active, update button state
    if (state.activeScreen === "screen-profile-detail" && state.activeProfileDetail.id === activeConnectTarget.id) {
        const connectBtn = document.getElementById("detailConnectBtn");
        connectBtn.innerHTML = `<i data-lucide="check"></i> Connection Request Sent`;
        connectBtn.className = "btn btn-secondary";
        connectBtn.disabled = true;
    }

    // Refresh Suggestions and Request Pages
    renderSuggestions();
    renderRequests();
    closeConnectModal();
}

/* ==========================================================================
   SCREEN 8: REQUESTS SCREEN
   ========================================================================== */
function switchRequestTab(tabType) {
    const tabBtns = document.querySelectorAll(".requests-tabs .tab-btn");
    tabBtns.forEach(btn => btn.classList.remove("active"));

    // Highlight button
    if (tabType === 'incoming') tabBtns[0].classList.add("active");
    else tabBtns[1].classList.add("active");

    // Switch lists
    const incomingList = document.getElementById("incomingRequestsList");
    const sentList = document.getElementById("sentRequestsList");

    if (tabType === 'incoming') {
        incomingList.classList.add("active");
        sentList.classList.remove("active");
    } else {
        incomingList.classList.remove("active");
        sentList.classList.add("active");
    }
}

function renderRequests() {
    const incomingList = document.getElementById("incomingRequestsList");
    const sentList = document.getElementById("sentRequestsList");
    
    // Update badge values
    document.getElementById("incomingCountVal").textContent = state.incomingRequests.length;
    document.getElementById("sentCountVal").textContent = state.sentRequests.length;

    const navBadge = document.getElementById("incomingBadgeCount");
    if (state.incomingRequests.length > 0) {
        navBadge.textContent = state.incomingRequests.length;
        navBadge.classList.remove("hide");
    } else {
        navBadge.classList.add("hide");
    }

    // Render Incoming Requests
    incomingList.innerHTML = "";
    if (state.incomingRequests.length === 0) {
        incomingList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i data-lucide="inbox"></i></div>
                <h3>No Pending Requests</h3>
                <p>You're all caught up! Keep checking back later.</p>
            </div>
        `;
    } else {
        state.incomingRequests.forEach(req => {
            const card = document.createElement("div");
            card.className = "request-card";
            card.innerHTML = `
                <div class="request-card-info">
                    <img src="${req.avatar}" alt="${req.senderName}" class="request-avatar" onerror="this.src='https://placehold.co/80x80/2a1b4e/ffffff?text=${req.senderName}';">
                    <div class="request-meta">
                        <h4>${req.senderName}, ${req.age}</h4>
                        <span class="request-sub">${req.city}</span>
                    </div>
                </div>
                <div class="request-reason">"${req.reason}"</div>
                <div class="request-actions">
                    <button class="btn btn-primary" onclick="acceptRequest(${req.id})">Accept</button>
                    <button class="btn btn-secondary text-danger" onclick="declineRequest(${req.id})">Decline</button>
                </div>
            `;
            incomingList.appendChild(card);
        });
    }

    // Render Sent Requests
    sentList.innerHTML = "";
    if (state.sentRequests.length === 0) {
        sentList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i data-lucide="send"></i></div>
                <h3>No Requests Sent Yet</h3>
                <p>Browse suggestions on the home screen and click connect!</p>
            </div>
        `;
    } else {
        state.sentRequests.forEach(req => {
            const card = document.createElement("div");
            card.className = "request-card";
            card.innerHTML = `
                <div class="request-card-info">
                    <img src="${req.avatar}" alt="${req.name}" class="request-avatar" onerror="this.src='https://placehold.co/80x80/2a1b4e/ffffff?text=${req.name}';">
                    <div class="request-meta">
                        <h4>${req.name}</h4>
                        <span class="request-sub">${req.city} • ${req.time}</span>
                    </div>
                </div>
                <div class="request-reason">"${req.reason}"</div>
                <button class="btn btn-secondary w-full" disabled>Pending Approval</button>
            `;
            sentList.appendChild(card);
        });
    }

    lucide.createIcons();
}

function acceptRequest(requestId) {
    const requestIndex = state.incomingRequests.findIndex(r => r.id === requestId);
    if (requestIndex === -1) return;

    const request = state.incomingRequests[requestIndex];

    // Remove from requests list
    state.incomingRequests.splice(requestIndex, 1);

    // Create a new active chat sequence
    const newChatId = state.activeChats.length + 1;
    state.activeChats.push({
        id: newChatId,
        name: request.senderName,
        avatar: request.avatar,
        messages: [
            { sender: "them", text: `Hey! Thanks for accepting my connect request. Happy to chat!`, time: "Just now" }
        ],
        isOnline: true
    });

    showToast(`Connected with ${request.senderName}!`, "success");

    // Refresh layout, view chat list
    renderRequests();
    renderChatsList();
    navigateTo("screen-chat");
}

function declineRequest(requestId) {
    state.incomingRequests = state.incomingRequests.filter(r => r.id !== requestId);
    showToast("Request declined.", "info");
    renderRequests();
}

/* ==========================================================================
   SCREEN 9: INTERACTIVE CHAT SCREEN
   ========================================================================== */
function renderChatsList() {
    const listContainer = document.getElementById("chatListContainer");
    if (!listContainer) return;

    listContainer.innerHTML = "";
    if (state.activeChats.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i data-lucide="message-square-off"></i></div>
                <h3>No Chats Yet</h3>
                <p>Accept connection requests or wait for matches to start conversations.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    state.activeChats.forEach(chat => {
        const lastMsg = chat.messages[chat.messages.length - 1];
        const lastMsgText = lastMsg ? lastMsg.text : "No messages yet";
        const lastMsgTime = lastMsg ? lastMsg.time : "";

        const item = document.createElement("div");
        item.className = "chat-item";
        item.onclick = () => openChatWindow(chat.id);
        item.innerHTML = `
            <div class="chat-avatar-wrapper">
                <img src="${chat.avatar}" alt="${chat.name}" class="chat-avatar" onerror="this.src='https://placehold.co/100x100/2a1b4e/ffffff?text=${chat.name}';">
                ${chat.isOnline ? '<span class="online-dot"></span>' : ''}
            </div>
            <div class="chat-item-details">
                <div class="chat-item-header">
                    <h4>${chat.name}</h4>
                    <span class="chat-time">${lastMsgTime}</span>
                </div>
                <div class="chat-message-preview">${lastMsgText}</div>
            </div>
        `;
        listContainer.appendChild(item);
    });

    lucide.createIcons();
}

function openChatWindow(chatId) {
    const chat = state.activeChats.find(c => c.id === chatId);
    if (!chat) return;

    state.activeChatContactId = chatId;

    // Hide Bottom Nav when in dynamic conversation view
    document.getElementById("chatBottomNav").classList.add("hide");

    // Load user header metadata
    document.getElementById("chatActiveName").textContent = chat.name;
    document.getElementById("chatActiveAvatar").src = chat.avatar;
    
    const statusEl = document.querySelector(".chat-active-user .user-status");
    if (chat.isOnline) {
        statusEl.className = "user-status online";
        statusEl.textContent = "Online";
    } else {
        statusEl.className = "user-status";
        statusEl.textContent = "Offline";
    }

    // Toggle window view slide-in
    document.getElementById("chat-list-view").classList.remove("active");
    document.getElementById("chat-window-view").classList.add("active");

    // Populate messages
    renderChatMessages();
}

function closeChatWindow() {
    state.activeChatContactId = null;

    // Restore Bottom Nav
    document.getElementById("chatBottomNav").classList.remove("hide");

    // Toggle subviews
    document.getElementById("chat-window-view").classList.remove("active");
    document.getElementById("chat-list-view").classList.add("active");

    renderChatsList();
}

function renderChatMessages() {
    const messagesArea = document.getElementById("chatMessagesArea");
    if (!messagesArea) return;

    messagesArea.innerHTML = "";
    
    const chat = state.activeChats.find(c => c.id === state.activeChatContactId);
    if (!chat) return;

    chat.messages.forEach(msg => {
        const bubble = document.createElement("div");
        bubble.className = `msg-bubble ${msg.sender}`;
        bubble.innerHTML = `
            ${msg.text}
            <span class="msg-timestamp">${msg.time}</span>
        `;
        messagesArea.appendChild(bubble);
    });

    // Auto-scroll messages area to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById("chatMessageInput");
    const text = input.value.trim();
    if (!text) return;

    const chat = state.activeChats.find(c => c.id === state.activeChatContactId);
    if (!chat) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    chat.messages.push({
        sender: "you",
        text: text,
        time: timeStr
    });

    // Clear input & redraw
    input.value = "";
    renderChatMessages();

    // Trigger simulated match auto-reply logic
    simulateMatchReply(chat);
}

function handleChatKeyPress(event) {
    if (event.key === "Enter") {
        sendChatMessage();
    }
}

function simulateMatchReply(chat) {
    // Generate simple auto-replies matching profiles' fields
    setTimeout(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let replyText = "Hey! That sounds awesome. We should discuss more when we hang out.";
        
        if (chat.name === "Ananya") {
            replyText = "Haha, yes! I totally agree. Fort Kochi cafe hops are always a vibe. We should definitely go!";
        } else if (chat.name === "Rahul V.") {
            replyText = "Sweet! I play a lot of Valorant and casual RPGs. What games have you been playing lately?";
        } else if (chat.name === "Devika") {
            replyText = "OMG yes! Sketching buddies are so rare. What kind of tools do you use? Digital or traditional?";
        } else {
            replyText = `That's cool! Hey, I'm actually cooking right now, but let's grab coffee this weekend?`;
        }

        chat.messages.push({
            sender: "them",
            text: replyText,
            time: timeStr
        });

        // Re-render if they are still on the same chat window
        if (state.activeChatContactId === chat.id) {
            renderChatMessages();
            // Trigger a soft notification sound or alert if active screen is different
        }
    }, 1500);
}

function viewChatUserProfile() {
    // Open the detail page of the user currently inside the chat
    const chat = state.activeChats.find(c => c.id === state.activeChatContactId);
    if (!chat) return;

    // Search the master suggestions list for details loading
    const profile = mockProfiles.find(p => p.name === chat.name);
    if (profile) {
        openProfileDetail(profile.id);
    } else {
        showToast("Profile details not found.", "info");
    }
}

/* ==========================================================================
   SCREEN 10: SETTINGS HANDLERS
   ========================================================================== */
function handleThemeToggle(checkbox) {
    const theme = checkbox.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    
    // Sync other checkboxes
    document.getElementById("themeToggle").checked = checkbox.checked;
    
    showToast(`Switched to ${theme} mode`, "success");
}

function toggleBlockedList() {
    const list = document.getElementById("blockedUsersList");
    list.classList.toggle("collapsed");
}

function unblockUser(btn) {
    const blockedUserRow = btn.closest(".blocked-user");
    const name = blockedUserRow.querySelector("span").textContent;
    blockedUserRow.remove();
    showToast(`Unblocked ${name}`, "success");
}

function submitFeedback() {
    const text = document.getElementById("feedbackText").value.trim();
    if (!text) {
        showToast("Please enter feedback before submitting.", "danger");
        return;
    }
    
    showToast("Feedback sent! Thank you.", "success");
    document.getElementById("feedbackText").value = "";
}

function handleLogout() {
    // Reset state & navigate to Landing page
    state.currentUser = null;
    state.sentRequests = [];
    state.selectedInterests = [];
    
    // Reset Setup selectors
    const selectors = document.querySelectorAll(".tag-selector");
    selectors.forEach(s => s.classList.remove("selected"));

    showToast("Logged out successfully.", "success");
    navigateTo("screen-landing");
}

/* ==========================================================================
   NOTIFICATIONS PANEL
   ========================================================================== */
function toggleNotifications() {
    const overlay = document.getElementById("notificationOverlay");
    overlay.classList.toggle("active");
}

// Close notifications dropdown clicking outside
document.addEventListener("click", (e) => {
    const overlay = document.getElementById("notificationOverlay");
    const trigger = document.querySelector(".notification-trigger");
    if (overlay && overlay.classList.contains("active") && !overlay.contains(e.target) && !trigger.contains(e.target)) {
        overlay.classList.remove("active");
    }
});

function clearNotifications() {
    const body = document.getElementById("notificationBody");
    body.innerHTML = `
        <div class="empty-state" style="padding: 20px 10px;">
            <h3>No Notifications</h3>
        </div>
    `;
    const dots = document.querySelectorAll(".badge-dot");
    dots.forEach(dot => dot.classList.add("hide"));
    showToast("Notifications cleared", "info");
}
