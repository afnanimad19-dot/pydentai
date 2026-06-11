# Competitor Screen Inventory & Gap Analysis (Batch 1 of 2)

Analyzed 2026-06-11 from 65 screenshots across 5 zips: Dashboard, AI & Agents,
Engage, WhatsApp, AI Intelligence. (Batch 2 pending: SMS, Email, Instagram,
Website Chat, + 1 more.)

This is an inventory/spec written for the PyDent.AI rebuild. We replicate
functionality and flows — NOT their branding, copy, or visual assets.

## Global shell (all pages)

- Dark navy theme, left sidebar (~260px, collapsible) with logo, bell, search.
- Nav groups with count badges + chevrons; locked items show padlock (premium
  gating): Dashboard · AI & Agents (13) · AI Intelligence (6) · WhatsApp (10) ·
  SMS (7) · Email (9) · Instagram (3) · Website Chat (5) · Engage (13) · Team.
- Sidebar footer: user avatar + presence dot, dark-mode toggle, logout.
- Floating blue analytics FAB bottom-right on most pages (target unknown).
- "How to use" help link on most page headers (popup never captured).
- Many pages captured in "View Only Mode" (amber banner) — admin states unknown.

## Module 1: Dashboard (4 tabs: Overview / Channels / AI Agents / Activity)

- Top: greeting + date, Command Center bar (live/queued/agents pills, Sync),
  Credit Usage card (e.g. WhatsApp validation credits, progress bar).
- Tab bar with count badges; "System Healthy" indicator + clock.
- **Overview:** Channel Health strip (Voice/WhatsApp/Instagram/Email/SMS status
  tiles) · Business Intelligence 6-stat card · 8 KPI tiles · Call Performance
  chart (Area/Bar/Mixed toggle, 7-day, completed/failed) · Live Operations
  (active/queue + system health) · Quick Actions (Start Calling, Import Leads,
  Create Agent, Schedule Calls, WhatsApp) · Autopilot toggle card · Performance
  / Recent Leads / Call Timeline / Upcoming cards · agent-readiness banner ·
  Agent Leaderboard · Lead Intelligence (AI-scored hot leads) · System Activity
  event stream.
- **Channels:** 6 channel cards (WhatsApp, Instagram DM, Email, SMS, LinkedIn,
  Website Chat) each with status badge, stat strip, 2 sub-tiles, footer action
  buttons linking into the module.
- **AI Agents:** readiness banner, agent cards (avatar, voice, lang, online,
  call count), Agent Performance Summary + top performer.
- **Activity:** Recent Leads / Call Timeline / Upcoming (same 3 cards as
  Overview, full-tab).

## Module 2: AI & Agents (13 sidebar items)

- **Agent Studio (list):** KPIs (agents/live/docs/FAQs/calls), search, channel
  filter All|Voice|Chat, status filter, view toggles, Setup Wizard btn,
  + New Agent. Table: name, type (Chat/Voice/Both), status, readiness %,
  channels, lang, docs, FAQs, calls, updated, actions.
- **Create Agent wizard — 6 steps:**
  1. Agent Type: Chat / Voice / Omnichannel + optional preset (Sales, Support,
     Appointment Setter, Custom).
  2. Intelligence: agent name → company website URL + optional doc upload →
     "Analyze & Auto-Generate" (AI builds identity/persona/instructions);
     skip-and-configure-manually link.
  3. Identity: name, role/title, organization, language, persona textarea +
     live preview card.
  4. Behavior: opening message, system instructions, Safety & Guardrails
     toggles (content filtering, human escalation, PII protection, topic
     boundaries).
  5. Voice & Channel: voice provider cards, voice select w/ preview, stability
     + speed sliders, test-call voice.
  6. Review: summary hero, check chips, info tiles, persona + opening preview,
     Create Agent.
- **Agent detail page:** header (Active toggle, Sync, Test, History, lock,
  overflow), 4 overview cards (Readiness %, Statistics, Quick Actions,
  Details/Agent ID). **11 tabs:** Identity, Behavior, Conversation, Voice,
  Intelligence, Memory, Handoff, Analytics, Training, Post-Call, Advanced.
  Only Identity captured: basic info, opening message editor (char count,
  Generate, AI Validate, ~duration estimate), 6 preset type cards, industry +
  priority dropdowns, collapsed Advanced Settings.
