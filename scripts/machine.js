// function getTransferFromAll(id){
//     const restore=document.getElementById(id);
//     const value=restore.innerText
//     console.log(id,value);
//     return value;
// }


//  another option .for btn toggleing ........................................

// const container = document.getElementById('button-container');

// container.addEventListener('click', (e) => {
//   // 1. Ensure we only act if a button was clicked
//   const clickedBtn = e.target.closest('button');
//   if (!clickedBtn) return;

//   // 2. Find the one button that currently has the active classes
//   const currentActive = container.querySelector('.bg-blue-600');

//   // 3. Swap classes between the old active and the new clicked button
//   if (currentActive) {
//     currentActive.classList.replace('bg-blue-600', 'text-gray-600');
//     currentActive.classList.remove('text-white');
//   }

//   clickedBtn.classList.replace('text-gray-600', 'bg-blue-600');
//   clickedBtn.classList.add('text-white');
// });

// const interOneBtn = document.getElementById('btn-inter-one');
// const firstJobSection = document.getElementById('first-job');

// interOneBtn.addEventListener('click', () => {
//   // This adds 'hidden' if it's missing, or removes it if it's there
//   firstJobSection.classList.add('hidden'); 

//   // Logic Tip: If you want it to reappear on a second click, use .toggle()
//   // firstJobSection.classList.toggle('hidden');
// });

// btn --toggling end here .........................................................



// Initialize arrays to store interview and rejected jobs
let interveiwList = [];
let rejectedList = [];

// Get DOM elements for counters
const totalNum = document.getElementById('total-num');
const interviewNum = document.getElementById('interview-num');
const rejectedNum = document.getElementById('rejected-num');
const availableJobsCount = document.getElementById('available-jobs-count');

const allJobSection = document.getElementById('alljobs');
const filteredSection = document.getElementById('filtered-section');

// Get tab buttons
const allBtn = document.getElementById('btn-all');
const interveiwBtn = document.getElementById('btn-interview');
const rejectedBtn = document.getElementById('btn-rejected');

// Calculate and update all counts
function calculateCount() {
    // Get all job cards - using reliable selector
    const allJobs = document.querySelectorAll('#alljobs .job-card');
    const totalJobs = allJobs.length;
    
    console.log('Total jobs found:', totalJobs); // Debug log
    
    // Update total applications count
    if (totalNum) {
        totalNum.innerText = totalJobs;
    }
    
    // Update available jobs count
    if (availableJobsCount) {
        availableJobsCount.innerHTML = `${totalJobs} <span>jobs</span>`;
    }
    
    // Update interview count
    if (interviewNum) {
        interviewNum.innerText = interveiwList.length;
    }
    
    // Update rejected count
    if (rejectedNum) {
        rejectedNum.innerText = rejectedList.length;
    }
}

// Call calculateCount on page load
window.addEventListener('load', function() {
    calculateCount();
});

// Function to handle delete
function handleDelete(button) {
    // Find the parent job card
    const jobCard = button.closest('.job-card');
    
    if (jobCard) {
        // Get company name to remove from lists
        const companyName = jobCard.querySelector('.company')?.innerText;
        
        // Remove from DOM
        jobCard.remove();
        
        // Remove from interview list if present
        if (companyName) {
            interveiwList = interveiwList.filter(item => item.company !== companyName);
            rejectedList = rejectedList.filter(item => item.company !== companyName);
        }
        
        // Update all counts
        calculateCount();
        
        // If on filtered tab, refresh the view
        if (allJobSection.classList.contains('hidden')) {
            if (interveiwBtn.classList.contains('bg-blue-600')) {
                renderFilteredJobs('interview');
            } else if (rejectedBtn.classList.contains('bg-blue-600')) {
                renderFilteredJobs('rejected');
            }
        }
    }
}

