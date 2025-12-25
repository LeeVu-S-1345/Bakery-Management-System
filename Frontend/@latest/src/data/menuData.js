const API_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { mockMenuData, useMockData } from "./mockData.js";

// --- CACHE ---
let MENU_CACHE = null; // store fetched menu

// Fetch from backend and store into cache
export async function fetchMenu() {
  // Use mock data if enabled
  if (useMockData()) {
    console.log("Using mock menu data");
    MENU_CACHE = mockMenuData;
    return MENU_CACHE;
  }

  try {
    const res = await axios.get(`${API_URL}/menu`, {
      withCredentials: true,
    });
    MENU_CACHE = res.data; // save menu received (array/grouped)
    return MENU_CACHE;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    // Fallback to mock data if API fails
    console.log("Falling back to mock menu data");
    MENU_CACHE = mockMenuData;
    return MENU_CACHE;
  }
}

// Return cached menu, or fetch if not fetched yet
export async function getMenu() {
  if (MENU_CACHE) return MENU_CACHE;
  return await fetchMenu();
}