- **Agent Hub:** channel→agent assignment grid (AI Calling, WhatsApp,
  Instagram, Website Chat, Email, SMS, LinkedIn) each with toggle + agent
  dropdown + configure link.
- **Workflow Studio:** dashboard (8 KPIs, filters, empty state) → pick agent →
  canvas builder. Node palette: 31 nodes / 6 categories: Triggers (Start,
  Inbound Call, Inbound Message, Schedule, Webhook), Conversation (Greeting,
  Ask Question, Collect Data, AI Response, Play Audio), Logic (Condition, AI
  Decision, Sentiment Check, A/B Test, Delay, Loop), Actions (Update CRM, Tag
  Lead, Schedule Meeting, Send Email, Send SMS, API Call, Notify Team),
  Channels (Transfer Call, Agent Handoff, Channel Switch), Advanced (Memory
  Read/Write, Custom Code, Analytics Log, End). Save/Publish/Execute, minimap,
  health %.
- **Voice Lab:** real-time voice test console — agent selector, lang/voice
  chips, docs/FAQs counters, orb visualizer + call button, live transcript
  panel; after call: Call Summary (duration, messages, sentiment %, agent talk
  %, AI insights, New Call / Export).
- **Messaging Lab:** chat test console — channel selector (WhatsApp etc.),
  agent selector, model chip (e.g. Gemini 2.5), RAG status, WhatsApp-style
  simulator, quick persona test, 6 quick replies, composer.
- **Knowledge Base:** per-agent — score /100, docs, FAQs generated, voice
  ready, content size, synced. Tabs: Sources / FAQs / Auto-Learning /
  Insights. Upload Files | Website segmented ingestion; source rows w/ FAQ
  count + Ready status. Link to test in Messaging Lab.
- **Document Library:** central docs — KPIs (docs, projects, FAQs, ready,
  processing, pending, assigned, storage MB, % parsed), Projects, list/grid,
  status filters. Upload modal (PDF/DOCX/TXT/MD/CSV/XLSX, pipeline: upload →
  extract → parse → FAQ gen → agent sync; 50MB claim vs 10MB on KB page —
  inconsistency). Scrape Website modal (URL, auto-parse, FAQ gen, deep crawl
  up to 50 pages, ~30s).
- **Voice Health:** command center — agents/phone lines/calls/docs/completion
  KPIs, overall readiness gauge, voice engine + phone network cards, per-agent
  diagnostics rows (voice/synced/knowledge/phone checks + readiness %).
- **Post-Call Activity:** delivery log of auto-sent docs after calls (when /
  agent / document / recipient / channel / status / trigger); onboarding steps
  reference Agent Studio → Post-Call tab + trigger keywords.
- **Avatar Studio (light theme):** live avatar call stage, Preview|Design
  modes, agent link panel (persona/voice/opening/knowledge status, KB chunks +
  recall %, voice tune rate + emotion, session persona override).
- **Avatar Manage:** meetings dashboard — quick actions, 7 KPIs, 11 tabs
  (Overview, Meetings, Avatars, Agents, Mapping, Test Lab, Schedule, Live, KB
  Console, Health). Schedule tab: quick-schedule form (from lead, name, agent,
  email, phone, when+duration, auto-deliver via Email/SMS/WhatsApp toggles,
  notes, Schedule / Auto-Activate).
- **Avatar Sync Status:** sync ops center — provider sync runs, KPIs, filters,
  Overview|Timeline. (Captured in a backend-error state.)
- **OIS:** locked page, never captured.

## Module 3: Engage (13 items)

- **Leads:** 6 KPIs, 7-stage pipeline strip, hot/warm/cold filters, 4 view
  modes, AI Score All / Score Filtered / Duplicates / Schedule / Import CSV /
  Add Lead. Add Lead modal: name*, phone*, email, company, source, status,
  priority, notes.
- **Call Status:** auto-call attempt tracking (total/answered/unreachable/
  qualified), search + status filter, Export CSV.
