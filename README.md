


---

## Live Demo

**Live Site:** [https://Sajini2.github.io/WeatherApp_Devops/]
(https://Sajini2.github.io/WeatherApp_Devops/)

---



## Team Information 

| Role | Name | Student ID |
|------|------|------------|
| **DevOps Engineer** | H.M.B. Janadari | ITBIN-2313-0043 |
| **Full-Stack Developer** | M.P.G. Sajini Sawindhya Medaela | ITBIN-2313-0064 |



# Weather Dashboard

![CI Pipeline](https://github.com/Sajini2/WeatherApp_Devops/workflows/CI%20Pipeline/badge.svg)
![Deploy](https://github.com/Sajini2/WeatherApp_Devops/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

> **A professional weather dashboard application with real-time weather data and 5-day forecast**





# BEGINNERS GUIDE

## Table of Contents

1. [What is This Project?](#1-what-is-this-project)
2. [Download & Run Locally](#2-download--run-locally)
3. [Deploy to GitHub Pages](#3-deploy-to-github-pages)
4. [Understanding GitHub Actions & Workflows](#4-understanding-github-actions--workflows)
5. [Adding Team Members (Collaborators)](#5-adding-team-members-collaborators)
6. [How Team Members Contribute](#6-how-team-members-contribute)
7. [Creating Pull Requests](#7-creating-pull-requests)
8. [Merging Pull Requests](#8-merging-pull-requests)
9. [Branch Strategy Explained](#9-branch-strategy-explained)

---

# 1. What is This Project?

A **Weather Dashboard** web application that:
- Search weather for any city
- Shows current temperature
- Displays 5-day forecast
- Saves recent searches

---

# 2. Download & Run Locally

## Step 1: Install Required Software

Before starting, install these (FREE):
- **Git:** [Download Here](https://git-scm.com/downloads)
- **Node.js:** [Download Here](https://nodejs.org/)
- **VS Code:** [Download Here](https://code.visualstudio.com/)

## Step 2: Clone (Download) the Project

Open **Terminal** or **Command Prompt** and run:

```bash
git clone https://github.com/Sajini2/WeatherApp_Devops.git
```

## Step 3: Go to Project Folder

```bash
cd WeatherApp_Devops
```

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run the Project

```bash
npm run dev
```

## Step 6: Open in Browser

Go to: **http://localhost:3000**

**Done!** You should see the Weather Dashboard!

---

# 3. Deploy to GitHub Pages

## What is Deployment?
Making your website **live on the internet** so anyone can access it!

## Step-by-Step:

### Step 1: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name: `weather-dashboard`
3. Select: **Public**
4. Click: **Create repository**

### Step 2: Push Your Code
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, click dropdown
5. Select **GitHub Actions**
6. Click **Static HTML**
7. Click **Commit changes**

### Step 4: Wait 2-3 Minutes
- Go to **Actions** tab
- Wait for green checkmark (Success)
- Your site is LIVE!

### Step 5: Get Your URL
```
https://YOUR_USERNAME.github.io/your-repo-name/
```

---

# 4. Understanding GitHub Actions & Workflows

## What is a Workflow?
An **automatic task** that runs when you push code.

## Example:
```
You push code → GitHub detects it → Runs tests → Deploys website
```

## Our Workflows:

| File | What It Does |
|------|--------------|
| `ci.yml` | Tests and builds code |
| `static.yml` | Deploys to GitHub Pages |

## Where are Workflow Files?
```
.github/
  └── workflows/
      ├── ci.yml        ← Testing
      └── static.yml    ← Deployment
```

## How to Check if Workflow Worked:
1. Go to your repo
2. Click **Actions** tab
3. Look for:
   - Green = Success
   - Yellow = Running
   - Red = Failed

---

# 5. Adding Team Members (Collaborators)

## What is a Collaborator?
A team member who can **edit** your repository.

## Step-by-Step:

### Step 1: Go to Repository Settings
1. Open your GitHub repository
2. Click **Settings** (top right)

### Step 2: Find Collaborators
1. Click **Collaborators** (left sidebar)
2. You may need to enter your password

### Step 3: Add Team Member
1. Click **Add people**
2. Enter their **GitHub username**
3. Click **Add [username] to this repository**

### Step 4: Team Member Accepts
1. They receive an **email**
2. They click **"View invitation"**
3. They click **"Accept invitation"**

**Done!** They can now contribute!

---

# 6. How Team Members Contribute

## Step-by-Step for Team Members:

### Step 1: Accept Invitation
Check your email and click **Accept invitation**

### Step 2: Clone the Repository
```bash
git clone https://github.com/OWNER_USERNAME/repo-name.git
cd repo-name
```

### Step 3: Create Your Own Branch
```bash
git checkout -b feature/your-name
```
Example:
```bash
git checkout -b feature/sajini-backend
```

### Step 4: Make Changes
Edit any file. Example: Add your name as comment:
```javascript
// Developer: Your Name
```

### Step 5: Save and Commit
```bash
git add .
git commit -m "feat: add my contribution"
```

### Step 6: Push Your Branch
```bash
git push origin feature/your-name
```

### Step 7: Create Pull Request
See next section!

---

# 7. Creating Pull Requests

## What is a Pull Request (PR)?
A **request** to merge your code into the main project.

## Step-by-Step:

### Step 1: Push Your Branch First
```bash
git push origin feature/your-branch-name
```

### Step 2: Go to GitHub
Open the repository in your browser

### Step 3: You'll See a Yellow Banner
```
┌─────────────────────────────────────────────────┐
│ feature/your-name had recent pushes             │
│                    [Compare & pull request]     │
└─────────────────────────────────────────────────┘
```
Click **"Compare & pull request"**

### Step 4: Fill in PR Details
- **Title:** Short description (e.g., "Add backend feature")
- **Description:** What you changed

### Step 5: Click "Create pull request"

**Done!** The owner will review and merge your code!

---

# 8. Merging Pull Requests

## Who Can Merge?
The **repository owner** or collaborators with permission.

## Step-by-Step for Owner:

### Step 1: Go to Pull Requests Tab
Click **"Pull requests"** in your repository

### Step 2: Click on the PR
Select the pull request you want to merge

### Step 3: Review the Changes
- Click **"Files changed"** to see what changed
- Make sure it looks correct

### Step 4: Merge
1. Click **"Merge pull request"** (green button)
2. Click **"Confirm merge"**

### Step 5: (Optional) Delete Branch
Click **"Delete branch"** to clean up

**Done!** The code is now in main branch!

---

# 9. Branch Strategy Explained

## What is a Branch?
A **separate copy** of code where you can make changes without affecting the main project.

## Our Branch Structure:

```
main (production - live website)
  ↑
  └── feature/sanjani-backend
  └── feature/pavithra-frontend
  └── feature/manoj-devops
```

## Branch Types:

| Branch | Purpose |
|--------|---------|
| `main` | Live production code |
| `develop` | Testing before going live |
| `feature/*` | Individual work |

## How It Works:

```
1. Create feature branch
2. Make your changes
3. Push your branch
4. Create Pull Request
5. Get it reviewed
6. Merge to main
7. Website updates automatically!
```

---

# Project Structure

```
project/
├── .github/workflows/     ← GitHub Actions
│   ├── ci.yml
│   └── static.yml
├── src/                   ← Source Code
│   ├── index.html
│   ├── styles/main.css
│   └── scripts/
│       ├── app.js
│       ├── ui.js
│       └── weather-api.js
├── package.json           ← NPM Config
└── README.md             ← This File
```

---

# Individual Contributions

### H.M.B. Janadari (DevOps Engineer)
- Repository setup and configuration
- GitHub Actions CI/CD pipeline implementation
- Deployment setup and management
- Branch protection rules

### M.P.G. Sajini Sawindhya Medaela (Full-Stack Developer)
- Weather API integration
- Frontend UI/UX implementation
- Data fetching and error handling
- Responsive styling and documentation

---

# Common Problems & Solutions

| Problem | Solution |
|---------|----------|
| `npm install` fails | Run `npm cache clean --force` then try again |
| Can't push to main | Create a feature branch first |
| Workflow failed | Check Actions tab for error message |
| Site not updating | Wait 2-3 minutes, then refresh |

---

# Useful Resources

- [Git Basics](https://learngitbranching.js.org/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Markdown Guide](https://www.markdownguide.org/)

---

<div align="center">

## Weather Dashboard Team

**Buddhika Janadari** & **Sajini Savindya**



## 🐳 Docker Setup

### Prerequisites
- Docker installed: https://www.docker.com/get-started
- Docker Compose installed
- 
### Build and Run
# Build and start the container
docker compose up --build

# Visit the app
http://localhost:8080

# Stop the container
docker compose down

### Docker Commands
# Build image only
docker build -t weather-dashboard 

# Check image size
docker images

# Check running containers
docker ps


</div>
