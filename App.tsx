import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ddmdaprdnoyhvrccfmcf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_XDzpAx9Cot5W6d0pjeLOpg_DnTgQKst";

const ADMIN_NAMES = ["Abhi"];
const ADMIN_PASSWORD = "Abhi@IPL2026";

const PARTICIPANTS = [
  "Abhi",
  "Nabeel",
  "Niyas",
  "Zabu",
  "Shafi",
  "Saleel",
  "Sam",
];

const TOTAL_MATCHES = 70;

const DEFAULT_MATCHES = [
  {
    id: "M1",
    order_no: 1,
    date: "2026-03-28",
    day: "Sat",
    time: "7:30 PM",
    team_a: "Royal Challengers Bengaluru",
    team_b: "Sunrisers Hyderabad",
    venue: "Bengaluru",
  },
  {
    id: "M2",
    order_no: 2,
    date: "2026-03-29",
    day: "Sun",
    time: "7:30 PM",
    team_a: "Mumbai Indians",
    team_b: "Kolkata Knight Riders",
    venue: "Mumbai",
  },
  {
    id: "M3",
    order_no: 3,
    date: "2026-03-30",
    day: "Mon",
    time: "7:30 PM",
    team_a: "Rajasthan Royals",
    team_b: "Chennai Super Kings",
    venue: "Guwahati",
  },
  {
    id: "M4",
    order_no: 4,
    date: "2026-03-31",
    day: "Tue",
    time: "7:30 PM",
    team_a: "Punjab Kings",
    team_b: "Gujarat Titans",
    venue: "New Chandigarh",
  },
  {
    id: "M5",
    order_no: 5,
    date: "2026-04-01",
    day: "Wed",
    time: "7:30 PM",
    team_a: "Lucknow Super Giants",
    team_b: "Delhi Capitals",
    venue: "Lucknow",
  },
  {
    id: "M6",
    order_no: 6,
    date: "2026-04-02",
    day: "Thu",
    time: "7:30 PM",
    team_a: "Kolkata Knight Riders",
    team_b: "Sunrisers Hyderabad",
    venue: "Kolkata",
  },
  {
    id: "M7",
    order_no: 7,
    date: "2026-04-03",
    day: "Fri",
    time: "7:30 PM",
    team_a: "Chennai Super Kings",
    team_b: "Punjab Kings",
    venue: "Chennai",
  },
  {
    id: "M8",
    order_no: 8,
    date: "2026-04-04",
    day: "Sat",
    time: "3:30 PM",
    team_a: "Delhi Capitals",
    team_b: "Mumbai Indians",
    venue: "Delhi",
  },
  {
    id: "M9",
    order_no: 9,
    date: "2026-04-04",
    day: "Sat",
    time: "7:30 PM",
    team_a: "Gujarat Titans",
    team_b: "Rajasthan Royals",
    venue: "Ahmedabad",
  },
  {
    id: "M10",
    order_no: 10,
    date: "2026-04-05",
    day: "Sun",
    time: "3:30 PM",
    team_a: "Sunrisers Hyderabad",
    team_b: "Lucknow Super Giants",
    venue: "Hyderabad",
  },
  {
    id: "M11",
    order_no: 11,
    date: "2026-04-05",
    day: "Sun",
    time: "7:30 PM",
    team_a: "Royal Challengers Bengaluru",
    team_b: "Chennai Super Kings",
    venue: "Bengaluru",
  },
  {
    id: "M12",
    order_no: 12,
    date: "2026-04-06",
    day: "Mon",
    time: "7:30 PM",
    team_a: "Kolkata Knight Riders",
    team_b: "Punjab Kings",
    venue: "Kolkata",
  },
  {
    id: "M13",
    order_no: 13,
    date: "2026-04-07",
    day: "Tue",
    time: "7:30 PM",
    team_a: "Rajasthan Royals",
    team_b: "Mumbai Indians",
    venue: "Guwahati",
  },
  {
    id: "M14",
    order_no: 14,
    date: "2026-04-08",
    day: "Wed",
    time: "7:30 PM",
    team_a: "Delhi Capitals",
    team_b: "Gujarat Titans",
    venue: "Delhi",
  },
  {
    id: "M15",
    order_no: 15,
    date: "2026-04-09",
    day: "Thu",
    time: "7:30 PM",
    team_a: "Kolkata Knight Riders",
    team_b: "Lucknow Super Giants",
    venue: "Kolkata",
  },
  {
    id: "M16",
    order_no: 16,
    date: "2026-04-10",
    day: "Fri",
    time: "7:30 PM",
    team_a: "Rajasthan Royals",
    team_b: "Royal Challengers Bengaluru",
    venue: "Guwahati",
  },
  {
    id: "M17",
    order_no: 17,
    date: "2026-04-11",
    day: "Sat",
    time: "3:30 PM",
    team_a: "Punjab Kings",
    team_b: "Sunrisers Hyderabad",
    venue: "New Chandigarh",
  },
  {
    id: "M18",
    order_no: 18,
    date: "2026-04-11",
    day: "Sat",
    time: "7:30 PM",
    team_a: "Chennai Super Kings",
    team_b: "Delhi Capitals",
    venue: "Chennai",
  },
  {
    id: "M19",
    order_no: 19,
    date: "2026-04-12",
    day: "Sun",
    time: "3:30 PM",
    team_a: "Lucknow Super Giants",
    team_b: "Gujarat Titans",
    venue: "Lucknow",
  },
  {
    id: "M20",
    order_no: 20,
    date: "2026-04-12",
    day: "Sun",
    time: "7:30 PM",
    team_a: "Mumbai Indians",
    team_b: "Royal Challengers Bengaluru",
    venue: "Mumbai",
  },
  {
    id: "M21",
    order_no: 21,
    date: "2026-04-13",
    day: "Mon",
    time: "7:30 PM",
    team_a: "Sunrisers Hyderabad",
    team_b: "Rajasthan Royals",
    venue: "Hyderabad",
  },
  {
    id: "M22",
    order_no: 22,
    date: "2026-04-14",
    day: "Tue",
    time: "7:30 PM",
    team_a: "Chennai Super Kings",
    team_b: "Kolkata Knight Riders",
    venue: "Chennai",
  },
  {
    id: "M23",
    order_no: 23,
    date: "2026-04-15",
    day: "Wed",
    time: "7:30 PM",
    team_a: "Royal Challengers Bengaluru",
    team_b: "Lucknow Super Giants",
    venue: "Bengaluru",
  },
  {
    id: "M24",
    order_no: 24,
    date: "2026-04-16",
    day: "Thu",
    time: "7:30 PM",
    team_a: "Mumbai Indians",
    team_b: "Punjab Kings",
    venue: "Mumbai",
  },
  {
    id: "M25",
    order_no: 25,
    date: "2026-04-17",
    day: "Fri",
    time: "7:30 PM",
    team_a: "Gujarat Titans",
    team_b: "Kolkata Knight Riders",
    venue: "Ahmedabad",
  },
  {
    id: "M26",
    order_no: 26,
    date: "2026-04-18",
    day: "Sat",
    time: "3:30 PM",
    team_a: "Royal Challengers Bengaluru",
    team_b: "Delhi Capitals",
    venue: "Bengaluru",
  },
  {
    id: "M27",
    order_no: 27,
    date: "2026-04-18",
    day: "Sat",
    time: "7:30 PM",
    team_a: "Sunrisers Hyderabad",
    team_b: "Chennai Super Kings",
    venue: "Hyderabad",
  },
  {
    id: "M28",
    order_no: 28,
    date: "2026-04-19",
    day: "Sun",
    time: "3:30 PM",
    team_a: "Kolkata Knight Riders",
    team_b: "Rajasthan Royals",
    venue: "Kolkata",
  },
  {
    id: "M29",
    order_no: 29,
    date: "2026-04-19",
    day: "Sun",
    time: "7:30 PM",
    team_a: "Punjab Kings",
    team_b: "Lucknow Super Giants",
    venue: "New Chandigarh",
  },
  {
    id: "M30",
    order_no: 30,
    date: "2026-04-20",
    day: "Mon",
    time: "7:30 PM",
    team_a: "Gujarat Titans",
    team_b: "Mumbai Indians",
    venue: "Ahmedabad",
  },
  {
    id: "M31",
    order_no: 31,
    date: "2026-04-21",
    day: "Tue",
    time: "7:30 PM",
    team_a: "Sunrisers Hyderabad",
    team_b: "Delhi Capitals",
    venue: "Hyderabad",
  },
  {
    id: "M32",
    order_no: 32,
    date: "2026-04-22",
    day: "Wed",
    time: "7:30 PM",
    team_a: "Lucknow Super Giants",
    team_b: "Rajasthan Royals",
    venue: "Lucknow",
  },
  {
    id: "M33",
    order_no: 33,
    date: "2026-04-23",
    day: "Thu",
    time: "7:30 PM",
    team_a: "Mumbai Indians",
    team_b: "Chennai Super Kings",
    venue: "Mumbai",
  },
  {
    id: "M34",
    order_no: 34,
    date: "2026-04-24",
    day: "Fri",
    time: "7:30 PM",
    team_a: "Royal Challengers Bengaluru",
    team_b: "Gujarat Titans",
    venue: "Bengaluru",
  },
  {
    id: "M35",
    order_no: 35,
    date: "2026-04-25",
    day: "Sat",
    time: "3:30 PM",
    team_a: "Delhi Capitals",
    team_b: "Punjab Kings",
    venue: "Delhi",
  },
  {
    id: "M36",
    order_no: 36,
    date: "2026-04-25",
    day: "Sat",
    time: "7:30 PM",
    team_a: "Rajasthan Royals",
    team_b: "Sunrisers Hyderabad",
    venue: "Jaipur",
  },
  {
    id: "M37",
    order_no: 37,
    date: "2026-04-26",
    day: "Sun",
    time: "3:30 PM",
    team_a: "Gujarat Titans",
    team_b: "Chennai Super Kings",
    venue: "Ahmedabad",
  },
  {
    id: "M38",
    order_no: 38,
    date: "2026-04-26",
    day: "Sun",
    time: "7:30 PM",
    team_a: "Lucknow Super Giants",
    team_b: "Kolkata Knight Riders",
    venue: "Lucknow",
  },
  {
    id: "M39",
    order_no: 39,
    date: "2026-04-27",
    day: "Mon",
    time: "7:30 PM",
    team_a: "Delhi Capitals",
    team_b: "Royal Challengers Bengaluru",
    venue: "Delhi",
  },
  {
    id: "M40",
    order_no: 40,
    date: "2026-04-28",
    day: "Tue",
    time: "7:30 PM",
    team_a: "Punjab Kings",
    team_b: "Rajasthan Royals",
    venue: "New Chandigarh",
  },
  {
    id: "M41",
    order_no: 41,
    date: "2026-04-29",
    day: "Wed",
    time: "7:30 PM",
    team_a: "Mumbai Indians",
    team_b: "Sunrisers Hyderabad",
    venue: "Mumbai",
  },
  {
    id: "M42",
    order_no: 42,
    date: "2026-04-30",
    day: "Thu",
    time: "7:30 PM",
    team_a: "Gujarat Titans",
    team_b: "Royal Challengers Bengaluru",
    venue: "Ahmedabad",
  },
  {
    id: "M43",
    order_no: 43,
    date: "2026-05-01",
    day: "Fri",
    time: "7:30 PM",
    team_a: "Rajasthan Royals",
    team_b: "Delhi Capitals",
    venue: "Jaipur",
  },
  {
    id: "M44",
    order_no: 44,
    date: "2026-05-02",
    day: "Sat",
    time: "7:30 PM",
    team_a: "Chennai Super Kings",
    team_b: "Mumbai Indians",
    venue: "Chennai",
  },
  {
    id: "M45",
    order_no: 45,
    date: "2026-05-03",
    day: "Sun",
    time: "3:30 PM",
    team_a: "Sunrisers Hyderabad",
    team_b: "Kolkata Knight Riders",
    venue: "Hyderabad",
  },
  {
    id: "M46",
    order_no: 46,
    date: "2026-05-03",
    day: "Sun",
    time: "7:30 PM",
    team_a: "Gujarat Titans",
    team_b: "Punjab Kings",
    venue: "Ahmedabad",
  },
  {
    id: "M47",
    order_no: 47,
    date: "2026-05-04",
    day: "Mon",
    time: "7:30 PM",
    team_a: "Mumbai Indians",
    team_b: "Lucknow Super Giants",
    venue: "Mumbai",
  },
  {
    id: "M48",
    order_no: 48,
    date: "2026-05-05",
    day: "Tue",
    time: "7:30 PM",
    team_a: "Delhi Capitals",
    team_b: "Chennai Super Kings",
    venue: "Delhi",
  },
  {
    id: "M49",
    order_no: 49,
    date: "2026-05-06",
    day: "Wed",
    time: "7:30 PM",
    team_a: "Sunrisers Hyderabad",
    team_b: "Punjab Kings",
    venue: "Hyderabad",
  },
  {
    id: "M50",
    order_no: 50,
    date: "2026-05-07",
    day: "Thu",
    time: "7:30 PM",
    team_a: "Lucknow Super Giants",
    team_b: "Royal Challengers Bengaluru",
    venue: "Lucknow",
  },
  {
    id: "M51",
    order_no: 51,
    date: "2026-05-08",
    day: "Fri",
    time: "7:30 PM",
    team_a: "Delhi Capitals",
    team_b: "Kolkata Knight Riders",
    venue: "Delhi",
  },
  {
    id: "M52",
    order_no: 52,
    date: "2026-05-09",
    day: "Sat",
    time: "7:30 PM",
    team_a: "Rajasthan Royals",
    team_b: "Gujarat Titans",
    venue: "Jaipur",
  },
  {
    id: "M53",
    order_no: 53,
    date: "2026-05-10",
    day: "Sun",
    time: "3:30 PM",
    team_a: "Chennai Super Kings",
    team_b: "Lucknow Super Giants",
    venue: "Chennai",
  },
  {
    id: "M54",
    order_no: 54,
    date: "2026-05-10",
    day: "Sun",
    time: "7:30 PM",
    team_a: "Royal Challengers Bengaluru",
    team_b: "Mumbai Indians",
    venue: "Raipur",
  },
  {
    id: "M55",
    order_no: 55,
    date: "2026-05-11",
    day: "Mon",
    time: "7:30 PM",
    team_a: "Punjab Kings",
    team_b: "Delhi Capitals",
    venue: "Dharamshala",
  },
  {
    id: "M56",
    order_no: 56,
    date: "2026-05-12",
    day: "Tue",
    time: "7:30 PM",
    team_a: "Gujarat Titans",
    team_b: "Sunrisers Hyderabad",
    venue: "Ahmedabad",
  },
  {
    id: "M57",
    order_no: 57,
    date: "2026-05-13",
    day: "Wed",
    time: "7:30 PM",
    team_a: "Royal Challengers Bengaluru",
    team_b: "Kolkata Knight Riders",
    venue: "Raipur",
  },
  {
    id: "M58",
    order_no: 58,
    date: "2026-05-14",
    day: "Thu",
    time: "7:30 PM",
    team_a: "Punjab Kings",
    team_b: "Mumbai Indians",
    venue: "Dharamshala",
  },
  {
    id: "M59",
    order_no: 59,
    date: "2026-05-15",
    day: "Fri",
    time: "7:30 PM",
    team_a: "Lucknow Super Giants",
    team_b: "Chennai Super Kings",
    venue: "Lucknow",
  },
  {
    id: "M60",
    order_no: 60,
    date: "2026-05-16",
    day: "Sat",
    time: "7:30 PM",
    team_a: "Kolkata Knight Riders",
    team_b: "Gujarat Titans",
    venue: "Kolkata",
  },
  {
    id: "M61",
    order_no: 61,
    date: "2026-05-17",
    day: "Sun",
    time: "3:30 PM",
    team_a: "Punjab Kings",
    team_b: "Royal Challengers Bengaluru",
    venue: "Dharamshala",
  },
  {
    id: "M62",
    order_no: 62,
    date: "2026-05-17",
    day: "Sun",
    time: "7:30 PM",
    team_a: "Delhi Capitals",
    team_b: "Rajasthan Royals",
    venue: "Delhi",
  },
  {
    id: "M63",
    order_no: 63,
    date: "2026-05-18",
    day: "Mon",
    time: "7:30 PM",
    team_a: "Chennai Super Kings",
    team_b: "Sunrisers Hyderabad",
    venue: "Chennai",
  },
  {
    id: "M64",
    order_no: 64,
    date: "2026-05-19",
    day: "Tue",
    time: "7:30 PM",
    team_a: "Rajasthan Royals",
    team_b: "Lucknow Super Giants",
    venue: "Jaipur",
  },
  {
    id: "M65",
    order_no: 65,
    date: "2026-05-20",
    day: "Wed",
    time: "7:30 PM",
    team_a: "Kolkata Knight Riders",
    team_b: "Mumbai Indians",
    venue: "Kolkata",
  },
  {
    id: "M66",
    order_no: 66,
    date: "2026-05-21",
    day: "Thu",
    time: "7:30 PM",
    team_a: "Chennai Super Kings",
    team_b: "Gujarat Titans",
    venue: "Chennai",
  },
  {
    id: "M67",
    order_no: 67,
    date: "2026-05-22",
    day: "Fri",
    time: "7:30 PM",
    team_a: "Sunrisers Hyderabad",
    team_b: "Royal Challengers Bengaluru",
    venue: "Hyderabad",
  },
  {
    id: "M68",
    order_no: 68,
    date: "2026-05-23",
    day: "Sat",
    time: "7:30 PM",
    team_a: "Lucknow Super Giants",
    team_b: "Punjab Kings",
    venue: "Lucknow",
  },
  {
    id: "M69",
    order_no: 69,
    date: "2026-05-24",
    day: "Sun",
    time: "3:30 PM",
    team_a: "Mumbai Indians",
    team_b: "Rajasthan Royals",
    venue: "Mumbai",
  },
  {
    id: "M70",
    order_no: 70,
    date: "2026-05-24",
    day: "Sun",
    time: "7:30 PM",
    team_a: "Kolkata Knight Riders",
    team_b: "Delhi Capitals",
    venue: "Kolkata",
  },
];