- **Live Monitoring:** call queue + command center; active call: live badge,
  sentiment %, waveform, Listen/Whisper/Barge/Takeover (+⌘1-4), End Call;
  9 call sub-tabs (Transcript, Safety, Analytics, Recording, AI Coach,
  Scripts, Battle Cards, Compliance, Contact); keyword highlighting in
  transcript; Simulate mode.
- **Upcoming Calls:** list/cards/calendar views, status tabs (upcoming/
  overdue/completed/missed/cancelled). Schedule Call modal: contact*, phone*,
  email, company, date*, time*, preferred voice, AI agent, product interest,
  notes.
- **Recurring Schedules ("Cadence Command Center"):** cadence patterns, 6
  KPIs, frequency filters, import/export/sync, detail panel.
- **Reminders ("Multi-Channel"):** Email/SMS/Push/WhatsApp channel rows with
  toggles, timing dropdowns (N min before), sent counts, sparklines; tabs
  Channels/Templates/Analytics; Add Channel.
- **Call Scripts Studio:** AI-guided scripts auto-selected per lead by
  language/source/intent. Create modal: name, language, description, matching
  rules (lead sources, keyword tags, priority, default fallback, active),
  4 stage tabs (Intro/Pitch/Close/Objections).
- **Call History:** KPIs, search/date/status filters, rows expandable to notes
  + full transcript; Sync/Export/Reports.
- **Advanced Analytics:** QA scoring — avg call score, calls analyzed,
  positive %, high performers; tabs Overview / Voice Analytics / Compliance /
  Scripts / Battle Cards; talk/listen ratio, interruptions, response time,
  speaking pace, silence ratio.
- **Automation Settings:** tabs Power Dialer / Auto-Call / Callbacks /
  Auto-Disposition / Voicemail. Power Dialer: Preview / Power / Predictive
  modes, ring timeout, wrap-up time, voicemail detection + auto-drop,
  compliance section (cut off).
- **Connections ("Integration Hub"):** 11 integrations grouped by channel,
  health %, connected/disconnected counts, connect-now flows (Instagram, WA
  Business API, WA Chatbot Flows, SMS provider, LinkedIn Lead Gen, +~6 below
  fold).
- **Messaging Templates:** only 403/upgrade modal captured — real page unknown.
- **Team:** teams CRUD, 6 KPIs, role distribution (Owner/Admin/Manager/Agent/
  Viewer), team performance gauges, activity feed.

## Module 4: WhatsApp (10 items)

- **Dashboard ("Command Center"):** 8 KPIs, account health gauge, connection
  card, API status, rate limits (tiered), 8 quick-action tiles (incl. Send
  Broadcast, Validate Numbers, Media Library — pages uncaptured), recent
  activity, message flow/types, AI insights.
- **Inbox:** conversation list (All/Unread/Leads/Pinned) + thread pane;
  unread/leads/AI-rate/total pills.
- **Live Agent Console:** queue/active/waiting/resolved KPIs, agent status
  dropdown (Online/Offline), New Chat, bot↔human handoff.
- **Campaigns:** only the Create wizard captured — name, business account,
  type cards (Marketing/Utility/Broadcast w/ avg open rates), template-or-
  custom message, audience (individual/group/all), send now or schedule;
  right rail: phone preview, delivery forecast + est cost, readiness
  checklist, best sending times, tips. LIST PAGE MISSING.
- **Templates:** manager list (8 KPIs incl. approval statuses) + Template
  Builder: name (snake_case), category (Marketing/Utility/Authentication),
  Meta approval note (24-48h), language; content tabs Header/Body/Footer/
  Buttons (only Header captured); live phone preview; readiness %; submit for
  approval.
- **Chatbot ("Flow Command Center"):** flows list w/ automation readiness,
  6 KPIs, tabs Flows/Analytics/Intelligence; New Flow modal → AI Flow Builder
  (chat-based: business type, goal, data to collect) or Build Manually.
  Flow editor: 22 nodes / 5 groups: Messages (Send Message, Send Media, List
  Message, Send Location, Send Template), Input & Data (Collect Input,
  Request Location, Await Reply, Save to Lead, Set Variable), Logic
  (Condition, Random Split, Delay, Schedule, Go to Flow), Actions (AI
  Response, HTTP Request, Assign Tag, Add to Group, Notify Team, Transfer to
  Human), End. Health %, LIVE toggle, Preview/Test/Publish, minimap,
  variables.
