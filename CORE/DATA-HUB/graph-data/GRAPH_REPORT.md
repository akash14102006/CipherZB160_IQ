# Graph Report - Mule Account Detection and Classification  (2026-06-15)

## Corpus Check
- 11 files · ~301,829 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 48 nodes · 38 edges · 14 communities (9 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `58ea35de`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 9|Community 9]]

## God Nodes (most connected - your core abstractions)
1. `🧠 MASTER PROMPT – UI/UX DESIGN ARCHITECT (PROFESSIONAL DASHBOARD SYSTEM)` - 15 edges
2. `🧩 COMPONENTS` - 7 edges
3. `🏛️ ADMIN DASHBOARD` - 6 edges
4. `👤 USER UI` - 5 edges
5. `🧠 ROLE` - 2 edges
6. `plugin` - 1 edges
7. `configurations` - 1 edges
8. `Design Thinking` - 1 edges
9. `Frontend Aesthetics Guidelines` - 1 edges
10. `Experience:` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (14 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.17
Nodes (11): 🎭 DESIGN STYLE, 🎨 DESIGN THEME, 🎯 FINAL GOAL, 📐 LAYOUT, 🧠 MASTER PROMPT – UI/UX DESIGN ARCHITECT (PROFESSIONAL DASHBOARD SYSTEM), 📦 OUTPUT FORMAT, 🎯 PROJECT CONTEXT, 🚫 RULES (+3 more)

### Community 1 - "Community 1"
Cohesion: 0.29
Nodes (7): Buttons, Cards, 🧩 COMPONENTS, Forms, Navbar, Sidebar, Tables

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (6): 🏛️ ADMIN DASHBOARD, Dashboard, Escalation, Issues, Live Tracking, Tasks

### Community 3 - "Community 3"
Cohesion: 0.40
Nodes (5): Home, Issue Details, My Requests, Raise Issue, 👤 USER UI

## Knowledge Gaps
- **32 isolated node(s):** `plugin`, `version`, `configurations`, `Design Thinking`, `Frontend Aesthetics Guidelines` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `🧠 MASTER PROMPT – UI/UX DESIGN ARCHITECT (PROFESSIONAL DASHBOARD SYSTEM)` connect `Community 0` to `Community 1`, `Community 2`, `Community 3`, `Community 7`?**
  _High betweenness centrality (0.387) - this node is a cross-community bridge._
- **Why does `🧩 COMPONENTS` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `🏛️ ADMIN DASHBOARD` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **What connects `plugin`, `version`, `configurations` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._