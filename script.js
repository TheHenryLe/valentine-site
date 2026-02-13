/* ---------------- RETRO LOADING SCREEN ---------------- */

const loadingScreen = document.getElementById("loadingScreen");
const loadingBarBoot = document.getElementById("loadingBarBoot");

window.addEventListener("load", () => {
  // Start filling the bar
  requestAnimationFrame(() => {
    loadingBarBoot.style.width = "100%";
  });

  // Extended loading screen duration: 2.9 seconds
  setTimeout(() => {
    loadingScreen.classList.add("hidden");

    popup.classList.remove("hidden");
    popup.style.position = "static";
    popup.style.left = "auto";
    popup.style.top = "auto";
  }, 2900);
});

/* ---------------- ASCII BOUQUET ANIMATION ---------------- */

const bouquetFrames = [
  `        .-.-.
       (_\\|/_)
       ( /|\\ )
        '-'-'
        /|\\
       / | \\
         |
         |
      A bouquet for you`,

  `        .-.-.
       (_\\|/_)
       ( /|\\ )
        '-'-'
       \\ | /
        \\|/
         |
         |
      A bouquet for you`,

  `        .-.-.
       (_\\|/_)
       ( /|\\ )
        '-'-'
        \\ | /
         \\|/
         /\\
         ||
      A bouquet for you`,
];

const bouquetEl = document.getElementById("bouquet");
let bouquetIndex = 0;

function animateBouquet() {
  bouquetEl.textContent = bouquetFrames[bouquetIndex];
  bouquetIndex = (bouquetIndex + 1) % bouquetFrames.length;
}

setInterval(animateBouquet, 600);

/* ---------------- POPUP / UI ELEMENTS ---------------- */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("popup");
const yippee = document.getElementById("yippeeScreen");
const resetBtn = document.getElementById("resetBtn");
const bubble = document.getElementById("speechBubble");
const loadingBar = document.getElementById("loadingBar");
const blueScreen = document.getElementById("blueScreen");
const terminalEl = document.getElementById("terminal");

const messages = [
  "You gotta be faster than that, buddy.",
  "Nice try, slowpoke.",
  "Too slow. Again.",
  "Not even close.",
  "Is that all you got?",
  "Try harder, champ.",
  "You'll never catch me!",
  "Pathetic attempt, honestly.",
  "My grandma clicks faster.",
  "Blink and you missed it.",
  "C’mon, at least pretend you're trying.",
  "You call that effort?",
  "I’ve seen snails with better reaction time.",
  "You sure your mouse is plugged in?",
  "This is getting embarrassing for you.",
  "I could do this all day.",
  "You're making this too easy.",
  "Maybe take a warm‑up lap first?",
  "Oof. Rough look, pal.",
];

/* ---------------- YES BUTTON ---------------- */

yesBtn.addEventListener("click", () => {
  // Show fake blue screen
  blueScreen.classList.remove("hidden");

  // Heart explosion
  triggerHeartExplosion();

  // Extended blue screen duration: 1.7 seconds
  setTimeout(() => {
    blueScreen.classList.add("hidden");
    popup.classList.add("hidden");
    bubble.classList.add("hidden");
    yippee.classList.remove("hidden");
    loadingBar.style.width = "100%";
  }, 1700);
});

/* ---------------- NO BUTTON (TELEPORT + BUBBLE WIGGLE) ---------------- */

noBtn.addEventListener("mouseover", () => {
  const popupWidth = popup.offsetWidth;
  const popupHeight = popup.offsetHeight;

  const x = Math.random() * (window.innerWidth - popupWidth);
  const y = Math.random() * (window.innerHeight - popupHeight);

  popup.style.position = "absolute";
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;

  popup.classList.remove("shake");
  void popup.offsetWidth;
  popup.classList.add("shake");

  const msg = messages[Math.floor(Math.random() * messages.length)];
  bubble.textContent = msg;

  bubble.style.left = `${x + popupWidth / 2 - 80}px`;
  bubble.style.top = `${y - 70}px`;

  bubble.classList.remove("hidden");
  bubble.classList.add("show");

  bubble.classList.remove("bubble-wiggle");
  void bubble.offsetWidth;
  bubble.classList.add("bubble-wiggle");
});

/* ---------------- RESET BUTTON ---------------- */

resetBtn.addEventListener("click", () => {
  yippee.classList.add("hidden");
  popup.classList.remove("hidden");

  popup.style.position = "static";
  popup.style.left = "auto";
  popup.style.top = "auto";

  bubble.classList.add("hidden");
  bubble.classList.remove("show");
  loadingBar.style.width = "0%";
});

/* ---------------- HEART PARTICLE SYSTEM ---------------- */

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
let explosionHearts = [];

function spawnHeart() {
  hearts.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: 6 + Math.random() * 6,
    speed: 1 + Math.random() * 2,
    alpha: 0.7 + Math.random() * 0.3,
  });
}

function triggerHeartExplosion() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 60; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    explosionHearts.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 5,
      alpha: 1,
    });
  }
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background hearts
  ctx.fillStyle = "#ff3366";
  hearts.forEach((h, i) => {
    ctx.globalAlpha = h.alpha;
    ctx.fillRect(h.x, h.y, h.size, h.size);
    h.y -= h.speed;
    if (h.y < -20) hearts.splice(i, 1);
  });

  // Explosion hearts
  explosionHearts.forEach((h, i) => {
    ctx.globalAlpha = h.alpha;
    ctx.fillRect(h.x, h.y, h.size, h.size);
    h.x += h.vx;
    h.y += h.vy;
    h.alpha -= 0.03;
    if (h.alpha <= 0) explosionHearts.splice(i, 1);
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawHearts);
}

setInterval(spawnHeart, 220);
drawHearts();

/* ---------------- DOS-STYLE TERMINAL TYPING ---------------- */

const terminalLines = [
  "> booting feelings.sys...",
  "> loading heart.dll...",
  "> compiling crush.c...",
  "> warning: variable 'chill' is unused",
  "> linking love.exe...",
  "> runtime error: butterflies_overflow",
  "> suggestion: press YES to continue",
];

let currentLineIndex = 0;
let currentCharIndex = 0;

function typeTerminal() {
  const line = terminalLines[currentLineIndex];
  if (currentCharIndex <= line.length) {
    terminalEl.textContent = line.slice(0, currentCharIndex);
    currentCharIndex++;
    setTimeout(typeTerminal, 40);
  } else {
    setTimeout(() => {
      currentLineIndex = (currentLineIndex + 1) % terminalLines.length;
      currentCharIndex = 0;
      typeTerminal();
    }, 1200);
  }
}

typeTerminal();

/* ---------------- HANDLE RESIZE ---------------- */

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