// Add click event listeners to all delete buttons
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Check if delete button was clicked
    if (target.classList.contains('delete-btn') || 
        target.closest('.delete-btn') ||
        (target.tagName === 'BUTTON' && target.textContent.includes('DELETE')) ||
        (target.classList.contains('material-icons-outlined') && target.textContent === 'delete')) {
        
        event.preventDefault();
        const deleteBtn = target.closest('.delete-btn') || target;
        handleDelete(deleteBtn);
    }
    
    // Handle interview button clicks
    if (target.classList.contains('interview-btn') || 
        target.closest('.interview-btn') ||
        target.classList.contains('btnInterveiw')) {
        
        event.preventDefault();
        const jobCard = target.closest('.job-card');
        
        if (jobCard) {
            const company = jobCard.querySelector('.company')?.innerText || 'Unknown';
            const skills = jobCard.querySelector('.skills')?.innerText || 'Unknown';
            
            // Update status badge
            const statusBadge = jobCard.querySelector('.status-text');
            if (statusBadge) {
                statusBadge.innerText = 'INTERVIEW';
            }
            
            // Add to interview list
            const jobExists = interveiwList.some(item => item.company === company);
            if (!jobExists) {
                interveiwList.push({ company, skills });
                rejectedList = rejectedList.filter(item => item.company !== company);
            }
            
            calculateCount();
            
            if (interveiwBtn.classList.contains('bg-blue-600')) {
                renderFilteredJobs('interview');
            }
        }
    }
    
    // Handle reject button clicks
    if (target.classList.contains('reject-btn') || 
        target.closest('.reject-btn') ||
        target.classList.contains('btnRejected')) {
        
        event.preventDefault();
        const jobCard = target.closest('.job-card');
        
        if (jobCard) {
            const company = jobCard.querySelector('.company')?.innerText || 'Unknown';
            const skills = jobCard.querySelector('.skills')?.innerText || 'Unknown';
            
            // Update status badge
            const statusBadge = jobCard.querySelector('.status-text');
            if (statusBadge) {
                statusBadge.innerText = 'REJECTED';
            }
            
            // Add to rejected list
            const jobExists = rejectedList.some(item => item.company === company);
            if (!jobExists) {
                rejectedList.push({ company, skills });
                interveiwList = interveiwList.filter(item => item.company !== company);
            }
            
            calculateCount();
            
            if (rejectedBtn.classList.contains('bg-blue-600')) {
                renderFilteredJobs('rejected');
            }
        }
    }
});

// Render filtered jobs
function renderFilteredJobs(type) {
    filteredSection.innerHTML = '';
    
    const list = type === 'interview' ? interveiwList : rejectedList;
    const statusText = type === 'interview' ? 'INTERVIEW' : 'REJECTED';
    const bgColor = type === 'interview' ? 'bg-green-100' : 'bg-red-100';
    const textColor = type === 'interview' ? 'text-green-600' : 'text-red-600';
    
    if (list.length === 0) {
        filteredSection.innerHTML = `
            <div class="card bg-base-100 h-64 w-full shadow-sm flex justify-center items-center p-10">
                <div class="text-center">
                    <div class="text-6xl mb-4">📋</div>
                    <h2 class="text-xl font-bold mt-4">No ${type} Jobs</h2>
                    <p class="text-gray-500">No jobs have been marked as ${type}</p>
                </div>
            </div>
        `;
    } else {
        list.forEach(job => {
            const div = document.createElement('div');
            div.className = 'job-card mb-5';
            div.innerHTML = `
                <div class="space-y-4">
                    <div class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
                        <div class="flex justify-between">
                            <div>
                                <h2 class="text-xl font-bold text-slate-900 company">${job.company}</h2>
                                <p class="text-slate-600 font-medium mb-2 skills">${job.skills}</p>
                            </div>
                            <button class="px-4 py-2 text-sm font-bold border-2 border-gray-500 text-gray-600 rounded-lg delete-btn">
                                <span class="flex items-center gap-1">
                                    <span class="material-icons-outlined text-sm">delete</span> DELETE
                                </span>
                            </button>
                        </div>
                        <div class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${bgColor} ${textColor} mb-4">
                            <span class="status-text">${statusText}</span>
                        </div>
                        <div class="flex gap-3">
                            <button class="px-4 py-2 text-sm font-bold border-2 border-green-500 text-green-600 rounded-lg interview-btn">INTERVIEW</button>
                            <button class="px-4 py-2 text-sm font-bold border-2 border-red-500 text-red-600 rounded-lg reject-btn">REJECTED</button>
                        </div>
                    </div>
                </div>
            `;
            filteredSection.appendChild(div);
        });
    }
}

// Toggle tab styles
function toggleStyle(id) {
    // Remove active styles from all buttons
    [allBtn, interveiwBtn, rejectedBtn].forEach(btn => {
        if (btn) {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-black');
        }
    });

    // Add active style to selected button
    const selected = document.getElementById(id);
    if (selected) {
        selected.classList.remove('bg-gray-200', 'text-black');
        selected.classList.add('bg-blue-600', 'text-white');
    }

    // Show/hide sections based on selected tab
    if (id === 'btn-interview') {
        allJobSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        renderFilteredJobs('interview');
    } else if (id === 'btn-rejected') {
        allJobSection.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        renderFilteredJobs('rejected');
    } else {
        allJobSection.classList.remove('hidden');
        filteredSection.classList.add('hidden');
        // Recalculate counts when switching back to All tab
        calculateCount();
    }
}

// Update counts every second as backup (optional, can be removed if not needed)
// setInterval(calculateCount, 1000);`