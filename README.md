# Banker's Algorithm Visualization Tool

## 📌 Project Description
An interactive web tool visualizing the Banker's Algorithm for Operating System Deadlock Avoidance. Built with HTML, CSS, and JavaScript, it calculates the **Need Matrix** and simulates resource allocation to detect **Safe Sequences** or **Deadlocks**. It provides a step-by-step execution log to help users understand system safety and resource management concepts.

## 🚀 Features
* **Dynamic Configuration:** Set custom total resources and add/remove multiple processes.
* **Automatic Calculation:** Instantly computes the *Need Matrix* based on Allocation and Max inputs.
* **Step-by-Step Visualization:** Shows exactly which process executes and how *Available* resources change.
* **Deadlock Detection:** Clearly flags **Safe States** (Green) and **Unsafe States** (Red).
* **Responsive Design:** Clean, bootstrap-based UI that works on desktop and mobile.

## 📂 File Structure
* `index.html` - The main user interface and structure.
* `style.css` - Styling for the table, buttons, and layout.
* `script.js` - Contains the Banker's Algorithm logic and DOM manipulation.

## 🛠️ Technologies Used
* **HTML5**
* **CSS3** (Bootstrap 5.3)
* **JavaScript** (ES6)

## 📖 How to Run
1.  Download the three files: `index.html`, `style.css`, and `script.js`.
2.  Place them in the same folder.
3.  Double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox, etc.).

## 🧪 How to Use
1.  **Configure Resources:** Enter the total system resources at the top (e.g., `10 5 7`).
2.  **Add Processes:** Click "+ Add Process" to create rows.
3.  **Enter Data:** Fill in the **Allocation** and **Max** values for each process.
4.  **Calculate:** Click "Calculate Safe Sequence".
5.  **View Results:** Check the log to see the order of execution or if a deadlock occurred.

### Quick Test (Demo Mode)
You can click the **"Load Demo"** button to instantly fill the table with a standard "Safe State" scenario:
* **Total Resources:** `10 5 7`
* **P1:** Alloc `0 1 0` | Max `7 5 3`
* **Result:** Safe Sequence found (e.g., `P1 ➔ P3 ➔ P4 ➔ P0 ➔ P2`).

## ⚠️ Common Scenarios
1.  **Safe State:** The algorithm finds a sequence to finish all processes.
2.  **Unsafe State:** The algorithm stops because available resources are insufficient for any process (Potential Deadlock).
3.  **Invalid Input:** If `Allocation > Max`, the result may be invalid. Ensure Max is always greater than or equal to Allocation.

---
**Academic Project | 2025-2026**
