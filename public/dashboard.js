const DASHBOARD_KEY = 'dashboardCards';
const COLORS = ['#EF4444','#F97316','#EAB308','#84CC16','#22C55E','#14B8A6','#3B82F6','#8B5CF6','#EC4899','#F43F5E'];

function getCards(){
  try { return JSON.parse(localStorage.getItem(DASHBOARD_KEY)) || []; }
  catch { return []; }
}

function saveCards(cards){
  localStorage.setItem(DASHBOARD_KEY, JSON.stringify(cards.slice(0,20)));
}

async function fetchEvents(){
  const res = await fetch('/api/events');
  return await res.json();
}

function groupData(events, groupBy){
  const counts = {};
  events.forEach(e => {
    const key = e[groupBy];
    counts[key] = (counts[key] || 0) + 1;
  });
  return { labels: Object.keys(counts), data: Object.values(counts) };
}

window.dashboardUtils = { getCards, saveCards, fetchEvents, groupData, COLORS };
