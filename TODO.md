# Project Roadmap: High-Performance ArgoCD UI

> **Philosophy:** A "Cased-like" experience for the browser. Zero latency, keyboard-first, and capable of handling massive application states without freezing the main thread.

## 🏗️ Phase 1: Foundation & Layout (The Shell)

_Before we optimize, we need a place to live. Mimic the modern "Workspace" layout._

- [ ] **App Shell Layout**
  - [ ] **Collapsible Sidebar:**
    - [ ] Navigation (Apps, Settings, Documentation).
    - [ ] Favorites / Pinned Apps.
    - [ ] Cluster status summary widget (mini-graph).
  - [ ] **User Controls:**
    - [ ] User Avatar / Profile menu (bottom of sidebar).
    - [ ] **Logout** functionality.
    - [ ] Theme toggle (System/Dark/Light).
  - [ ] **Global Header:**
    - [ ] Breadcrumbs (Project > App > Resource).
    - [ ] Global connection status indicator (WebSocket health).
- [ ] **Authentication Flows**
  - [ ] Better Login Page (Brandable, not just a form).
  - [ ] Session expiry handling (Graceful redirect to login).

## 🕸️ Phase 2: Visual Interactivity (The Graph)

_The centerpiece of the application: A living map of your infrastructure._

- [ ] **Interactive Resource Graph (Svelte Flow):**
  - [ ] **Node-based Visualization:** Replace standard lists with a zoomable, pannable graph.
  - [ ] **Smart Grouping:** Group Pods by ReplicaSet, ReplicaSets by Deployment.
  - [ ] **Visual Status:** Nodes glow red/green based on health.
  - [ ] **Edges:** Visualize `OwnerReferences` and Service selector connections.

## 🚀 Phase 3: The Performance Core (Anti-Slowness)

_The engine under the hood._

- [ ] **Virtualization Engine**
  - [ ] Implement windowed/virtualized lists for Application lists (handle 1000+ apps smoothly).
  - [ ] Implement vird tualized DOM for the Resource Tree view.
- [ ] **Smart Data Fetching**
  - [ ] Replace heavy polling with **Server-Sent Events (SSE)**.
  - [ ] Implement `stale-while-revalidate` caching (TanStack Query).
- [ ] **Diff Calculation Offloading**
  - [ ] Web Worker for computing diffs non-blockingly.

## ⌨️ Phase 4: Command & Control (Usability)

_The "Cased" experience._

- [ ] **Global Command Palette (Ctrl+K / Cmd+K)**
  - [ ] Navigation, Sync triggers, Quick actions.
- [ ] **Keyboard Shortcuts**
  - [ ] Vim-style navigation (`j`/`k`).
  - [ ] Quick filters (`/`).

## 📦 Phase 5: Core Features (The Workflows)

### Application List

- [ ] **Status Indicators:** High-contrast icons.
- [ ] **Compact Mode:** Dense row view.
- [ ] **Bulk Actions:** Sync/Delete multiple apps.

### Application Details

- [ ] **Live Manifest Viewer:** Read-only Monaco/CodeMirror editor with syntax highlighting.
- [ ] **Diff Viewer:**
  - [ ] Split view (Live vs. Desired).
  - [ ] Ignore fields functionality (hide `managedFields` clutter).

### Logs & Terminal

- [ ] **Streaming Logs:** WebSocket connection.
- [ ] **Shell Access:** Exec into pods.

## 🎨 Phase 6: Nice to Haves (Polish)

- [ ] **Resource Timeline:** A visual history of resource changes/events (Deployment scaled -> Pod created -> Pod Error).
- [ ] **"Focus" Mode:** Hide sidebars.
- [ ] **Deep Linking:** URL parameters for everything.
- [ ] **Multi-Cluster Dashboard.**
