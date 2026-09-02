/* ================= SYSTEM VARIABLES ================= */

let engineRunning = false;

let systemChecking = false;

let engineStartTime = 0;

/* ================= START / SHUTDOWN ================= */

function toggleEngine() {
  const btn = document.getElementById("engineBtn");

  const wrapper = document.getElementById("system-wrapper");

  const vocesScreen = document.getElementById("startup-screen");

  if (!engineRunning) {
    engineRunning = true;

    systemChecking = true;

    engineStartTime = Date.now();

    btn.innerText = "SYSTEM SHUTDOWN";

    btn.classList.add("running");

    /* SHOW VOCES STARTUP */

    vocesScreen.classList.add("show");

    setTimeout(() => {
      vocesScreen.classList.remove("show");

      wrapper.classList.add("online");

      /* STARTUP ICON CHECK */

      const allIcons = document.querySelectorAll(".symbol");

      allIcons.forEach((el) => {
        el.setAttribute(
          "class",

          "symbol yellow",
        );
      });

      setTimeout(() => {
        systemChecking = false;
      }, 1000);
    }, 3000);
  } else {
    engineRunning = false;

    btn.innerText = "SYSTEM START";

    btn.classList.remove("running");

    wrapper.classList.remove("online");

    /* RESET MODE */

    document.getElementById("mode-text").innerText = "STANDBY";

    document.getElementById("mode-text").style.color = "#555";

    /* RESET ICONS */

    document

      .querySelectorAll(".symbol")

      .forEach((el) => {
        el.setAttribute(
          "class",

          "symbol off",
        );
      });

    /* RESET HAZARD */

    document

      .getElementById("hazard-ray")

      .classList.remove("active");

    /* RESET BATTERY */

    document.getElementById("bat-liquid").style.height = "0%";

    document.getElementById("bat-text").innerText = "0";

    /* RESET VALUES */

    document.getElementById("sol_v").innerText = "0.0";

    document.getElementById("sol_w").innerText = "0";

    document.getElementById("wl_v").innerText = "0.0";

    document.getElementById("wl_w").innerText = "0";

    document.getElementById("dist-val").innerText = "0";
  }
}

/* ================= DEMO DATA ================= */

function updateDashboardDemo() {
  if (!engineRunning) return;

  const elapsed = (Date.now() - engineStartTime) / 1000;

  /*
        SIMULATED VALUES

        This replaces ESP32 fetch('/data').

        Values change smoothly so the dashboard
        works as a standalone GitHub website.
      */

  const solVolt = 5.8 + Math.sin(elapsed / 5) * 0.5;

  const solWatts = Math.max(
    0,

    28 + Math.sin(elapsed / 4) * 6,
  );

  const wlVolt = 7.2 + Math.sin(elapsed / 3) * 0.8;

  const wlWatts = Math.max(
    0,

    42 + Math.cos(elapsed / 4) * 8,
  );

  const batPercent = Math.min(
    100,

    Math.max(
      35,

      Math.round(76 + Math.sin(elapsed / 12) * 3),
    ),
  );

  const dist = Math.round(8 + Math.sin(elapsed / 2) * 5);

  /* UPDATE SOLAR */

  document.getElementById("sol_v").innerText = solVolt.toFixed(1);

  document.getElementById("sol_w").innerText = solWatts.toFixed(0);

  /* UPDATE WIRELESS */

  document.getElementById("wl_v").innerText = wlVolt.toFixed(1);

  document.getElementById("wl_w").innerText = wlWatts.toFixed(0);

  /* UPDATE RADAR */

  document.getElementById("dist-val").innerText = Math.max(1, dist);

  /* UPDATE BATTERY */

  document.getElementById("bat-liquid").style.height = batPercent + "%";

  document.getElementById("bat-text").innerText = batPercent;

  /* UPDATE MODE */

  const modeSpan = document.getElementById("mode-text");

  if (solVolt >= 3.0 || wlVolt >= 3.0) {
    modeSpan.innerText = "CHARGING";

    modeSpan.style.color = "#00f0ff";
  } else {
    modeSpan.innerText = "BATTERY";

    modeSpan.style.color = "#d4af37";
  }

  /* ================= ICON STATUS ================= */

  if (!systemChecking) {
    document

      .getElementById("icon-amt")

      .setAttribute(
        "class",

        "symbol green",
      );

    document

      .getElementById("icon-abs")

      .setAttribute(
        "class",

        "symbol red",
      );

    /* SOLAR STATUS */

    document

      .getElementById("icon-sol")

      .setAttribute(
        "class",

        solVolt >= 3.0 ? "symbol green" : "symbol red",
      );

    /* WIRELESS STATUS */

    document

      .getElementById("icon-wl")

      .setAttribute(
        "class",

        wlVolt >= 1.0 ? "symbol green" : "symbol red",
      );

    /* COLLISION RADAR */

    const ray = document.getElementById("hazard-ray");

    if (dist < 3 && dist > 0) {
      document

        .getElementById("icon-col")

        .setAttribute(
          "class",

          "symbol blink-red",
        );

      ray.classList.add("active");
    } else {
      document

        .getElementById("icon-col")

        .setAttribute(
          "class",

          "symbol off",
        );

      ray.classList.remove("active");
    }

    /* TEMPERATURE SYSTEM */

    if (Date.now() - engineStartTime > 300000) {
      document

        .getElementById("icon-temp")

        .setAttribute(
          "class",

          "symbol blink-red",
        );
    } else {
      document

        .getElementById("icon-temp")

        .setAttribute(
          "class",

          "symbol off",
        );
    }
  }
}

/* ================= LIVE UPDATE ================= */

setInterval(
  updateDashboardDemo,

  500,
);
