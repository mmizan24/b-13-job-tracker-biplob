// ===============================
// ARRAYS TO STORE JOB STATES
// ===============================
let interviewList = [];
let rejectedList = [];

// ===============================
// DOM ELEMENTS
// ===============================
const totalNum = document.getElementById('total-num');
const interviewNum = document.getElementById('interview-num');
const rejectedNum = document.getElementById('rejected-num');
const availableJobsCount = document.getElementById('available-jobs-count');

const allJobSection = document.getElementById('alljobs');
const filteredSection = document.getElementById('filtered-section');

const allBtn = document.getElementById('btn-all');
const interviewBtn = document.getElementById('btn-interview');
const rejectedBtn = document.getElementById('btn-rejected');

// ===============================
// CALCULATE COUNTS
// ===============================
function calculateCount() {
    const allJobs = document.querySelectorAll('#alljobs .job-card');
    const interviewJobs=document.querySelectorAll('#alljobs .job-card');
    const rejectedJobs=document.querySelectorAll('#alljobs .job-card');
  
    const totalJobs = allJobs.length;
   

    if (totalNum) totalNum.innerText = totalJobs;
    if (availableJobsCount) {
        availableJobsCount.innerHTML = `${totalJobs} <span> of 8 jobs</span>`;
    }

    if (interviewNum) interviewNum.innerText = interviewList.length;
    

    if (rejectedNum) rejectedNum.innerText = rejectedList.length;
    
}

// ===============================
// DELETE FUNCTION
// ===============================
function handleDelete(button) {
    const jobCard = button.closest('.job-card');
    if (!jobCard) return;

    const company = jobCard.querySelector('.company')?.innerText;

    jobCard.remove();

    interviewList = interviewList.filter(job => job.company !== company);
    rejectedList = rejectedList.filter(job => job.company !== company);

    calculateCount();

    // Refresh filtered view if needed
    if (allJobSection.classList.contains('hidden')) {
        if (interviewBtn.classList.contains('bg-blue-600')) {
            renderFilteredJobs('interview');
        } else if (rejectedBtn.classList.contains('bg-blue-600')) {
            renderFilteredJobs('rejected');
        }
    }
}

// ===============================
// GLOBAL CLICK LISTENER
// ===============================
document.addEventListener('click', function (event) {

    const deleteBtn = event.target.closest('.delete-btn');
    const interviewBtnClick = event.target.closest('.interview-btn');
    const rejectBtnClick = event.target.closest('.reject-btn');

    // ---------------------------
    // DELETE
    // ---------------------------
    if (deleteBtn) {
        handleDelete(deleteBtn);
        return;
    }

    // ---------------------------
    // INTERVIEW BTN Fuction
    // ---------------------------
    if (interviewBtnClick) {
        const jobCard = interviewBtnClick.closest('.job-card');
        if (!jobCard) return;

        const company = jobCard.querySelector('.company')?.innerText || 'Unknown';
        const skills = jobCard.querySelector('.skills')?.innerText || '';
        const notes = jobCard.querySelector('.notes')?.innerText || '';
        const jobpattern = jobCard.querySelector('.job-pattern')?.innerText || '';
        const jobtime = jobCard.querySelector('.job-time')?.innerText || '';
        const salary=jobCard.querySelector('.salary-range')?.innerText || '';

        // Update status badge
        const statusText = jobCard.querySelector('.status-text');
        if (statusText) statusText.innerText = 'INTERVIEW';

        // Prevent duplicate
        if (!interviewList.some(job => job.company === company)) {
            interviewList.push({ company, skills, notes ,jobpattern ,jobtime ,salary });
        }

        // Remove from rejected if exists
        rejectedList = rejectedList.filter(job => job.company !== company);

      

        if (interviewBtn.classList.contains('bg-blue-600')) {
            renderFilteredJobs('interview');
        }
          calculateCount();

        return;
    }

    // ---------------------------
    // REJECTED Btn Function 
    // ---------------------------
    if (rejectBtnClick) {
        const jobCard = rejectBtnClick.closest('.job-card');
        if (!jobCard) return;

        const company = jobCard.querySelector('.company')?.innerText || 'Unknown';
        const skills = jobCard.querySelector('.skills')?.innerText || '';
         
        const notes = jobCard.querySelector('.notes')?.innerText || '';

        const jobpattern = jobCard.querySelector('.job-pattern')?.innerText || '';
        const jobtime = jobCard.querySelector('.job-time')?.innerText || '';
        const salary=jobCard.querySelector('.salary-range')?.innerText || '';



        const statusText = jobCard.querySelector('.status-text');
        if (statusText) statusText.innerText = 'REJECTED';

        if (!rejectedList.some(job => job.company === company)) {
            rejectedList.push({ company, skills, notes, jobpattern, jobtime, salary});
        }

        interviewList = interviewList.filter(job => job.company !== company);

         calculateCount();

        if (rejectedBtn.classList.contains('bg-blue-600')) {
            renderFilteredJobs('rejected');
        }

        return;
    }
});