function parseISTMatchDateTime(dateStr: string, timeStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);

  const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!timeMatch) return null;

  let hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2]);
  const ampm = timeMatch[3].toUpperCase();

  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  const utcMillis = Date.UTC(year, month - 1, day, hours - 5, minutes - 30);
  return new Date(utcMillis);
}
function isTiedOnPoints(leaderboard: { points: number }[], index: number) {
  const current = leaderboard[index];
  const prev = index > 0 ? leaderboard[index - 1] : null;
  const next = index < leaderboard.length - 1 ? leaderboard[index + 1] : null;

  return (
    (prev && prev.points === current.points) ||
    (next && next.points === current.points)
  );
}

function getLockTime(match: any) {
  const matchStart = parseISTMatchDateTime(match.date, match.time);
  if (!matchStart) return null;
  return new Date(matchStart.getTime() - 30 * 60 * 1000);
}

function getDisplayRank<T>(
  items: T[],
  index: number,
  getScore: (item: T) => number
) {
  if (index === 0) return 1;

  const currentScore = getScore(items[index]);
  const previousScore = getScore(items[index - 1]);

  if (currentScore === previousScore) {
    return getDisplayRank(items, index - 1, getScore);
  }

  return index + 1;
}

function isVotingLocked(match: any) {
  const lockTime = getLockTime(match);
  if (!lockTime) return false;
  return Date.now() >= lockTime.getTime();
}

