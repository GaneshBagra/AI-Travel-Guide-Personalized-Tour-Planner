import axios from "axios";

const WEATHERAPI_BASE = "https://api.weatherapi.com/v1";
const KEY = process.env.WEATHERAPI_KEY;

const normalizeToYMD = (d) => {
  if (!d) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  const parsed = new Date(d);
  if (isNaN(parsed.getTime())) return null;
  const yyyy = parsed.getUTCFullYear();
  const mm = String(parsed.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export async function getForecastForDate(location, dateIso) {
  if (!KEY) throw new Error("WEATHERAPI_KEY not set in env");
  const { data } = await axios.get(`${WEATHERAPI_BASE}/forecast.json`, {
    params: { key: KEY, q: location, days: 10, aqi: "no", alerts: "no" },
    timeout: 10000,
  });

  const targetDate = normalizeToYMD(dateIso);
  const forecastDays = data.forecast?.forecastday || [];
  console.debug("WeatherAPI: requested=", dateIso, "normalized=", targetDate, "available=", forecastDays.map(f => f.date));

  let day = forecastDays.find((d) => d.date === targetDate);
  if (!day && targetDate) {
    const target = new Date(targetDate + "T00:00:00Z");
    day = forecastDays.find((d) => {
      const fd = new Date(d.date + "T00:00:00Z");
      return fd.getTime() === target.getTime();
    });
  }
  if (!day) return null;

  const midday = day.hour.find(h => h.time.endsWith("12:00")) || day.hour[Math.floor(day.hour.length / 2)];

  return {
    date: day.date,
    day: {
      maxtemp_c: day.day.maxtemp_c,
      mintemp_c: day.day.mintemp_c,
      avgtemp_c: day.day.avgtemp_c,
      condition: day.day.condition?.text,
      icon: day.day.condition?.icon ? `https:${day.day.condition.icon}` : null,
    },
    hourly: midday ? {
      time: midday.time,
      temp_c: midday.temp_c,
      condition: midday.condition?.text,
      icon: midday.condition?.icon ? `https:${midday.condition.icon}` : null
    } : null,
    raw: day
  };
}

// parse various activity time labels to an integer hour (0-23)
function parseActivityTimeToHour(timeStr) {
  if (!timeStr) return 12;
  const s = String(timeStr).trim().toLowerCase();

  // explicit HH:MM
  const hm = s.match(/(\d{1,2}):(\d{2})/);
  if (hm) {
    let hh = parseInt(hm[1], 10);
    const mm = parseInt(hm[2], 10);
    if (hh === 12 && /pm|am/.test(s) === false && mm < 12) {
      // leave as 12 (noon)
    }
    return hh % 24;
  }

  // formats like "9 AM", "9am", "9 pm"
  const ap = s.match(/(\d{1,2})\s*(am|pm)/);
  if (ap) {
    let hh = parseInt(ap[1], 10);
    const ampm = ap[2];
    if (ampm === "pm" && hh !== 12) hh += 12;
    if (ampm === "am" && hh === 12) hh = 0;
    return hh % 24;
  }

  if (s.includes("morning")) return 9;
  if (s.includes("noon") || s.includes("midday")) return 12;
  if (s.includes("afternoon")) return 15;
  if (s.includes("late afternoon")) return 16;
  if (s.includes("evening")) return 18;
  if (s.includes("night")) return 21;
  if (s.includes("midnight")) return 0;

  // fallback to noon
  return 12;
}

export async function getWeatherForDateTime(location, dateIso, timeLabel) {
  if (!KEY) throw new Error("WEATHERAPI_KEY not set in env");
  // reuse forecast endpoint
  const { data } = await axios.get(`${WEATHERAPI_BASE}/forecast.json`, {
    params: { key: KEY, q: location, days: 10, aqi: "no", alerts: "no" },
    timeout: 10000,
  });

  const targetDate = normalizeToYMD(dateIso);
  const forecastDays = data.forecast?.forecastday || [];
  let day = forecastDays.find(d => d.date === targetDate);
  if (!day) return null;

  const desiredHour = parseActivityTimeToHour(timeLabel);

  // pick the hour entry closest to desiredHour
  let best = null;
  let bestDiff = Infinity;
  for (const h of (day.hour || [])) {
    const hourPart = (h.time || "").split(" ")[1]?.split(":")[0];
    if (!hourPart) continue;
    const hh = parseInt(hourPart, 10);
    const diff = Math.abs(hh - desiredHour);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = h;
    }
  }

  if (!best) return null;

  return {
    date: day.date,
    time: best.time,
    temp_c: best.temp_c,
    condition: best.condition?.text,
    icon: best.condition?.icon ? `https:${best.condition.icon}` : null,
    raw: best
  };
}

const UNSPLASH_KEY = process.env.UNSPLASH_API_KEY;

export async function getImageFromUnsplash(query) {
  if (!UNSPLASH_KEY || !query) return null;
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: 1, orientation: "landscape" },
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
      timeout: 8000,
    });
    const result = res.data?.results?.[0];
    return result?.urls?.regular || result?.urls?.small || result?.urls?.thumb || null;
  } catch (err) {
    console.error("Unsplash error for", query, err?.message || err);
    return null;
  }
}