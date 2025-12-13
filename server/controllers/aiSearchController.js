const Groq = require("groq-sdk");
const JobPosting = require("../models/JobPosting");
const User = require("../models/User");

// Use Groq to extract structured search parameters, then query MongoDB
exports.aiJobSearch = async (req, res) => {
  const userQuery = (req.body?.query || "").trim();
  if (!userQuery) {
    return res.status(400).json({ message: "Query is required" });
  }
  console.log("🔍 Processing query:", userQuery);

  const key = process.env.GROQ_API_KEY;

  // Helper: default param extraction if key missing or AI fails
  const naiveExtract = (q) => {
    const lower = q.toLowerCase();
    const jobTypes = ["full-time", "part-time", "contract", "internship"];
    const arrangements = ["remote", "on-site", "onsite", "hybrid"];
    const jobType = jobTypes.find(t => lower.includes(t)) || null;
    const waRaw = arrangements.find(a => lower.includes(a)) || null;
    const workArrangement = waRaw === "onsite" ? "On-site" : (waRaw ? waRaw.charAt(0).toUpperCase() + waRaw.slice(1) : null);
    const cityMatch = lower.match(/\b(in|at)\s+([a-zA-Z\s]+)$/);
    const city = cityMatch ? cityMatch[2].trim() : null;
    const salaryMatch = lower.match(/(\d{2,6})\s*(usd|pkr|rs)?/i);
    const minSalary = salaryMatch ? Number(salaryMatch[1]) : null;
    const keywords = lower.split(/\W+/).filter(w => w.length > 3);
    return { jobType, workArrangement, city, minSalary, maxSalary: null, keywords };
  };

  let extracted = naiveExtract(userQuery);

  try {
    if (key) {
      const groq = new Groq({ apiKey: key });
      const prompt = [
        "You extract job search parameters from a user query.",
        "Return STRICT JSON with keys:",
        "{ \"jobType\": string|null, \"workArrangement\": string|null, \"city\": string|null, \"minSalary\": number|null, \"maxSalary\": number|null, \"keywords\": [string] }",
        "Allowed jobType: Full-Time, Part-Time, Contract, Internship.",
        "Allowed workArrangement: Remote, On-site, Hybrid.",
        `Query: "${userQuery}"`
      ].join("\n");

      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Return strictly compact JSON, no prose." },
          { role: "user", content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 200
      });

      const raw = completion?.choices?.[0]?.message?.content?.trim() || "";
      try {
        const parsed = JSON.parse(raw);
        // Basic shape guard
        if (parsed && Array.isArray(parsed.keywords)) {
          extracted = parsed;
        }
      } catch (_) {
        // keep naive extracted if JSON fails
      }
    }
  } catch (err) {
    console.error("Groq extraction error:", err?.message || err);
  }

  // Build MongoDB query based on extracted params
  const filter = {};
  if (extracted.jobType) filter.jobType = { $regex: new RegExp(extracted.jobType, "i") };
  if (extracted.workArrangement) filter.workArrangement = { $regex: new RegExp(extracted.workArrangement, "i") };
  if (extracted.city) filter.city = { $regex: new RegExp(extracted.city, "i") };
  if (extracted.minSalary || extracted.maxSalary) {
    filter.salary = {};
    if (extracted.minSalary) filter.salary.$gte = extracted.minSalary;
    if (extracted.maxSalary) filter.salary.$lte = extracted.maxSalary;
  }

  try {
    let jobs = await JobPosting.find(filter)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(20);

    if (extracted.keywords && extracted.keywords.length) {
      jobs = jobs.filter(job => {
        const searchText = `${job.jobName || ''} ${job.jobDescription || ''} ${job.additionalInformation || ''}`.toLowerCase();
        return extracted.keywords.some(k => searchText.includes(String(k).toLowerCase()));
      });
    }

    return res.json({
      success: true,
      query: userQuery,
      extractedParams: extracted,
      count: jobs.length,
      jobs
    });
  } catch (err) {
    console.error("DB search error:", err?.message || err);
    return res.status(500).json({ message: "Search failed", error: err?.message || String(err) });
  }
};

