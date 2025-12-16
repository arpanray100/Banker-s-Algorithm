let resourceCount = 3; // Default A, B, C

function initTable() {
    const resInput = document.getElementById('totalResources').value.trim().split(/\s+/);
    resourceCount = resInput.length;
    
    // Build Header
    const thead = document.getElementById('tableHead');
    thead.innerHTML = '<th>Process</th>';
    
    // Allocation Headers
    let allocH = '';
    for(let i=0; i<resourceCount; i++) allocH += `R${i+1} `;
    thead.innerHTML += `<th class="table-primary">Allocation (${allocH})</th>`;

    // Max Headers
    let maxH = '';
    for(let i=0; i<resourceCount; i++) maxH += `R${i+1} `;
    thead.innerHTML += `<th class="table-warning">Max (${maxH})</th>`;
    
    thead.innerHTML += '<th>Action</th>';
    document.getElementById('tableBody').innerHTML = '';
    addProcessRow(); // Add one default row
}

function addProcessRow(pName = null, alloc = [], max = []) {
    const tbody = document.getElementById('tableBody');
    const idx = tbody.children.length;
    const name = pName || `P${idx}`;
    
    const tr = document.createElement('tr');
    
    // Process Name
    let html = `<td><input class="form-control form-control-sm" value="${name}" readonly></td>`;
    
    // Allocation Inputs
    html += '<td class="table-primary"><div class="d-flex gap-1 justify-content-center">';
    for(let i=0; i<resourceCount; i++) {
        html += `<input type="number" class="form-control form-control-sm alloc" value="${alloc[i] !== undefined ? alloc[i] : 0}">`;
    }
    html += '</div></td>';

    // Max Inputs
    html += '<td class="table-warning"><div class="d-flex gap-1 justify-content-center">';
    for(let i=0; i<resourceCount; i++) {
        html += `<input type="number" class="form-control form-control-sm max" value="${max[i] !== undefined ? max[i] : 0}">`;
    }
    html += '</div></td>';
    
    // Delete Button
    html += `<td><button class="btn btn-outline-danger btn-sm" onclick="this.closest('tr').remove()">×</button></td>`;
    
    tr.innerHTML = html;
    tbody.appendChild(tr);
}

function loadDemo() {
    document.getElementById('totalResources').value = "10 5 7";
    initTable();
    document.getElementById('tableBody').innerHTML = ''; // Clear default
    // Standard Banker's Demo Data
    addProcessRow('P0', [0,1,0], [7,5,3]);
    addProcessRow('P1', [2,0,0], [3,2,2]);
    addProcessRow('P2', [3,0,2], [9,0,2]);
    addProcessRow('P3', [2,1,1], [2,2,2]);
    addProcessRow('P4', [0,0,2], [4,3,3]);
}

function calculateSafety() {
    const totalRes = document.getElementById('totalResources').value.trim().split(/\s+/).map(Number);
    const rows = document.querySelectorAll('#tableBody tr');
    
    let allocation = [];
    let max = [];
    let need = [];
    let finish = [];
    let processes = [];
    
    // 1. Parse Data
    rows.forEach((row, i) => {
        processes.push(row.querySelector('input').value);
        
        const allocInputs = row.querySelectorAll('.alloc');
        const maxInputs = row.querySelectorAll('.max');
        
        let aRow = [];
        let mRow = [];
        let nRow = [];
        
        allocInputs.forEach((inp, j) => {
            let a = Number(inp.value);
            let m = Number(maxInputs[j].value);
            aRow.push(a);
            mRow.push(m);
            nRow.push(m - a); // Calculate Need
        });
        
        allocation.push(aRow);
        max.push(mRow);
        need.push(nRow);
        finish.push(false);
    });

    // 2. Calculate Available = Total - Sum(Allocated)
    let available = [...totalRes];
    for(let j=0; j<resourceCount; j++) {
        let sumAlloc = 0;
        for(let i=0; i<rows.length; i++) {
            sumAlloc += allocation[i][j];
        }
        available[j] = available[j] - sumAlloc;
    }

    // 3. Safety Algorithm
    let work = [...available];
    let safeSeq = [];
    let logHtml = "";
    
    logHtml += `<div class="log-step text-warning">Initial Available Resources: [ ${work.join(', ')} ]</div>`;

    let count = 0;
    while (count < processes.length) {
        let found = false;
        for (let i = 0; i < processes.length; i++) {
            if (!finish[i]) {
                // Check if Need <= Work
                let possible = true;
                for (let j = 0; j < resourceCount; j++) {
                    if (need[i][j] > work[j]) {
                        possible = false;
                        break;
                    }
                }
                
                if (possible) {
                    // Execute Process
                    for (let k = 0; k < resourceCount; k++) {
                        work[k] += allocation[i][k];
                    }
                    safeSeq.push(processes[i]);
                    finish[i] = true;
                    found = true;
                    count++;
                    logHtml += `<div class="log-step text-success">✔ ${processes[i]} executed. New Available: [ ${work.join(', ')} ]</div>`;
                }
            }
        }
        if (!found) break; // Deadlock detected
    }

    // 4. Output
    const resCard = document.getElementById('resultCard');
    const statusMsg = document.getElementById('statusMessage');
    resCard.style.display = 'block';
    document.getElementById('logArea').innerHTML = logHtml;

    if (count < processes.length) {
        statusMsg.className = "alert alert-danger fw-bold";
        statusMsg.innerHTML = "❌ Unsafe State! Deadlock Detected.";
    } else {
        statusMsg.className = "alert alert-success fw-bold";
        statusMsg.innerHTML = `✅ Safe Sequence: ${safeSeq.join(' ➔ ')}`;
    }
    
    // Render Need Table
    let needHtml = "<thead><tr><th>Process</th><th>Need Vector</th></tr></thead><tbody>";
    processes.forEach((p, i) => {
        needHtml += `<tr><td>${p}</td><td>[ ${need[i].join(', ')} ]</td></tr>`;
    });
    needHtml += "</tbody>";
    document.getElementById('needTable').innerHTML = needHtml;
}

// Init
window.onload = () => { initTable(); };