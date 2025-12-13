const Groq = require("groq-sdk");
const JobPosting = require("../models/JobPosting");

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