// ===============================
// RENDER FILTERED JOBS
// ===============================
function renderFilteredJobs(type) {

    filteredSection.innerHTML = '';

    const list = type === 'interview' ? interviewList : rejectedList;

    const statusText = type === 'interview' ? 'INTERVIEW' : 'REJECTED';
    const bgColor = type === 'interview'
        ? 'bg-green-100 text-green-600'
        : 'bg-red-100 text-red-600';

    if (list.length === 0) {
        filteredSection.innerHTML = `
            <div class="card bg-base-100 h-64 w-full shadow-sm flex justify-center items-center p-10">
                <div class="text-center">
                    <div class="text-6xl mb-4">📋</div>
                    <h2 class="text-xl font-bold">No ${statusText} Jobs</h2>
                    <p class="text-gray-500">No jobs marked as ${statusText}</p>
                </div>
            </div>
        `;
        return;
    }

    list.forEach(job => {

        const div = document.createElement('div');
        div.className = 'job-card mb-5';

        div.innerHTML = `
<section class="job-card">
    <div class="space-y-4">
        <div class="w-full bg-white dark:bg-slate-900 
        border border-slate-200 dark:border-slate-800 
        p-6 rounded-xl shadow-sm relative transition-shadow hover:shadow-md">

            <div class="flex justify-between">
                <div>
                    <h2 class="text-xl font-bold text-slate-900 dark:text-white company">
                        ${job.company}
                    </h2>

                    <p class="text-slate-600 dark:text-slate-400 font-medium mb-2 skills">
                        ${job.skills}
                    </p>

                    <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-500 mb-4">
                                    <span class="flex items-center gap-1 job-pattern">${job.jobpattern}</span>
                                    <span class="flex items-center gap-1 job-time">${job.jobtime}</span>
                                    <span class="flex items-center gap-1 salary-range">${job.salary}</span>
                                </div>

                    <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 notes">
                        ${job.notes}
                    </p>
                </div>

                <div class="flex gap-3 items-center">
                    <button class="px-4 py-2 text-sm font-bold 
                    border-2 border-gray-500 text-gray-600 
                    dark:text-gray-400 rounded-lg 
                    hover:bg-gray-50 dark:hover:bg-gray-950/30 
                    transition-colors delete-btn">
                        DELETE
                    </button>
                </div>
            </div>

            <div class="inline-flex items-center px-2.5 py-0.5 rounded-md 
            text-xs font-semibold ${bgColor} mb-4">
                <span class="status-text">${statusText}</span>
            </div>

            <div class="flex gap-3">
                <button class="px-4 py-2 text-sm font-bold 
                border-2 border-green-500 text-green-600 
                dark:text-green-400 rounded-lg 
                hover:bg-green-50 dark:hover:bg-green-950/30 
                transition-colors interview-btn">
                    INTERVIEW
                </button>

                <button class="px-4 py-2 text-sm font-bold 
                border-2 border-red-500 text-red-600 
                dark:text-red-400 rounded-lg 
                hover:bg-red-50 dark:hover:bg-red-950/30 
                transition-colors reject-btn">
                    REJECTED
                </button>
            </div>

        </div>
    </div>
</section>
`;

        ;

        filteredSection.appendChild(div);
    });
}

// ===============================
// TAB TOGGLE
// ===============================
function toggleStyle(id) {

    const buttons = [allBtn, interviewBtn, rejectedBtn];

    buttons.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-black');
    });

    const activeBtn = document.getElementById(id);

    activeBtn.classList.remove('bg-gray-200', 'text-black');
    activeBtn.classList.add('bg-blue-600', 'text-white');

    // TAB SWITCHING
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
    }

    calculateCount();

//     if (id === 'btn-interview') {

//     allJobSection.classList.add('hidden');
//     filteredSection.classList.remove('hidden');

//     availableJobsCount.innerHTML = `${interviewList.length} <span>jobs</span>`;

//     renderFilteredJobs('interview');

// } 
// else if (id === 'btn-rejected') {

//     allJobSection.classList.add('hidden');
//     filteredSection.classList.remove('hidden');

//     availableJobsCount.innerHTML = `${rejectedList.length} <span>jobs</span>`;

//     renderFilteredJobs('rejected');

// } 
// else {

//     allJobSection.classList.remove('hidden');
//     filteredSection.classList.add('hidden');

//     const totalJobs = document.querySelectorAll('#alljobs .job-card').length;
//     availableJobsCount.innerHTML = `${totalJobs} <span>jobs</span>`;

//     calculateCount();
}

    // [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
    //     btn.classList.remove('bg-blue-600', 'text-white');
    //     btn.classList.add('bg-gray-200', 'text-black');
    // });

    // const selected = document.getElementById(id);
    // selected.classList.remove('bg-gray-200', 'text-black');
    // selected.classList.add('bg-blue-600', 'text-white');

    // if (id === 'btn-interview') {
    //     allJobSection.classList.add('hidden');
    //     filteredSection.classList.remove('hidden');
    //     renderFilteredJobs('interview');

    // } else if (id === 'btn-rejected') {
    //     allJobSection.classList.add('hidden');
    //     filteredSection.classList.remove('hidden');
    //     renderFilteredJobs('rejected');

    // } else {
    //     allJobSection.classList.remove('hidden');
    //     filteredSection.classList.add('hidden');
    //     calculateCount();
    //}


// ===============================
// INIT
// ===============================
window.addEventListener('load', function () {
    toggleStyle('btn-all'); // default selected tab
    calculateCount();
});