- **Contacts:** KPIs (total/new/contacted/qualified/engagement/conversion),
  import CSV, add contact, status chips.
- **Tags:** tag CRUD w/ 10-color palette, usage KPIs, coverage %.
- **Reports:** 10 KPIs; tabs Overview / Delivery Funnel / Engagement /
  Campaigns / AI Intelligence / Data Table; activity trend, health score,
  radar, daily bars, peak hours; date range + export.
- **Setup:** connected numbers, Add New Number (wizard uncaptured), Quick
  Actions tab.

## Module 5: AI Intelligence (6 items)

- **AI Autopilot:** master ON/OFF, per-channel cards (WhatsApp/Instagram/
  Email/Voice) each w/ toggle + metrics (response time, leads, sentiment,
  success) + 4 features: Auto Reply, Auto Qualify, Auto Follow-Up, Auto Book.
  Tabs: Channels / Revenue Mode / AI Pipeline / Safety & Rules (uncaptured).
- **AI Brain:** Run AI Analysis → predictions; KPIs (predictions, confidence,
  pending actions, success rate, operations, tokens used); tabs Predictions /
  Recommendations / Channels / Activity.
- **AI Deal Closer:** NO SCREENSHOT (folder contained byte-identical copy of
  Autopilot file — confirmed via MD5).
- **AI Insights:** 10-KPI strip, Generate Intelligence Report (conversion
  analysis, funnel diagnostics, smart recs, risk alerts, best messages,
  predictions, advantages, health score), weekly trends combo chart,
  performance radar, channel distribution donut.
- **Conversation Intel:** paste-a-conversation analyzer — intent detection,
  emotion mapping, deal scoring; 4 quick examples; results panel (output
  state uncaptured).
- **Revenue Command Center:** 7 KPIs (total/AI/recurring revenue, deals,
  conversion, pipeline, profit; AED currency), 7D/30D/90D/1Y ranges, tabs
  Overview / Channels / AI Agents / Pipeline; revenue-vs-target chart, health
  gauge, AI revenue engine card, peak hours, revenue split. (Their app shows
  a NaN% divide-by-zero bug — do not replicate.)

## Bugs/inconsistencies seen in their app (do NOT replicate)

1. NaN% on Revenue "Recurring" KPI (divide-by-zero).
2. "View Only Mode" banner rendered twice on several pages.
3. Sidebar groups duplicated on some AI Intelligence captures.
4. Agent descriptions swapped: "Sarah" card describes Ella and vice versa.
5. 10MB (KB page) vs 50MB (upload modal) max-file-size conflict.
6. Avatar Manage page header titled "Avatar Studio" (name collision).
7. Dashboard demo data (recent activity, message types) contradicts zeroed
   KPIs — placeholder data left in.

## Missing screens (top gaps, batch 1)

1. AI Deal Closer — entire page.
2. Agent detail — 10 of 11 tabs (esp. Post-Call, Voice, Training, Handoff).
3. WhatsApp Campaigns list page; Template Builder Body/Footer/Buttons tabs.
4. Engage Messaging Templates real page (only 403 modal).
5. Live call sub-tabs (8): Safety, Analytics, Recording, AI Coach, Scripts,
   Battle Cards, Compliance, Contact.
6. Advanced Analytics 4 tabs; Automation Settings 4 tabs; Reminders 2 tabs.
7. WhatsApp Reports 5 tabs; Chatbot Analytics/Intelligence tabs; flow node
   config panels; Setup add-number wizard.
8. Knowledge Base FAQs / Auto-Learning / Insights tabs.
9. Avatar Manage 9 of 11 tabs; Avatar Studio Design mode; healthy Sync
   Status state.
10. AI Autopilot 3 tabs; AI Brain 3 tabs; Revenue 3 tabs; Conversation Intel
    results state; AI Insights generated report.
11. Connections list below fold (~6 more integrations).
12. Admin/unlocked states for all View Only pages; create/edit modals (New
    Cadence, Add Channel, Create Team, New Tag, Add Contact, Import CSV);
    populated data states everywhere; "How to use" popups; notifications
    panel; FAB target; light mode.
