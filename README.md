# TrustDNA 🛡️

TrustDNA is a comprehensive cybersecurity platform designed to protect users from modern digital threats. Built with React and Tailwind CSS, it offers a seamless and responsive dashboard for real-time threat monitoring and mitigation.

## 🚀 Features

- **🛡️ Threat Registry:** Keep track of the latest identified threats, malware, and vulnerabilities.
- **🚨 Scam Detection:** Identify potential phishing attempts, malicious links, and fraudulent activities.
- **🧠 Behavioral Auth:** Advanced user authentication based on behavioral patterns and anomalies.
- **📱 APK Scanner:** Upload and scan Android applications (.apk) for hidden malware or suspicious permissions.

## 🛠️ Technologies Used

- **Frontend Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (animations)
- **Routing:** [React Router](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 💻 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd TrustDNA
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(This will read `package.json` and install all required packages so you won't have any missing dependency issues!)*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to the local URL provided in your terminal (typically `http://localhost:5173`).

## 📁 Project Structure

- `src/pages/`: Contains the main application views (Dashboard, ThreatRegistry, ScamDetection, BehavioralAuth, APKScanner).
- `src/components/`: (If applicable) Reusable UI components.
- `src/index.css` & `src/App.jsx`: Core setup and routing logic.
- `public/`: Static assets like images or placeholder files (e.g., sample APKs).

## 📄 License

This project is open-source and available for the hackathon team!