// Get AI suggestions for search queries
exports.getSuggestions = async (req, res) => {
  try {
    const suggestions = [
      "Find remote software developer jobs",
      "Show me full-time React positions in Lahore",
      "What marketing jobs are available?",
      "Find part-time internships",
      "Show jobs with salary above 80000",
      "Find on-site jobs in Islamabad",
      "Show me UI/UX designer positions",
      "Find contract jobs for Python developers"
    ];

    res.json({ suggestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Employer: AI Candidate Search via Groq + MongoDB
exports.aiCandidateSearch = async (req, res) => {
  const userQuery = (req.body?.query || "").trim();
  if (!userQuery) {
    return res.status(400).json({ message: "Query is required" });
  }
  console.log("🎯 Candidate search query:", userQuery);

  const key = process.env.GROQ_API_KEY;

  // Fallback keyword extraction
  const naiveSkills = (q) => q
    .toLowerCase()
    .split(/\W+/)
    .filter(w => w.length > 2)
    .filter(w => !["find","candidate","with","and","in","for","skill","skills"].includes(w));

  let extracted = { skills: naiveSkills(userQuery), location: null, minYears: null };

  try {
    if (key) {
      const groq = new Groq({ apiKey: key });
      const prompt = [
        "Extract candidate search parameters from employer query.",
        "Return STRICT JSON: { \"skills\": [string], \"location\": string|null, \"minYears\": number|null }",
        `Query: "${userQuery}"`
      ].join("\n");

      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Return strictly compact JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 200
      });

      const raw = completion?.choices?.[0]?.message?.content?.trim() || "";
      try {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.skills)) extracted = parsed;
      } catch {_}
    }
  } catch (err) {
    console.error("Groq candidate extraction error:", err?.message || err);
  }

  // Build MongoDB query for users with matching skills
  // Note: do not restrict by userType to avoid missing valid applicants due to casing/value differences
  const filter = {};
  if (extracted.location) filter.location = { $regex: new RegExp(extracted.location, "i") };

  try {
    let users = await User.find(filter)
      .select("name email skills location specialization workExperience profilePhoto bio languages education")
      .sort({ updatedAt: -1 })
      .limit(50);

    // Filter by skills: intersection OR substring match (case-insensitive)
    if (extracted.skills?.length) {
      const skillSet = extracted.skills.map(s => String(s).toLowerCase());
      users = users.filter(u => (u.skills || []).some(s => {
        const sv = String(s).toLowerCase();
        return skillSet.includes(sv) || skillSet.some(k => sv.includes(k));
      }));
    }

    // Additionally match keywords against bio, specialization, and experience descriptions
    if (extracted.skills?.length) {
      const keywords = extracted.skills.map(s => String(s).toLowerCase());
      users = users.filter(u => {
        const texts = [];
        if (u.bio) texts.push(String(u.bio));
        if (u.specialization) texts.push(String(u.specialization));
        if (Array.isArray(u.workExperience)) {
          u.workExperience.forEach(w => {
            if (w.description) texts.push(String(w.description));
            if (w.jobTitle) texts.push(String(w.jobTitle));
            if (w.company) texts.push(String(w.company));
          });
        }
        if (Array.isArray(u.education)) {
          u.education.forEach(ed => {
            if (ed.fieldOfStudy) texts.push(String(ed.fieldOfStudy));
            if (ed.institution) texts.push(String(ed.institution));
            if (ed.description) texts.push(String(ed.description));
          });
        }
        const haystack = texts.join(" ").toLowerCase();
        return keywords.some(k => haystack.includes(k));
      });
    }

    // Optional minYears: compute from workExperience
    if (extracted.minYears) {
      users = users.filter(u => {
        const exp = Array.isArray(u.workExperience) ? u.workExperience : [];
        const years = exp.reduce((sum, e) => {
          // naive year calc
          const start = parseInt(String(e.startDate).slice(0,4)) || 0;
          const end = parseInt(String(e.endDate).slice(0,4)) || new Date().getFullYear();
          return sum + Math.max(0, end - start);
        }, 0);
        return years >= extracted.minYears;
      });
    }

    const responsePayload = {
      success: true,
      query: userQuery,
      extractedParams: extracted,
      count: users.length,
      candidates: users
    };
    if (users.length === 0) {
      responsePayload.debug = {
        note: "No candidates matched. Check skills/bio matching and query keywords.",
        extractedSkills: extracted.skills,
        location: extracted.location
      };
    }
    return res.json(responsePayload);
  } catch (err) {
    console.error("Candidate DB search error:", err?.message || err);
    return res.status(500).json({ message: "Candidate search failed", error: err?.message || String(err) });
  }
};