function formatCountdown(ms: number) {
  if (ms <= 0) return "00h 00m 00s";

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
    2,
    "0"
  )}m ${String(seconds).padStart(2, "0")}s`;
}

const supabase =
  SUPABASE_URL.startsWith("http") && !SUPABASE_ANON_KEY.startsWith("PASTE_")
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export default function IPL2026MultiUserApp() {
  const [selectedName, setSelectedName] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [sessionName, setSessionName] = useState(
    localStorage.getItem("ipl2026_user") || ""
  );
  const [matches, setMatches] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("predict");
  const [selectedPlayer, setSelectedPlayer] = useState(PARTICIPANTS[0]);
  const [nowTs, setNowTs] = useState(Date.now());
  const activeScheduleRowRef = useRef<HTMLTableRowElement | null>(null);

  const isConfigured = !!supabase;
  const isAdmin = ADMIN_NAMES.includes(sessionName);

  useEffect(() => {
    const timer = setInterval(() => {
      setNowTs(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isConfigured || !supabase) {
      setLoading(false);
      return;
    }

    loadAll();

    const channels = [
      supabase
        .channel("matches-live")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "matches" },
          () => loadAll()
        )
        .subscribe(),
      supabase
        .channel("predictions-live")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "predictions" },
          () => loadAll()
        )
        .subscribe(),
      supabase
        .channel("results-live")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "results" },
          () => loadAll()
        )
        .subscribe(),
    ];

    return () => {
      channels.forEach((ch) => {
        if (supabase) supabase.removeChannel(ch);
      });
    };
  }, [isConfigured]);

  async function loadAll() {
    if (!supabase) return;

    setLoading(true);

    const [
      { data: m, error: matchesError },
      { data: p, error: predictionsError },
      { data: r, error: resultsError },
    ] = await Promise.all([
      supabase
        .from("matches")
        .select("*")
        .order("order_no", { ascending: true }),
      supabase.from("predictions").select("*"),
      supabase.from("results").select("*"),
    ]);

    if (matchesError) {
      setMessage(matchesError.message);
    } else if (predictionsError) {
      setMessage(predictionsError.message);
    } else if (resultsError) {
      setMessage(resultsError.message);
    }

    setMatches((m || []).sort((a, b) => a.order_no - b.order_no));
    setPredictions(p || []);
    setResults(r || []);
    setLoading(false);
  }

  const resolvedIds = useMemo(
    () => new Set(results.map((r) => r.match_id)),
    [results]
  );

  const openMatches = useMemo(
    () => matches.filter((m) => !resolvedIds.has(m.id)),
    [matches, resolvedIds]
  );

  const activeDate = useMemo(() => {
    if (openMatches.length === 0) return null;
    return openMatches[0].date;
  }, [openMatches]);

  const activeMatches = useMemo(() => {
    if (!activeDate) return [];
    return openMatches
      .filter((m) => m.date === activeDate)
      .sort((a, b) => a.order_no - b.order_no);
  }, [openMatches, activeDate]);

  useEffect(() => {
    if (activeTab === "schedule" && activeScheduleRowRef.current) {
      setTimeout(() => {
        activeScheduleRowRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 120);
    }
  }, [activeTab, activeMatches, matches, results]);

  const leaderboard = useMemo(() => {
    return PARTICIPANTS.map((name) => {
      let played = 0;
      let correct = 0;
      let wrongOrMissed = 0;
      let points = 0;

      results.forEach((result) => {
        played += 1;
        const pred = predictions.find(
          (p) => p.match_id === result.match_id && p.user_name === name
        );
        if (result.actual_winner === "No Result") {
          // no points change for anyone
        } else if (pred?.predicted_winner === result.actual_winner) {
          correct += 1;
          points += 10;
        } else {
          wrongOrMissed += 1;
          points -= 10;
        }
      });

      return { name, played, correct, wrongOrMissed, points };
    }).sort(
      (a, b) =>
        b.points - a.points ||
        b.correct - a.correct ||
        a.name.localeCompare(b.name)
    );
  }, [predictions, results]);
  const latestResultEntry = useMemo(() => {
    if (results.length === 0) return null;

    return [...results].sort((a, b) => {
      const aTime = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const bTime = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return bTime - aTime;
    })[0];
  }, [results]);

  const latestResultMatch = useMemo(() => {
    if (!latestResultEntry) return null;
    return matches.find((m) => m.id === latestResultEntry.match_id) || null;
  }, [latestResultEntry, matches]);
  const currentPredictionsCompleteCount = useMemo(() => {
    if (activeMatches.length === 0) return 0;

    return PARTICIPANTS.filter((name) =>
      activeMatches.every((match) =>
        predictions.some((p) => p.match_id === match.id && p.user_name === name)
      )
    ).length;
  }, [activeMatches, predictions]);

  const currentChaathan = useMemo(() => {
    if (leaderboard.length === 0) return "-";
    const minPoints = Math.min(...leaderboard.map((p) => p.points));
    return leaderboard
      .filter((p) => p.points === minPoints)
      .map((p) => p.name)
      .join(", ");
  }, [leaderboard]);

  function getPredictionForUser(matchId: string, userName: string) {
    return (
      predictions.find(
        (p) => p.match_id === matchId && p.user_name === userName
      ) || null
    );
  }

  function getVoteBreakdown(match: any) {
    const matchPredictions = predictions.filter((p) => p.match_id === match.id);

    return {
      [match.team_a]: matchPredictions
        .filter((p) => p.predicted_winner === match.team_a)
        .map((p) => p.user_name),
      [match.team_b]: matchPredictions
        .filter((p) => p.predicted_winner === match.team_b)
        .map((p) => p.user_name),
    };
  }

  function getCoverageForMatch(matchId: string) {
    return predictions.filter((p) => p.match_id === matchId).length;
  }
  function getRecentFormForPlayer(
    playerName: string,
    matches: any[],
    results: any[],
    predictions: any[],
    limit = 5
  ) {
    const completedMatches = matches
      .filter((m) => results.some((r) => r.match_id === m.id))
      .sort((a, b) => a.order_no - b.order_no);

    const recentCompleted = completedMatches.slice(-limit);

    return recentCompleted.map((match) => {
      const result = results.find((r) => r.match_id === match.id);
      const prediction = predictions.find(
        (p) => p.match_id === match.id && p.user_name === playerName
      );

      if (!result) return "-";
      if (result.actual_winner === "No Result") return "N";
      if (!prediction) return "M";
      return prediction.predicted_winner === result.actual_winner ? "W" : "L";
    });
  }
  function getPlayerMatchOutcome(
    playerName: string,
    matchId: string,
    results: any[],
    predictions: any[]
  ) {
    const result = results.find((r) => r.match_id === matchId);
    const prediction = predictions.find(
      (p) => p.match_id === matchId && p.user_name === playerName
    );

    if (!result) return "-";
    if (result.actual_winner === "No Result") return "N";
    if (!prediction) return "M";
    return prediction.predicted_winner === result.actual_winner ? "W" : "L";
  }

  function getCurrentWinStreak(
    playerName: string,
    matches: any[],
    results: any[],
    predictions: any[]
  ) {
    const completedMatches = matches
      .filter((m) => results.some((r) => r.match_id === m.id))
      .sort((a, b) => a.order_no - b.order_no);

    let streak = 0;

    for (let i = completedMatches.length - 1; i >= 0; i--) {
      const outcome = getPlayerMatchOutcome(
        playerName,
        completedMatches[i].id,
        results,
        predictions
      );

      if (outcome === "W") {
        streak += 1;
      } else {
        break;
      }
    }

    return streak;
  }

  function getFavoriteAndHatedTeam(
    playerName: string,
    matches: any[],
    predictions: any[]
  ) {
    const favoriteCounts: Record<string, number> = {};
    const hatedCounts: Record<string, number> = {};

    predictions
      .filter((p) => p.user_name === playerName)
      .forEach((p) => {
        const match = matches.find((m) => m.id === p.match_id);
        if (!match) return;

        favoriteCounts[p.predicted_winner] =
          (favoriteCounts[p.predicted_winner] || 0) + 1;

        const oppositeTeam =
          match.team_a === p.predicted_winner ? match.team_b : match.team_a;

        hatedCounts[oppositeTeam] = (hatedCounts[oppositeTeam] || 0) + 1;
      });

    const favorite =
      Object.entries(favoriteCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

    const hated =
      Object.entries(hatedCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

    return { favorite, hated };
  }

  function getBuddyEnemy(playerName: string, predictions: any[]) {
    let bestBuddy = "-";
    let bestBuddyCount = -1;
    let bestEnemy = "-";
    let bestEnemyCount = -1;

    PARTICIPANTS.filter((name) => name !== playerName).forEach(
      (otherPlayer) => {
        let same = 0;
        let different = 0;

        const playerPreds = predictions.filter(
          (p) => p.user_name === playerName
        );

        playerPreds.forEach((pp) => {
          const otherPred = predictions.find(
            (op) => op.user_name === otherPlayer && op.match_id === pp.match_id
          );

          if (!otherPred) return;

          if (otherPred.predicted_winner === pp.predicted_winner) {
            same += 1;
          } else {
            different += 1;
          }
        });

        if (same > bestBuddyCount) {
          bestBuddy = otherPlayer;
          bestBuddyCount = same;
        }

        if (different > bestEnemyCount) {
          bestEnemy = otherPlayer;
          bestEnemyCount = different;
        }
      }
    );

    return {
      buddy: bestBuddy,
      buddyCount: Math.max(bestBuddyCount, 0),
      enemy: bestEnemy,
      enemyCount: Math.max(bestEnemyCount, 0),
    };
  }

  function getChaathanCounts(
    matches: any[],
    results: any[],
    predictions: any[]
  ) {
    const counts: Record<string, number> = {};
    const points: Record<string, number> = {};

    PARTICIPANTS.forEach((p) => {
      counts[p] = 0;
      points[p] = 0;
    });

    const completedMatches = matches
      .filter((m) => results.some((r) => r.match_id === m.id))
      .sort((a, b) => a.order_no - b.order_no);

    completedMatches.forEach((match) => {
      const result = results.find((r) => r.match_id === match.id);
      if (!result) return;

      PARTICIPANTS.forEach((player) => {
        const pred = predictions.find(
          (p) => p.match_id === match.id && p.user_name === player
        );

        if (result.actual_winner === "No Result") {
          return;
        } else if (pred?.predicted_winner === result.actual_winner) {
          points[player] += 10;
        } else {
          points[player] -= 10;
        }
      });

      const minPoints = Math.min(...Object.values(points));

      PARTICIPANTS.forEach((player) => {
        if (points[player] === minPoints) {
          counts[player] += 1;
        }
      });
    });

    return counts;
  }
  function getRankProgressionForPlayer(
    playerName: string,
    matches: any[],
    results: any[],
    predictions: any[]
  ) {
    const progression: { matchNo: number; rank: number }[] = [];
    const runningPoints: Record<string, number> = {};

    PARTICIPANTS.forEach((p) => {
      runningPoints[p] = 0;
    });

    const completedMatches = matches
      .filter((m) => results.some((r) => r.match_id === m.id))
      .sort((a, b) => a.order_no - b.order_no);

    completedMatches.forEach((match) => {
      const result = results.find((r) => r.match_id === match.id);
      if (!result) return;

      PARTICIPANTS.forEach((player) => {
        const pred = predictions.find(
          (p) => p.match_id === match.id && p.user_name === player
        );

        if (result.actual_winner === "No Result") {
          return;
        } else if (pred?.predicted_winner === result.actual_winner) {
          runningPoints[player] += 10;
        } else {
          runningPoints[player] -= 10;
        }
      });

      const ranking = PARTICIPANTS.map((name) => ({
        name,
        points: runningPoints[name],
      })).sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

      const rank = ranking.findIndex((r) => r.name === playerName) + 1;

      progression.push({
        matchNo: match.order_no,
        rank,
      });
    });

    return progression;
  }
  function getBoldnessScores(
    matches: any[],
    results: any[],
    predictions: any[]
  ) {
    const scores: Record<string, number> = {};
    PARTICIPANTS.forEach((p) => {
      scores[p] = 0;
    });

    const completedMatches = matches
      .filter((m) => results.some((r) => r.match_id === m.id))
      .sort((a, b) => a.order_no - b.order_no);

    completedMatches.forEach((match) => {
      const result = results.find((r) => r.match_id === match.id);
      if (!result || result.actual_winner === "No Result") return;

      const matchPreds = predictions.filter((p) => p.match_id === match.id);

      const countA = matchPreds.filter(
        (p) => p.predicted_winner === match.team_a
      ).length;
      const countB = matchPreds.filter(
        (p) => p.predicted_winner === match.team_b
      ).length;

      if (countA === countB) return;

      const minorityTeam = countA < countB ? match.team_a : match.team_b;

      matchPreds.forEach((p) => {
        if (
          p.predicted_winner === minorityTeam &&
          result.actual_winner === minorityTeam
        ) {
          scores[p.user_name] += 1;
        }
      });
    });

    return scores;
  }
  async function seedMatches() {
    if (!supabase) return;

    const { error } = await supabase
      .from("matches")
      .upsert(DEFAULT_MATCHES, { onConflict: "id" });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Full IPL 2026 schedule loaded into Supabase.");
    await loadAll();
  }

  async function savePrediction(matchId: string, team: string) {
    if (!sessionName || !supabase) return;

    const match = matches.find((m) => m.id === matchId);
    if (!match) return;

    if (isVotingLocked(match)) {
      setMessage("Voting is locked for this match.");
      return;
    }

    const payload = {
      match_id: matchId,
      user_name: sessionName,
      predicted_winner: team,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("predictions")
      .upsert(payload, { onConflict: "match_id,user_name" });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Prediction saved.");
    await loadAll();
  }

  async function saveResult(matchId: string, team: string) {
    if (!isAdmin || !supabase) return;

    const payload = {
      match_id: matchId,
      actual_winner: team,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("results")
      .upsert(payload, { onConflict: "match_id" });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Result saved. Points table updated live.");
    await loadAll();
  }

  async function editExistingResult(matchId: string, team: string) {
    if (!isAdmin || !supabase) return;

    const payload = {
      match_id: matchId,
      actual_winner: team,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("results")
      .upsert(payload, { onConflict: "match_id" });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Saved result corrected. Points table recalculated.");
    await loadAll();
  }
  async function undoLastResultEntry() {
    if (!isAdmin || !supabase || !latestResultEntry || !latestResultMatch)
      return;

    const ok = window.confirm(
      `Undo the last result entry for Match ${latestResultMatch.order_no}: ${latestResultMatch.team_a} vs ${latestResultMatch.team_b}? This will reopen the match for predictions.`
    );
    if (!ok) return;

    const { error } = await supabase
      .from("results")
      .delete()
      .eq("match_id", latestResultEntry.match_id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      `Last result entry removed. Match ${latestResultMatch.order_no} is active for prediction again.`
    );
    await loadAll();
  }
  async function resetTournament() {
    if (!isAdmin || !supabase) return;

    const ok = window.confirm(
      "This will delete all predictions and all entered results, but keep the schedule. Tournament will restart from Match 1. Continue?"
    );
    if (!ok) return;

    setLoading(true);

    const { error: predictionsError } = await supabase
      .from("predictions")
      .delete()
      .neq("match_id", "__none__");

    if (predictionsError) {
      setMessage(`Predictions reset failed: ${predictionsError.message}`);
      setLoading(false);
      return;
    }

    const { error: resultsError } = await supabase
      .from("results")
      .delete()
      .neq("match_id", "__none__");

    if (resultsError) {
      setMessage(`Results reset failed: ${resultsError.message}`);
      setLoading(false);
      return;
    }

    await loadAll();
    setMessage("Tournament reset. Back to Match 1.");
    setLoading(false);
  }

  function signInName() {
    if (!selectedName) return;

    if (selectedName === "Abhi" && adminPasswordInput !== ADMIN_PASSWORD) {
      setMessage("Wrong admin password for Abhi.");
      return;
    }

    setSessionName(selectedName);
    localStorage.setItem("ipl2026_user", selectedName);
    setMessage("");
  }

  function signOut() {
    localStorage.removeItem("ipl2026_user");
    setSessionName("");
    setSelectedName("");
    setAdminPasswordInput("");
    setMessage("");
  }

  if (!isConfigured) {
    return (
      <AppShell>
        <h1 style={styles.title}>IPL 2026 Multi-user App</h1>
        <p style={styles.note}>
          Paste your Supabase project URL and anon key at the top of the file
          first.
        </p>
        <SetupGuide />
      </AppShell>
    );
  }

  if (!sessionName) {
    return (
      <AppShell>
        <div style={styles.logoContainer}>
          <img src="/logo.png" style={styles.logoImage} />
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Login by name</h2>
          <p style={styles.note}>
            Each participant chooses their own name. Abhi is admin and needs the
            admin password.
          </p>

          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            style={styles.select}
          >
            <option value="">Select your name</option>
            {PARTICIPANTS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {selectedName === "Abhi" && (
            <div style={{ marginTop: 12 }}>
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                placeholder="Enter Abhi admin password"
                style={styles.select}
              />
            </div>
          )}

          {message && (
            <div style={{ ...styles.messageBox, marginTop: 12 }}>{message}</div>
          )}

          <div style={{ marginTop: 12 }}>
            <button style={styles.primaryButton} onClick={signInName}>
              Enter app
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div style={styles.logoContainer}>
        <img src="/logo.png" style={styles.logoImage} />
      </div>

      <p style={styles.welcomeText}>
        Welcome <strong>{sessionName}</strong>
        {isAdmin ? " (Admin)" : ""}
      </p>

      <div style={styles.toolbar}>
        <div style={styles.tabGroup}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "predict" ? styles.tabButtonActive : {}),
            }}
            onClick={() => setActiveTab("predict")}
          >
            Prediction
          </button>

          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "table" ? styles.tabButtonActive : {}),
            }}
            onClick={() => setActiveTab("table")}
          >
            Points Table
          </button>

          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "player" ? styles.tabButtonActive : {}),
            }}
            onClick={() => setActiveTab("player")}
          >
            Player Status
          </button>

          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "schedule" ? styles.tabButtonActive : {}),
            }}
            onClick={() => setActiveTab("schedule")}
          >
            Schedule
          </button>

          {isAdmin && (
            <button
              style={{
                ...styles.tabButton,
                ...(activeTab === "admin" ? styles.tabButtonActive : {}),
              }}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
          )}

          <button
            style={{
              ...styles.tabButton,
              ...styles.signOutTab,
            }}
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      </div>

      <div style={styles.statsStrip}>
        <div style={{ ...styles.statMiniCard, ...styles.statCardBlue }}>
          <div style={{ ...styles.statAccent, ...styles.accentBlue }} />
          <div style={styles.statMiniLabel}>Matches Completed</div>
          <div style={styles.statMiniValue}>
            {results.length}{" "}
            <span style={styles.statMiniMuted}>/ {TOTAL_MATCHES}</span>
          </div>
        </div>

        <div style={{ ...styles.statMiniCard, ...styles.statCardGreen }}>
          <div style={{ ...styles.statAccent, ...styles.accentGreen }} />
          <div style={styles.statMiniLabel}>Already Predicted</div>
          <div style={styles.statMiniValue}>
            {currentPredictionsCompleteCount}{" "}
            <span style={styles.statMiniMuted}>/ {PARTICIPANTS.length}</span>
          </div>
        </div>

        <div style={{ ...styles.statMiniCard, ...styles.statCardPurple }}>
          <div style={{ ...styles.statAccent, ...styles.accentPurple }} />
          <div style={styles.statMiniLabel}>Current 😈</div>
          <div style={styles.statMiniValueText}>{currentChaathan}</div>
        </div>
      </div>

      {message && <div style={styles.messageBox}>{message}</div>}
      {loading && <div style={styles.messageBox}>Loading live data...</div>}

      {!loading && activeTab === "predict" && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitleCentered}>
            {activeMatches.length > 1
              ? "Current matches (double header)"
              : "Current match"}
          </h2>

          {activeMatches.length === 0 ? (
            <p style={styles.note}>Tournament complete.</p>
          ) : (
            <div style={styles.currentMatchesStack}>
              {activeMatches.map((match) => {
                const currentUserPrediction = getPredictionForUser(
                  match.id,
                  sessionName
                );
                const voteBreakdown = getVoteBreakdown(match);
                const lockTime = getLockTime(match);
                const locked = isVotingLocked(match);
                const timeLeft = lockTime ? lockTime.getTime() - nowTs : 0;
                return (
                  <div key={match.id} style={styles.matchSectionCard}>
                    <div style={styles.matchBox}>
                      <div style={styles.matchBadgeRow}>
                        <span style={styles.matchBadge}>
                          Match {match.order_no}
                        </span>

                        {!locked && (
                          <span
                            style={{
                              ...styles.statusBadgeBase,
                              ...styles.badgeLive,
                            }}
                          >
                            LIVE
                          </span>
                        )}

                        {activeMatches.length > 1 && (
                          <span
                            style={{
                              ...styles.statusBadgeBase,
                              ...styles.badgeDoubleHeader,
                            }}
                          >
                            DOUBLE HEADER
                          </span>
                        )}
                      </div>

                      <div style={styles.matchTeams}>
                        {match.team_a} vs {match.team_b}
                      </div>
                      <div style={styles.note}>
                        {match.day}, {match.date} · {match.time} · {match.venue}
                      </div>
                    </div>

                    <div style={styles.countdownWrap}>
                      {locked ? (
                        <div
                          style={{
                            ...styles.statusBadgeBase,
                            ...styles.badgeLocked,
                          }}
                        >
                          LOCKED
                        </div>
                      ) : (
                        <div style={styles.countdownLive}>
                          <div style={styles.countdownLabel}>
                            Vote closes in
                          </div>
                          <div style={styles.countdownValue}>
                            {formatCountdown(timeLeft)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={styles.buttonRow}>
                      <button
                        style={{
                          ...styles.primaryButton,
                          ...(locked ? styles.disabledButton : {}),
                        }}
                        onClick={() => savePrediction(match.id, match.team_a)}
                        disabled={locked}
                      >
                        {match.team_a}
                      </button>
                      <button
                        style={{
                          ...styles.secondaryButton,
                          ...(locked ? styles.disabledButton : {}),
                        }}
                        onClick={() => savePrediction(match.id, match.team_b)}
                        disabled={locked}
                      >
                        {match.team_b}
                      </button>
                    </div>

                    <p style={{ ...styles.note, textAlign: "center" }}>
                      Your saved prediction:{" "}
                      <strong>
                        {currentUserPrediction?.predicted_winner ||
                          "Not submitted yet"}
                      </strong>
                    </p>

                    <div style={{ marginTop: 16 }}>
                      <h3 style={styles.subSectionTitleCentered}>
                        {locked ? "Vote Reveal" : "Vote Visibility"}
                      </h3>

                      {!locked ? (
                        <div style={styles.voteHiddenBox}>
                          <div style={styles.voteHiddenTitle}>
                            Predictions hidden
                          </div>
                          <div style={styles.voteHiddenText}>
                            Only your own saved prediction is visible while
                            voting is active.
                          </div>
                        </div>
                      ) : (
                        <div style={styles.voteRevealWrap}>
                          <div style={styles.voteRevealBanner}>
                            Predictions are now revealed
                          </div>

                          <div style={styles.voteGrid}>
                            <div
                              style={{
                                ...styles.voteCard,
                                ...styles.teamCardBlue,
                                ...styles.voteRevealCard,
                              }}
                            >
                              <div style={styles.voteTitle}>{match.team_a}</div>
                              <div style={styles.voteCount}>
                                {voteBreakdown[match.team_a]?.length || 0}{" "}
                                vote(s)
                              </div>
                              <div style={styles.voteNames}>
                                {(voteBreakdown[match.team_a] || []).length
                                  ? voteBreakdown[match.team_a].join(", ")
                                  : "No votes yet"}
                              </div>
                            </div>

                            <div
                              style={{
                                ...styles.voteCard,
                                ...styles.teamCardGreen,
                                ...styles.voteRevealCard,
                              }}
                            >
                              <div style={styles.voteTitle}>{match.team_b}</div>
                              <div style={styles.voteCount}>
                                {voteBreakdown[match.team_b]?.length || 0}{" "}
                                vote(s)
                              </div>
                              <div style={styles.voteNames}>
                                {(voteBreakdown[match.team_b] || []).length
                                  ? voteBreakdown[match.team_b].join(", ")
                                  : "No votes yet"}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {!loading && activeTab === "admin" && isAdmin && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Admin controls</h2>

          <div style={styles.buttonRow}>
            <button style={styles.primaryButton} onClick={seedMatches}>
              Load default schedule
            </button>

            {latestResultMatch && (
              <button
                style={styles.warningButton}
                onClick={undoLastResultEntry}
              >
                Undo last result entry
              </button>
            )}

            <button style={styles.dangerButton} onClick={resetTournament}>
              Reset tournament
            </button>
          </div>
          {latestResultMatch && (
            <div style={styles.undoInfoBox}>
              Last entered result:{" "}
              <strong>Match {latestResultMatch.order_no}</strong> —{" "}
              {latestResultMatch.team_a} vs {latestResultMatch.team_b}
            </div>
          )}

          {activeMatches.length > 0 ? (
            <div style={styles.currentMatchesStack}>
              {activeMatches.map((match) => (
                <div key={match.id} style={styles.matchSectionCard}>
                  <div style={styles.matchBox}>
                    <div style={styles.matchBadgeRow}>
                      <span style={styles.matchBadge}>
                        Match {match.order_no}
                      </span>
                      {activeMatches.length > 1 && (
                        <span style={styles.matchBadgeAlt}>Open Today</span>
                      )}
                    </div>

                    <div style={styles.matchTeams}>
                      {match.team_a} vs {match.team_b}
                    </div>
                    <div style={styles.note}>
                      {getCoverageForMatch(match.id)}/{PARTICIPANTS.length}{" "}
                      predictions received
                    </div>
                  </div>

                  <div style={styles.buttonRow}>
                    <button
                      style={styles.primaryButton}
                      onClick={() => saveResult(match.id, match.team_a)}
                    >
                      Mark {match.team_a} winner
                    </button>
                    <button
                      style={styles.secondaryButton}
                      onClick={() => saveResult(match.id, match.team_b)}
                    >
                      Mark {match.team_b} winner
                    </button>
                    <button
                      style={styles.neutralButton}
                      onClick={() => saveResult(match.id, "No Result")}
                    >
                      Mark No Result
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.note}>No pending match remains.</p>
          )}

          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 10 }}>
              Correct an already entered result
            </h3>

            {results.length === 0 ? (
              <p style={styles.note}>No saved result yet.</p>
            ) : (
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Match</th>
                      <th style={styles.th}>Fixture</th>
                      <th style={styles.th}>Current Result</th>
                      <th style={styles.th}>Change To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results
                      .slice()
                      .sort((a, b) => {
                        const ma =
                          matches.find((m) => m.id === a.match_id)?.order_no ||
                          0;
                        const mb =
                          matches.find((m) => m.id === b.match_id)?.order_no ||
                          0;
                        return ma - mb;
                      })
                      .map((r) => {
                        const match = matches.find((m) => m.id === r.match_id);
                        if (!match) return null;

                        return (
                          <tr key={r.match_id}>
                            <td style={styles.td}>{match.order_no}</td>
                            <td style={styles.td}>
                              {match.team_a} vs {match.team_b}
                            </td>
                            <td style={styles.td}>Won by {r.actual_winner}</td>
                            <td style={styles.td}>
                              <div style={styles.buttonRow}>
                                <button
                                  style={styles.primaryButton}
                                  onClick={() =>
                                    editExistingResult(match.id, match.team_a)
                                  }
                                >
                                  {match.team_a}
                                </button>
                                <button
                                  style={styles.secondaryButton}
                                  onClick={() =>
                                    editExistingResult(match.id, match.team_b)
                                  }
                                >
                                  {match.team_b}
                                </button>
                                <button
                                  style={styles.neutralButton}
                                  onClick={() =>
                                    editExistingResult(match.id, "No Result")
                                  }
                                >
                                  No Result
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {!loading && activeTab === "table" && (
        <div style={styles.card}>
          <div style={styles.scheduleHero}>
            <div style={styles.scheduleHeroTop}>CHAATHAN&apos;S TROPHY</div>
            <div style={styles.scheduleHeroTitle}>POINTS TABLE</div>
          </div>

          <div style={styles.scheduleTableWrap}>
            <table style={styles.pointsCleanTable}>
              <thead>
                <tr>
                  <th style={{ ...styles.scheduleTh, width: 70 }}>#</th>
                  <th style={styles.scheduleTh}>Name</th>
                  <th style={{ ...styles.scheduleTh, width: 70 }}>P</th>
                  <th style={{ ...styles.scheduleTh, width: 70 }}>W</th>
                  <th style={{ ...styles.scheduleTh, width: 90 }}>L/M</th>
                  <th style={{ ...styles.scheduleTh, width: 150 }}>Form</th>
                  <th style={{ ...styles.scheduleTh, width: 90 }}>PTS</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((row, index) => {
                  const rowColors = [
                    "#d32f2f",
                    "#ad1457",
                    "#2d2d2d",
                    "#283593",
                    "#5e3c99",
                    "#0277bd",
                    "#7cb342",
                  ];

                  const accentColor = rowColors[index % rowColors.length];
                  const form = getRecentFormForPlayer(
                    row.name,
                    matches,
                    results,
                    predictions,
                    5
                  );

                  return (
                    <tr
                      key={row.name}
                      style={
                        index % 2 === 0
                          ? styles.scheduleRowEven
                          : styles.scheduleRowOdd
                      }
                    >
                      <td style={styles.scheduleTdCenter}>
                        <div
                          style={{
                            ...styles.matchNoPill,
                            background: `${accentColor}20`,
                            color: accentColor,
                          }}
                        >
                          {getDisplayRank(
                            leaderboard,
                            index,
                            (item) => item.points
                          )}
                        </div>
                      </td>

                      <td style={styles.scheduleTd}>
                        <div style={styles.pointsNameCell}>
                          <span
                            style={{
                              ...styles.pointsAccentBar,
                              background: accentColor,
                            }}
                          />
                          <div style={styles.pointsNameStack}>
                            <span style={styles.pointsNameText}>
                              {row.name}
                            </span>
                            {isTiedOnPoints(leaderboard, index) && (
                              <span style={styles.tiedBadge}>Tied</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td style={styles.scheduleTdCenter}>{row.played}</td>
                      <td style={styles.scheduleTdCenter}>{row.correct}</td>
                      <td style={styles.scheduleTdCenter}>
                        {row.wrongOrMissed}
                      </td>

                      <td style={styles.scheduleTd}>
                        <div style={styles.formWrap}>
                          {form.map((f, i) => (
                            <span
                              key={`${row.name}-${i}`}
                              style={{
                                ...styles.formDot,
                                ...(f === "W"
                                  ? styles.formWin
                                  : f === "L"
                                  ? styles.formLoss
                                  : f === "N"
                                  ? styles.formNoResult
                                  : styles.formMissed),
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td style={styles.scheduleTdCenter}>
                        <div
                          style={{
                            ...styles.pointsPill,
                            color: row.points >= 0 ? "#b45309" : "#b91c1c",
                            background: row.points >= 0 ? "#fff7ed" : "#fef2f2",
                            borderColor:
                              row.points >= 0 ? "#fdba74" : "#fecaca",
                          }}
                        >
                          {row.points}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!loading && activeTab === "player" && (
        <div style={styles.card}>
          <div style={styles.playerStatusTopBar}>
            <label style={styles.playerStatusLabel}>Select player</label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              style={styles.playerStatusSelect}
            >
              {PARTICIPANTS.map((player) => (
                <option key={player} value={player}>
                  {player}
                </option>
              ))}
            </select>
          </div>

          {(() => {
            const playerForm = getRecentFormForPlayer(
              selectedPlayer,
              matches,
              results,
              predictions,
              5
            );
            const winStreak = getCurrentWinStreak(
              selectedPlayer,
              matches,
              results,
              predictions
            );
            const { favorite, hated } = getFavoriteAndHatedTeam(
              selectedPlayer,
              matches,
              predictions
            );
            const { buddy, buddyCount, enemy, enemyCount } = getBuddyEnemy(
              selectedPlayer,
              predictions
            );
            const chaathanCounts = getChaathanCounts(
              matches,
              results,
              predictions
            );
            const chaathanScore = chaathanCounts[selectedPlayer] || 0;

            const boldnessScores = getBoldnessScores(
              matches,
              results,
              predictions
            );
            const boldnessTable = PARTICIPANTS.map((name) => ({
              name,
              score: boldnessScores[name] || 0,
            })).sort(
              (a, b) => b.score - a.score || a.name.localeCompare(b.name)
            );

            const boldnessIndex = boldnessTable.findIndex(
              (x) => x.name === selectedPlayer
            );

            const boldnessRank =
              boldnessIndex >= 0
                ? getDisplayRank(
                    boldnessTable,
                    boldnessIndex,
                    (item) => item.score
                  )
                : "-";
            const boldnessScore = boldnessScores[selectedPlayer] || 0;

            const rankProgression = getRankProgressionForPlayer(
              selectedPlayer,
              matches,
              results,
              predictions
            );

            const chartWidth = 320;
            const chartHeight = 140;
            const chartPadding = 20;
            const maxRank = PARTICIPANTS.length;

            const rankPoints = rankProgression.map((point, index) => {
              const x =
                rankProgression.length <= 1
                  ? chartWidth / 2
                  : chartPadding +
                    (index * (chartWidth - chartPadding * 2)) /
                      (rankProgression.length - 1);

              const y =
                chartPadding +
                ((point.rank - 1) * (chartHeight - chartPadding * 2)) /
                  (maxRank - 1);

              return { ...point, x, y };
            });

            const rankPath = rankPoints
              .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
              .join(" ");
            return (
              <div style={styles.playerStatusGrid}>
                <div
                  style={{ ...styles.playerStatusCard, ...styles.statCardBlue }}
                >
                  <div style={{ ...styles.statAccent, ...styles.accentBlue }} />
                  <div style={styles.playerStatusCardTitle}>Recent Form</div>
                  <div style={styles.formWrap}>
                    {playerForm.map((f, i) => (
                      <span
                        key={`${selectedPlayer}-${i}`}
                        style={{
                          ...styles.formDot,
                          ...(f === "W"
                            ? styles.formWin
                            : f === "L"
                            ? styles.formLoss
                            : f === "N"
                            ? styles.formNoResult
                            : styles.formMissed),
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    ...styles.playerStatusCard,
                    ...styles.statCardGreen,
                  }}
                >
                  <div
                    style={{ ...styles.statAccent, ...styles.accentGreen }}
                  />
                  <div style={styles.playerStatusCardTitle}>Win Streak</div>
                  <div style={styles.streakWrap}>
                    {winStreak > 0 ? (
                      Array.from({ length: winStreak }).map((_, i) => (
                        <span key={i} style={styles.fireIcon}>
                          🔥
                        </span>
                      ))
                    ) : (
                      <span style={styles.playerStatusValueMuted}>0</span>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    ...styles.playerStatusCard,
                    ...styles.statCardPurple,
                  }}
                >
                  <div
                    style={{ ...styles.statAccent, ...styles.accentPurple }}
                  />
                  <div style={styles.playerStatusCardTitle}>Favorite Team</div>
                  <div style={styles.playerStatusValueText}>{favorite}</div>
                </div>

                <div
                  style={{ ...styles.playerStatusCard, ...styles.statCardBlue }}
                >
                  <div style={{ ...styles.statAccent, ...styles.accentBlue }} />
                  <div style={styles.playerStatusCardTitle}>
                    Most Hated Team
                  </div>
                  <div style={styles.playerStatusValueText}>{hated}</div>
                </div>

                <div
                  style={{
                    ...styles.playerStatusCard,
                    ...styles.statCardGreen,
                  }}
                >
                  <div
                    style={{ ...styles.statAccent, ...styles.accentGreen }}
                  />
                  <div style={styles.playerStatusCardTitle}>Buddy</div>
                  <div style={styles.playerStatusValueText}>
                    {buddy}{" "}
                    <span style={styles.playerStatusTiny}>
                      ({buddyCount} same picks)
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    ...styles.playerStatusCard,
                    ...styles.statCardPurple,
                  }}
                >
                  <div
                    style={{ ...styles.statAccent, ...styles.accentPurple }}
                  />
                  <div style={styles.playerStatusCardTitle}>Enemy</div>
                  <div style={styles.playerStatusValueText}>
                    {enemy}{" "}
                    <span style={styles.playerStatusTiny}>
                      ({enemyCount} opposite picks)
                    </span>
                  </div>
                </div>

                <div
                  style={{ ...styles.playerStatusCard, ...styles.statCardBlue }}
                >
                  <div style={{ ...styles.statAccent, ...styles.accentBlue }} />
                  <div style={styles.playerStatusCardTitle}>Chaathan Score</div>
                  <div style={styles.playerStatusValue}>{chaathanScore}</div>
                  <div style={styles.playerStatusTiny}>
                    No of days as chaathan
                  </div>
                </div>

                <div
                  style={{
                    ...styles.playerStatusCard,
                    ...styles.statCardGreen,
                  }}
                >
                  <div
                    style={{ ...styles.statAccent, ...styles.accentGreen }}
                  />
                  <div style={styles.playerStatusCardTitle}>Boldness Rank</div>
                  <div style={styles.playerStatusValue}>#{boldnessRank}</div>
                  <div style={styles.playerStatusTiny}>
                    {boldnessScore} bold win(s)
                  </div>
                </div>
                <div
                  style={{
                    ...styles.playerStatusCard,
                    ...styles.playerStatusGraphCard,
                    ...styles.statCardPurple,
                  }}
                >
                  <div
                    style={{ ...styles.statAccent, ...styles.accentPurple }}
                  />
                  <div style={styles.playerStatusCardTitle}>
                    Rank Progression
                  </div>

                  {rankProgression.length === 0 ? (
                    <div style={styles.playerStatusValueMuted}>
                      No completed matches yet
                    </div>
                  ) : (
                    <div style={styles.rankChartWrap}>
                      <svg
                        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                        style={styles.rankChartSvg}
                      >
                        {Array.from({ length: PARTICIPANTS.length }).map(
                          (_, i) => {
                            const rank = i + 1;
                            const y =
                              chartPadding +
                              ((rank - 1) * (chartHeight - chartPadding * 2)) /
                                (PARTICIPANTS.length - 1);

                            return (
                              <g key={rank}>
                                <line
                                  x1={chartPadding}
                                  y1={y}
                                  x2={chartWidth - chartPadding}
                                  y2={y}
                                  stroke="#dbe7f3"
                                  strokeWidth="1"
                                  strokeDasharray="4 4"
                                />
                                <text
                                  x={8}
                                  y={y + 4}
                                  fontSize="10"
                                  fill="#64748b"
                                  fontWeight="700"
                                >
                                  {rank}
                                </text>
                              </g>
                            );
                          }
                        )}

                        <path
                          d={rankPath}
                          fill="none"
                          stroke="#7c3aed"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {rankPoints.map((p) => (
                          <g key={`${p.matchNo}-${p.rank}`}>
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="4.5"
                              fill="#ffffff"
                              stroke="#7c3aed"
                              strokeWidth="2.5"
                            />
                          </g>
                        ))}
                      </svg>

                      <div style={styles.rankChartFooter}>
                        <span>Start</span>
                        <span>Completed matches: {rankProgression.length}</span>
                        <span>Latest</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
      {!loading && activeTab === "schedule" && (
        <div style={styles.card}>
          <div style={styles.scheduleHero}>
            <div style={styles.scheduleHeroTitle}>IPL SCHEDULE</div>
          </div>

          <div style={styles.scheduleTableWrap}>
            <table style={styles.scheduleTable}>
              <thead>
                <tr>
                  <th style={{ ...styles.scheduleTh, width: 10 }}>#</th>
                  <th style={{ ...styles.scheduleTh, width: 10 }}>Date</th>
                  <th style={{ ...styles.scheduleTh, width: 30 }}>Time</th>
                  <th style={{ ...styles.scheduleTh, width: 150 }}>Fixture</th>
                  <th style={{ ...styles.scheduleTh, width: 50 }}>Venue</th>
                  <th style={{ ...styles.scheduleTh, width: 100 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m, index) => {
                  const res = results.find((r) => r.match_id === m.id);
                  const isDone = !!res;
                  const isOpenToday = activeMatches.some(
                    (am) => am.id === m.id
                  );

                  return (
                    <tr
                      key={m.id}
                      ref={isOpenToday ? activeScheduleRowRef : null}
                      style={
                        isOpenToday
                          ? styles.scheduleRowActive
                          : index % 2 === 0
                          ? styles.scheduleRowEven
                          : styles.scheduleRowOdd
                      }
                    >
                      <td style={styles.scheduleTdCenter}>
                        <div style={styles.matchNoPill}>{m.order_no}</div>
                      </td>

                      <td style={styles.scheduleTd}>
                        <div style={styles.scheduleDateMain}>{m.day}</div>
                        <div style={styles.scheduleDateSub}>{m.date}</div>
                      </td>

                      <td style={styles.scheduleTd}>
                        <div style={styles.scheduleTime}>{m.time}</div>
                      </td>

                      <td style={styles.scheduleTd}>
                        <div style={styles.fixtureMain}>
                          {m.team_a} <span style={styles.fixtureVs}>vs</span>{" "}
                          {m.team_b}
                        </div>
                        {isOpenToday && (
                          <div style={styles.liveBadge}>Open now</div>
                        )}
                      </td>

                      <td style={styles.scheduleTd}>
                        <div style={styles.venueText}>{m.venue}</div>
                      </td>

                      <td style={styles.scheduleTd}>
                        {isDone ? (
                          res.actual_winner === "No Result" ? (
                            <div style={styles.statusPending}>No Result</div>
                          ) : (
                            <div style={styles.statusDone}>
                              Won by {res.actual_winner}
                            </div>
                          )
                        ) : isOpenToday ? (
                          <div style={styles.statusOpen}>
                            Awaiting predictions
                          </div>
                        ) : (
                          <div style={styles.statusPending}>Pending</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function SetupGuide() {
  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Supabase setup</h2>
      <ol style={styles.list}>
        <li>Create a Supabase project.</li>
        <li>
          In SQL Editor, run the SQL schema shown in my chat instructions.
        </li>
        <li>Copy Project URL and anon public key into this file.</li>
        <li>
          In CodeSandbox, add package <code>@supabase/supabase-js</code>.
        </li>
        <li>
          Reload. Login by name. Abhi can load schedule and enter results.
        </li>
      </ol>
    </div>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={styles.page}>
      <div style={styles.container}>{children}</div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  isText = false,
}: {
  label: string;
  value: string;
  isText?: boolean;
}) {
  return (
    <div style={styles.summaryCard}>
      <div style={styles.summaryLabel}>{label}</div>
      <div style={isText ? styles.summaryValueText : styles.summaryValue}>
        {value}
      </div>
    </div>
  );
}

function BasicTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} style={styles.th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} style={styles.td}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  headerRow: {
    display: "flex",
    justifyContent: "center", // ⭐ this is the key change
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // ⭐ add this
    gap: 12,
    background: "linear-gradient(135deg, #103b73 0%, #1f5aa6 100%)",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 14,
    boxShadow: "0 4px 12px rgba(16,59,115,0.18)",
  },
  logoBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.14)",
    fontSize: 22,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.1,
  },
  logoSubtitle: {
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
  },
  page: {
    background: "#f4f7fb",
    minHeight: "100vh",
    padding: 14,
    fontFamily: "Arial, sans-serif",
  },
  container: { maxWidth: 1040, margin: "0 auto" },
  title: {
    margin: "8px 0 0 0",
    fontSize: 18,
    color: "#14213d",
    textAlign: "center", // ⭐ this centers the text
  },
  note: { color: "#4b5563" },
  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    marginBottom: 20,
    border: "1px solid #dde7f2",
  },
  cardTitle: { marginTop: 0, color: "#14213d" },
  summaryRowCompact: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  summaryCard: {
    background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid #dbe7f3",
  },
  summaryLabel: { color: "#6b7280", fontSize: 14 },
  summaryValue: {
    fontSize: 28,
    fontWeight: 700,
    marginTop: 8,
    color: "#111827",
  },
  summaryValueText: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 8,
    color: "#111827",
    lineHeight: 1.25,
    wordBreak: "break-word",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 18,
  },
  tabGroup: {
    display: "flex",
    alignItems: "flex-end",
    gap: 2,
    background: "#e6edf5",
    padding: "6px 6px 0 6px",
    borderRadius: "12px 12px 0 0",
    borderBottom: "2px solid #cbd5e1",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tabButton: {
    border: "none",
    background: "#f1f5f9",
    color: "#475569",
    padding: "10px 16px",
    borderRadius: "10px 10px 0 0",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
  },
  tabButtonActive: {
    background: "#ffffff",
    color: "#1d4ed8",
    borderBottom: "2px solid #1d4ed8",
    boxShadow: "0 -2px 6px rgba(0,0,0,0.06)",
  },
  signOutTab: {
    color: "#b91c1c",
    background: "#fef2f2",
  },
  primaryButton: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },
  secondaryButton: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },
  dangerButton: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "center",
  },
  select: {
    width: "100%",
    maxWidth: 320,
    padding: 10,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    fontSize: 16,
  },
  matchBox: {
    background: "linear-gradient(180deg, #edf5ff 0%, #f7fbff 100%)",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #cfe0f5",
    textAlign: "center",
  },
  matchSectionCard: {
    border: "1px solid #dde7f2",
    borderRadius: 14,
    padding: 16,
    background: "#fbfdff",
  },
  currentMatchesStack: {
    display: "grid",
    gap: 18,
  },
  matchBadgeRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  matchBadge: {
    background: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: 700,
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
  },
  matchBadgeAlt: {
    background: "#dcfce7",
    color: "#15803d",
    fontWeight: 700,
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
  },
  matchTeams: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
    textAlign: "center",
  },
  tableWrap: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    marginTop: 8,
    overflow: "hidden",
    borderRadius: 12,
  },
  th: {
    textAlign: "left",
    background: "#eaf2fb",
    padding: 10,
    border: "1px solid #d5e1ee",
    color: "#17365d",
  },
  td: {
    padding: 10,
    border: "1px solid #e5edf5",
    background: "#fcfdff",
  },
  list: { paddingLeft: 18, color: "#374151" },
  messageBox: {
    background: "#fff7ed",
    border: "1px solid #fdba74",
    color: "#9a3412",
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  pointsNameStack: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    minWidth: 0,
  },

  tiedBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 8px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 800,
    background: "#fef3c7",
    color: "#92400e",
    border: "1px solid #fcd34d",
    lineHeight: 1.2,
  },
  voteGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  voteCard: {
    background: "linear-gradient(180deg, #f8fbff 0%, #fdfefe 100%)",
    border: "1px solid #dde6ef",
    borderRadius: 12,
    padding: 14,
    textAlign: "center",
  },
  voteTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 6,
    textAlign: "center",
  },
  voteCount: {
    fontWeight: 800,
    color: "#2563eb",
    marginBottom: 8,
    textAlign: "center",
    fontSize: 15,
  },
  voteNames: {
    color: "#374151",
    lineHeight: 1.5,
    textAlign: "center",
  },
  pointsHero: {
    background: "linear-gradient(135deg, #264e9b 0%, #375db0 100%)",
    borderRadius: 20,
    padding: "26px 22px",
    marginBottom: 18,
    boxShadow: "0 8px 20px rgba(29, 78, 216, 0.18)",
  },
  pointsHeroTop: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 8,
  },
  pointsHeroTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: 1,
    lineHeight: 1,
    textShadow: "0 2px 8px rgba(0,0,0,0.18)",
  },
  pointsHeaderRowGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 10fr 4fr 4fr 4fr", // MUST match row
    alignItems: "center",
    background: "#f5f7fb",
    border: "1px solid #d9e2ef",
    borderRadius: 10,
    padding: "14px 10px",
  },
  pointsHeaderCell: {
    fontWeight: 800,
    color: "#2d4f8f",
    fontSize: 14,
    textAlign: "center",
  },
  pointsRowsWrap: {
    display: "grid",
    gap: 10,
  },
  pointsRowOuter: {
    display: "flex",
    alignItems: "stretch",
    gap: 0,
  },
  pointsRowBar: {
    display: "grid",
    gridTemplateColumns: "1.5fr 3fr 2fr 1fr 2fr",
    alignItems: "center",
    minHeight: 58,
    color: "#ffffff",
    fontWeight: 700,
    clipPath: "polygon(2% 0%, 100% 0%, 90% 100%, 0% 100%)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.10)",
  },
  pointsBarCell: {
    textAlign: "center",
    fontSize: 16,
    padding: "0 10px",
  },
  pointsPlayerCell: {
    textAlign: "left",
    fontSize: 16,
    whiteSpace: "normal",
    overflow: "hidden",
    textOverflow: "clip",
    lineHeight: 1.1,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  pointsValueBox: {
    width: 50,
    minWidth: 50,
    background: "#ffffff",
    color: "#f59e0b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 15,
    clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    border: "1px solid #eceff4",
  },
  pointsTableScroll: {
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  },
  pointsTableInner: {
    minWidth: 680,
  },
  pointsHeaderOuter: {
    display: "flex",
    alignItems: "stretch",
    gap: 0,
    marginBottom: 12,
  },
  pointsHeaderPtsBox: {
    width: 50,
    minWidth: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 14,
    color: "#2d4f8f",
    background: "#f5f7fb",
    border: "1px solid #d9e2ef",
    borderLeft: "none",
    clipPath: "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)",
  },
  statsStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 12,
    marginTop: 18,
    marginBottom: 20,
  },

  statMiniCard: {
    borderRadius: 16,
    padding: "16px 18px",
    minWidth: 0,
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
  },

  statMiniLabel: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: 600,
    marginBottom: 8,
    lineHeight: 1.15,
    minHeight: 30,
    whiteSpace: "normal",
    overflow: "visible",
    textOverflow: "clip",
    wordBreak: "break-word",
    textAlign: "center",
  },

  statMiniValue: {
    fontSize: 24,
    fontWeight: 800,
    color: "#0f172a",
    lineHeight: 1,
    letterSpacing: "-0.5px",
    textAlign: "center",
  },

  statMiniMuted: {
    fontSize: 18,
    fontWeight: 700,
    color: "#64748b",
  },

  statMiniValueText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.2,
    whiteSpace: "normal",
    overflow: "visible",
    textOverflow: "clip",
    wordBreak: "break-word",
    textAlign: "center",
  },
  statCardBlue: {
    background: "linear-gradient(180deg, #eef4ff 0%, #f8fbff 100%)",
    border: "1px solid #d6e4ff",
    boxShadow: "0 6px 14px rgba(37, 99, 235, 0.12)",
  },

  statCardGreen: {
    background: "linear-gradient(180deg, #ecfdf5 0%, #f6fffa 100%)",
    border: "1px solid #bbf7d0",
    boxShadow: "0 6px 14px rgba(16, 185, 129, 0.12)",
  },

  statCardPurple: {
    background: "linear-gradient(180deg, #f5f3ff 0%, #fafaff 100%)",
    border: "1px solid #ddd6fe",
    boxShadow: "0 6px 14px rgba(124, 58, 237, 0.12)",
  },
  statAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  accentBlue: {
    background: "linear-gradient(90deg, #2563eb, #60a5fa)",
  },

  accentGreen: {
    background: "linear-gradient(90deg, #10b981, #34d399)",
  },

  accentPurple: {
    background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 12,
  },

  logoImage: {
    width: "clamp(180px, 40vw, 260px)",
    height: "auto",
  },
  scheduleHero: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
    borderRadius: 20,
    padding: "22px 20px",
    marginBottom: 18,
    boxShadow: "0 8px 18px rgba(37, 99, 235, 0.18)",
  },
  scheduleHeroTop: {
    color: "#dbeafe",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 1,
    marginBottom: 6,
  },
  scheduleHeroTitle: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: 1,
    lineHeight: 1,
  },
  scheduleTableWrap: {
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: 16,
    border: "1px solid #dbe7f3",
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
  },
  scheduleTable: {
    width: "100%",
    minWidth: 900,
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  scheduleTh: {
    background: "#eff5fb",
    color: "#23437f",
    fontSize: 14,
    fontWeight: 800,
    textAlign: "left",
    padding: "14px 14px",
    borderBottom: "1px solid #dbe7f3",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  scheduleTd: {
    padding: "14px 14px",
    borderBottom: "1px solid #edf2f7",
    verticalAlign: "middle",
    fontSize: 15,
    color: "#0f172a",
  },
  scheduleTdCenter: {
    padding: "14px 10px",
    borderBottom: "1px solid #edf2f7",
    verticalAlign: "middle",
    textAlign: "center",
  },
  scheduleRowEven: {
    background: "#fcfdff",
  },
  scheduleRowOdd: {
    background: "#f8fbff",
  },
  scheduleRowActive: {
    background: "linear-gradient(90deg, #eff6ff 0%, #f8fbff 100%)",
  },
  matchNoPill: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 38,
    height: 38,
    borderRadius: 999,
    background: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: 800,
    fontSize: 14,
  },
  scheduleDateMain: {
    fontWeight: 800,
    color: "#1e3a8a",
    fontSize: 14,
    lineHeight: 1.1,
    whiteSpace: "normal", // ⭐ allow wrapping
    wordBreak: "break-word", // ⭐ prevents overflow
  },
  scheduleDateSub: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 4,
    whiteSpace: "normal", // ⭐ allow wrapping
  },
  scheduleTime: {
    fontWeight: 700,
    color: "#0f172a",
    whiteSpace: "normal", // ⭐ allow wrapping
    wordBreak: "break-word", // ⭐ prevents overflow
  },
  fixtureMain: {
    fontWeight: 800,
    color: "#0f172a",
    lineHeight: 1.3,
    whiteSpace: "normal", // ⭐ allow wrapping
    wordBreak: "break-word", // ⭐ prevents overflow
  },
  fixtureVs: {
    color: "#64748b",
    fontWeight: 700,
  },
  venueText: {
    color: "#334155",
    fontWeight: 600,
    whiteSpace: "normal", // ⭐ allow wrapping
    wordBreak: "break-word", // ⭐ prevents overflow
  },
  liveBadge: {
    display: "inline-block",
    marginTop: 8,
    padding: "4px 10px",
    borderRadius: 999,
    background: "#dcfce7",
    color: "#15803d",
    fontSize: 12,
    fontWeight: 800,
  },
  statusDone: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#e0f2fe",
    color: "#0369a1",
    fontSize: 12,
    fontWeight: 800,
  },
  statusOpen: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#dcfce7",
    color: "#15803d",
    fontSize: 12,
    fontWeight: 800,
  },
  statusPending: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#f1f5f9",
    color: "#475569",
    fontSize: 12,
    fontWeight: 800,
  },
  neutralButton: {
    background: "#64748b",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },
  statusNoResult: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#fef3c7",
    color: "#92400e",
    fontSize: 12,
    fontWeight: 800,
  },
  countdownWrap: {
    marginTop: 14,
    marginBottom: 4,
    display: "flex",
    justifyContent: "center",
  },
  countdownLive: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    borderRadius: 999,
    background: "linear-gradient(90deg, #eff6ff, #f8fbff)",
    border: "1px solid #cfe0f5",
    boxShadow: "0 3px 8px rgba(37, 99, 235, 0.08)",
  },

  countdownLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "#1d4ed8",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  countdownValue: {
    fontSize: 15,
    fontWeight: 800,
    color: "#0f172a",
    fontVariantNumeric: "tabular-nums",
  },

  countdownLocked: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 999,
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    fontSize: 13,
    fontWeight: 800,
  },

  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  pointsCleanTable: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    tableLayout: "auto",
  },

  pointsNameCell: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },

  pointsAccentBar: {
    width: 6,
    height: 28,
    borderRadius: 999,
    flexShrink: 0,
  },

  pointsNameText: {
    fontWeight: 800,
    color: "#0f172a",
    fontSize: 15,
    whiteSpace: "nowrap",
  },

  pointsPill: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 58,
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 14,
    border: "1px solid",
  },

  formWrap: {
    display: "flex",
    gap: 6,
    flexWrap: "nowrap",
  },

  formDot: {
    width: 28,
    height: 28,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 800,
    border: "1px solid",
  },

  formWin: {
    background: "#dcfce7",
    color: "#15803d",
    borderColor: "#86efac",
  },

  formLoss: {
    background: "#fee2e2",
    color: "#b91c1c",
    borderColor: "#fca5a5",
  },

  formNoResult: {
    background: "#fef3c7",
    color: "#92400e",
    borderColor: "#fcd34d",
  },

  formMissed: {
    background: "#e5e7eb",
    color: "#4b5563",
    borderColor: "#cbd5e1",
  },
  sectionTitleCentered: {
    marginTop: 0,
    marginBottom: 18,
    color: "#14213d",
    textAlign: "center",
  },
  teamCardBlue: {
    background: "linear-gradient(180deg, #eef4ff 0%, #f8fbff 100%)",
    border: "1px solid #d6e4ff",
    boxShadow: "0 6px 14px rgba(37, 99, 235, 0.10)",
  },

  teamCardGreen: {
    background: "linear-gradient(180deg, #ecfdf5 0%, #f6fffa 100%)",
    border: "1px solid #bbf7d0",
    boxShadow: "0 6px 14px rgba(16, 185, 129, 0.10)",
  },
  subSectionTitleCentered: {
    marginBottom: 12,
    textAlign: "center",
    color: "#14213d",
  },
  statusBadgeBase: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.3,
  },

  badgeLive: {
    background: "#dcfce7",
    color: "#15803d",
    border: "1px solid #86efac",
  },

  badgeLocked: {
    background: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
  },

  badgeNoResult: {
    background: "#fef3c7",
    color: "#92400e",
    border: "1px solid #fcd34d",
  },

  badgeDoubleHeader: {
    background: "#ede9fe",
    color: "#6d28d9",
    border: "1px solid #c4b5fd",
  },
  matchBadgeRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  welcomeText: {
    color: "#6b7280",
    opacity: 0.6,
    fontSize: 13,
    marginTop: 6,
    marginBottom: 10,
    textAlign: "left",
  },
  playerStatusTopBar: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 18,
  },

  playerStatusLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: "#64748b",
  },

  playerStatusSelect: {
    width: "100%",
    maxWidth: 320,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #dbe7f3",
    background: "#ffffff",
    fontSize: 15,
    fontWeight: 600,
    color: "#0f172a",
  },

  playerStatusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 14,
  },

  playerStatusCard: {
    borderRadius: 16,
    padding: "16px 18px",
    minWidth: 0,
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
  },

  playerStatusCardTitle: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: 700,
    marginBottom: 12,
    textAlign: "center",
  },

  playerStatusValue: {
    fontSize: 28,
    fontWeight: 800,
    color: "#0f172a",
    lineHeight: 1,
    textAlign: "center",
  },

  playerStatusValueText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.3,
    textAlign: "center",
    wordBreak: "break-word",
  },

  playerStatusValueMuted: {
    fontSize: 20,
    fontWeight: 700,
    color: "#64748b",
  },

  playerStatusTiny: {
    display: "block",
    marginTop: 8,
    fontSize: 12,
    color: "#64748b",
  },

  streakWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    minHeight: 32,
    flexWrap: "wrap",
  },

  fireIcon: {
    fontSize: 22,
    lineHeight: 1,
  },
  playerStatusGraphCard: {
    gridColumn: "1 / -1",
  },

  rankChartWrap: {
    width: "100%",
    marginTop: 6,
  },

  rankChartSvg: {
    width: "100%",
    maxWidth: 560,
    height: "auto",
    display: "block",
    margin: "0 auto",
  },

  rankChartFooter: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 12,
    color: "#64748b",
    fontWeight: 700,
  },
  warningButton: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },

  undoInfoBox: {
    marginTop: 12,
    background: "#fffbeb",
    border: "1px solid #fcd34d",
    color: "#92400e",
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
  },
  voteHiddenBox: {
    background: "linear-gradient(180deg, #fff7ed 0%, #fffaf5 100%)",
    border: "1px solid #fdba74",
    borderRadius: 12,
    padding: 14,
    textAlign: "center",
  },

  voteHiddenTitle: {
    fontSize: 14,
    fontWeight: 800,
    color: "#9a3412",
    marginBottom: 6,
  },

  voteHiddenText: {
    fontSize: 13,
    color: "#7c2d12",
    lineHeight: 1.4,
  },
  voteRevealWrap: {
    background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
    border: "1px solid #dbe7f3",
    borderRadius: 16,
    padding: 14,
    boxShadow: "0 8px 18px rgba(37, 99, 235, 0.08)",
  },

  voteRevealBanner: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    borderRadius: 999,
    background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.4,
    margin: "0 auto 14px auto",
  },

  voteRevealCard: {
    transform: "translateY(0)",
    boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
  },
};
