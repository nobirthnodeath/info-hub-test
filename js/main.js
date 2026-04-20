const initiatives = [
  {
    id: 'pet-ev-battery',
    type: 'petition',
    title: 'Require safer e-bike battery standards',
    description: 'Urge federal regulators to adopt stronger thermal runaway testing and labeling requirements.',
    participants: '18,400 signatures',
    deadline: 'May 18, 2026',
    status: 'Live'
  },
  {
    id: 'evt-ai-pricing',
    type: 'event',
    title: 'Town Hall: Hidden fees and AI pricing',
    description: 'Virtual event with policy experts and consumer stories on algorithmic price discrimination.',
    participants: '620 RSVPs',
    deadline: 'April 30, 2026',
    status: 'In Progress'
  },
  {
    id: 'iss-pfas-packaging',
    type: 'issue',
    title: 'PFAS in food packaging accountability campaign',
    description: 'Push major retailers to phase out PFAS-lined packaging and publish supplier compliance reports.',
    participants: '34 retailers contacted',
    deadline: 'Q3 2026 target',
    status: 'In Progress'
  },
  {
    id: 'pet-data-privacy',
    type: 'petition',
    title: 'Stop abusive smart device data collection',
    description: 'Ask lawmakers to pass a baseline privacy law that limits secondary use of household data.',
    participants: '26,050 signatures',
    deadline: 'June 14, 2026',
    status: 'Live'
  },
  {
    id: 'evt-recall-alerts',
    type: 'event',
    title: 'Recall Readiness Workshop',
    description: 'In-person training on registering products, setting alerts, and reporting hazardous defects.',
    participants: '240 seats available',
    deadline: 'May 9, 2026',
    status: 'Live'
  },
  {
    id: 'iss-auto-safety',
    type: 'issue',
    title: 'Automatic emergency braking for all vehicles',
    description: 'Advocacy sprint to support adoption timelines and compliance transparency across manufacturers.',
    participants: 'Coalition brief in review',
    deadline: '2026 federal rule window',
    status: 'In Progress'
  }
]

const outcomes = [
  {
    date: 'January 2026',
    title: 'Congressional testimony on junk fees',
    impact: 'CR advocates testified before Senate staff, helping shape draft disclosure language in proposed legislation.',
    resultType: 'Congressional Testimony'
  },
  {
    date: 'October 2025',
    title: 'Major stroller recall expanded',
    impact: 'After public pressure and complaint aggregation, recall scope grew to include an additional 420,000 units.',
    resultType: 'Recall'
  },
  {
    date: 'June 2025',
    title: 'State policy update on data deletion rights',
    impact: 'Campaign coalition secured stronger deletion and opt-out requirements in state privacy law updates.',
    resultType: 'Policy Change'
  },
  {
    date: 'March 2025',
    title: 'Petition delivered with 100K+ signatures',
    impact: 'Consumer petition volume triggered formal regulator response and opened a public comment period.',
    resultType: 'Public Mobilization'
  }
]

const STORAGE_KEY = 'cr-activism-tracker-v1'
let activeFilter = 'all'
let trackerState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')

const initiativeGrid = document.getElementById('initiativeGrid')
const timeline = document.getElementById('outcomeTimeline')
const filterButtons = document.querySelectorAll('.filter-btn')

function statusClass(status) {
  if (status === 'Live') return 'status-live'
  if (status === 'In Progress') return 'status-progress'
  return 'status-closed'
}

function renderInitiatives() {
  const filtered = initiatives.filter((item) => activeFilter === 'all' || item.type === activeFilter)

  initiativeGrid.innerHTML = filtered
    .map((item) => {
      const done = !!trackerState[item.id]
      return `
        <article class="rounded-xl border border-crBorder bg-white shadow-card p-4 flex flex-col gap-4">
          <div class="flex items-start justify-between gap-2">
            <p class="text-xs uppercase tracking-wide text-crSlate">${item.type}</p>
            <span class="status-badge ${statusClass(item.status)}">${item.status}</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold leading-snug">${item.title}</h3>
            <p class="text-sm text-crSlate mt-2">${item.description}</p>
          </div>
          <dl class="space-y-2 text-sm">
            <div class="flex justify-between gap-3"><dt class="text-crSlate">Momentum</dt><dd class="font-medium text-right">${item.participants}</dd></div>
            <div class="flex justify-between gap-3"><dt class="text-crSlate">Timeline</dt><dd class="font-medium text-right">${item.deadline}</dd></div>
          </dl>
          <button data-track-id="${item.id}" class="track-btn mt-auto rounded-md border px-3 py-2 text-sm font-medium ${done ? 'bg-crGreen text-white border-crGreen' : 'bg-white border-crBorder hover:bg-slate-50'}">
            ${done ? 'Completed ✓' : 'Mark as completed'}
          </button>
        </article>
      `
    })
    .join('')

  document.querySelectorAll('.track-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.trackId
      trackerState[id] = !trackerState[id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerState))
      renderInitiatives()
      renderTrackerStats()
    })
  })
}

function renderOutcomes() {
  timeline.innerHTML = outcomes
    .map(
      (item) => `
      <article class="rounded-xl border border-crBorder bg-white p-4 shadow-card">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="font-semibold">${item.title}</h3>
          <span class="text-xs rounded-full border border-crBorder bg-crMist px-3 py-1">${item.resultType}</span>
        </div>
        <p class="text-sm text-crSlate mt-2">${item.impact}</p>
        <p class="text-xs text-crSlate mt-3">${item.date}</p>
      </article>
    `
    )
    .join('')
}

function renderSnapshot() {
  const petitionCount = initiatives.filter((i) => i.type === 'petition').length
  const eventCount = initiatives.filter((i) => i.type === 'event').length
  document.getElementById('openPetitionCount').textContent = petitionCount
  document.getElementById('upcomingEventCount').textContent = eventCount
  document.getElementById('resolvedIssueCount').textContent = outcomes.length
}

function renderTrackerStats() {
  const completedIds = Object.keys(trackerState).filter((key) => trackerState[key])
  const completedItems = initiatives.filter((item) => completedIds.includes(item.id))

  document.getElementById('completedActions').textContent = completedItems.length
  document.getElementById('signedPetitions').textContent = completedItems.filter((i) => i.type === 'petition').length
  document.getElementById('attendedEvents').textContent = completedItems.filter((i) => i.type === 'event').length
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter
    filterButtons.forEach((btn) => btn.classList.remove('active', 'bg-crGreen', 'text-white', 'border-crGreen'))
    button.classList.add('active', 'bg-crGreen', 'text-white', 'border-crGreen')
    renderInitiatives()
  })
})

renderInitiatives()
renderOutcomes()
renderSnapshot()
renderTrackerStats()
