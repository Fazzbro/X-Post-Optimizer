# Phoenix Content Optimizer

Algorithmic post engineering calibrated to the open-source [xai-org/x-algorithm](https://github.com/xai-org/x-algorithm) repository.

---

## Overview

The Phoenix Content Optimizer is a specialized engineering utility designed to translate raw conceptual thoughts into high-velocity posts optimized for distribution across the X recommendation system.

Unlike generic social media rewriters that prioritize superficial engagement or hashtag stuffing, this optimizer evaluates content against the exact scoring mechanics, embedding models, and ranking parameters disclosed in `xai-org/x-algorithm`.

---

## Calibrated Repository Architecture

The optimizer models the multi-stage candidate generation and scoring pipeline implemented in the official repository:

1. **Candidate Retrieval (`phoenix/run_pipeline.py`)**:
   Unified end-to-end inference script consolidating candidate generation and transformer-based dense semantic matching.

2. **Graph-Based Out-of-Network Routing (`SimClusters`)**:
   Bipartite community graphs that map user interests and co-engagement clusters to discover relevant audiences outside of existing follower graphs.

3. **Multimodal Content Understanding (`Grox`)**:
   Deep visual and textual categorization pipeline that analyzes image contrast, diagrammatic density, and semantic compliance to assign quality weights.

4. **Diversity and Anti-Fatigue Filtering (`Author Diversity Scorer`)**:
   Frequency and saturation controls that penalize repetitive structural patterns, cliché phraseology, and spam heuristics.

---

## Mathematical Scoring Model (`param.rs`)

The recommendation engine computes a weighted sum of predicted action probabilities $P(\text{Action})$ rather than tallying raw engagements. Production weights configured in `home-mixer/params/param.rs` govern final ranking:

| Action Vector | Weight ($W_i$) | Strategic Priority | Algorithmic Objective |
| :--- | :--- | :--- | :--- |
| $P(\text{share\_via\_copy\_link})$ | `20.0` | Critical | Bookmarking, external distribution, resource utility |
| $P(\text{quote})$ | `5.0` | High | Commentary elicitation, perspective sharing |
| $P(\text{reply})$ / $P(\text{reply\_engaging})$ | `5.0` | High | Active discourse, conversation tree depth |
| $P(\text{share\_via\_dm})$ | `5.0` | High | High-intent peer-to-peer recommendation |
| $P(\text{retweet})$ | `1.0` - `2.0` | Moderate | Broadcast distribution |
| $P(\text{like})$ | `0.5` | Low | Baseline endorsement (lowest positive multiplier) |
| $P(\text{dwell\_time})$ / Media Playback | Continuous | High | Attention capture via formatting and click-to-expand |
| $P(\text{report})$ | `-234.0` | Severe Penalty | Hard suppression shield; avoid policy triggers |

### Scoring Formula Principle

$$\text{Score} = \sum_{i} W_i \cdot P(\text{Action}_i) - \text{Penalties}$$

Key takeaway from the algorithm code: **A single link share ($20.0$) carries 40x the mathematical weight of a solitary like ($0.5$).** The optimizer directly prioritizes high-weight actions while suppressing report risk ($W_{\text{report}} = -234.0$).

---

## Pipeline Strategy Output

Each optimization run generates a four-part tactical specification:

### 1. The Optimized Post
Draft variations structured with aggressive hooks, cadence breaks, and visual spacing engineered to trigger $P(\text{click})$ ("Read more" expansion) and maximize dwell time.

### 2. Algorithmic Breakdown
- **Targeted $P(\text{Action})$**: Quantitative alignment with `param.rs` parameters.
- **Semantic Niche (ML-Similarity & SimClusters)**: Dense keyword embeddings targeting specific interest communities.

### 3. Media Integration Strategy (Grox Vision Pipeline)
Prescription for high-contrast informational graphics, system schematics, or benchmarks readable by multimodal computer vision classifiers.

### 4. Engagement Catalyst & Velocity Strategy
Immediate post-publishing interaction playbook designed to generate early engagement velocity before author diversity decay dampens reach.

---

## Tech Stack

- **Runtime**: Node.js (ESNext / TypeScript)
- **Backend**: Express.js with `@google/genai` integration
- **AI Model**: Gemini 3.5 Flash with calibrated domain instructions
- **Frontend**: React 19, Vite, Tailwind CSS
- **Markdown Processing**: React Markdown with typography formatting
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18+ or later
- npm or yarn package manager
- Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/phoenix-content-optimizer.git
cd phoenix-content-optimizer

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file at the project root based on `.env.example`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### Local Development

```bash
# Start development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Production Build

```bash
# Compile client and bundle server
npm run build

# Start production server
npm start
```

---

## API Specification

### Optimize Idea

```http
POST /api/optimize
Content-Type: application/json
```

#### Request Payload

```json
{
  "idea": "Autonomous coding agents will make single-person unicorn companies possible by 2026."
}
```

#### Response Format

```json
{
  "result": "### 1. The Optimized Post\n...\n### 2. Algorithmic Breakdown\n...\n### 3. Media Integration Strategy\n...\n### 4. Engagement Catalyst\n..."
}
```

### Health Check

```http
GET /api/health
```

#### Response Format

```json
{
  "status": "ok"
}
```

---

## Architecture References

- Official X Recommendation Algorithm: [github.com/xai-org/x-algorithm](https://github.com/xai-org/x-algorithm)
- Scoring Weights Parameter File: `home-mixer/params/param.rs`
- End-to-End Pipeline Entrypoint: `phoenix/run_pipeline.py`
- Community Discovery System: `SimClusters`

---

## License

Apache License 2.0. Calibrated for research and algorithmic content optimization.
