// Family Financial Challenge Center Interactive Component
// This JavaScript code creates an interactive challenge system for families
// to engage with financial concepts from Walter Clarke's 401Kid book

const financialChallengeCenter = {
  // Initial state
  state: {
    challenges: [],
    completedChallenges: [],
    currentFilter: 'all',
    familyName: '',
    familyPoints: 0
  },
  
  // Challenge categories
  categories: [
    'Saving',
    'Spending',
    'Investing',
    'Giving',
    'Earning',
    'Financial Discipline',
    'Family Discussion'
  ],
  
  // Age groups
  ageGroups: [
    'Ages 5-7',
    'Ages 8-10',
    'Ages 11-13',
    'Teens',
    'Family'
  ],
  
  // Predefined challenges
  predefinedChallenges: [
    {
      id: 1,
      title: 'Create a Family Money Jar System',
      description: 'Set up five jars or containers labeled Save, Spend, Invest, Give, and Earn. Decide as a family how to divide money between these jars.',
      category: 'Financial Discipline',
      ageGroup: 'Family',
      points: 50,
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'No-Spend Weekend Challenge',
      description: 'Go an entire weekend without spending any money. Plan free activities and use what you already have at home.',
      category: 'Spending',
      ageGroup: 'Family',
      points: 30,
      difficulty: 'Medium'
    },
    {
      id: 3,
      title: 'Grocery Budget Game',
      description: 'Give children a small budget at the grocery store and have them find the best deals for items on a list.',
      category: 'Spending',
      ageGroup: 'Ages 8-10',
      points: 20,
      difficulty: 'Easy'
    },
    {
      id: 4,
      title: 'Coin Sorting Race',
      description: 'Gather loose change and have a race to sort coins by type. Count the total and decide together how to use it.',
      category: 'Saving',
      ageGroup: 'Ages 5-7',
      points: 10,
      difficulty: 'Easy'
    },
    {
      id: 5,
      title: 'Family Business Brainstorm',
      description: 'Spend an evening brainstorming business ideas that your family could start together. Choose one to explore further.',
      category: 'Earning',
      ageGroup: 'Family',
      points: 25,
      difficulty: 'Medium'
    },
    {
      id: 6,
      title: 'Research a Company to Invest In',
      description: 'Choose a company your child is familiar with (like Disney or Apple) and research it together. Discuss whether it would be a good investment.',
      category: 'Investing',
      ageGroup: 'Ages 11-13',
      points: 30,
      difficulty: 'Medium'
    },
    {
      id: 7,
      title: 'Charity Research Project',
      description: 'Research three charities as a family and decide together which one to support with a donation or volunteer time.',
      category: 'Giving',
      ageGroup: 'Family',
      points: 40,
      difficulty: 'Medium'
    },
    {
      id: 8,
      title: 'Needs vs. Wants Scavenger Hunt',
      description: 'Go through your home and identify 10 items that are needs and 10 that are wants. Discuss the difference.',
      category: 'Financial Discipline',
      ageGroup: 'Ages 8-10',
      points: 15,
      difficulty: 'Easy'
    },
    {
      id: 9,
      title: 'Compound Interest Demonstration',
      description: 'Use the penny doubling example (1 penny doubled every day for 30 days) to demonstrate compound growth.',
      category: 'Investing',
      ageGroup: 'Ages 11-13',
      points: 20,
      difficulty: 'Medium'
    },
    {
      id: 10,
      title: 'Family Money Values Discussion',
      description: 'Have a family discussion about your money values. What's important to your family about how you use money?',
      category: 'Family Discussion',
      ageGroup: 'Family',
      points: 35,
      difficulty: 'Hard'
    },
    {
      id: 11,
      title: 'Create a Family Giving Plan',
      description: 'Decide as a family how much money to set aside for giving and which causes you want to support this year.',
      category: 'Giving',
      ageGroup: 'Family',
      points: 45,
      difficulty: 'Hard'
    },
    {
      id: 12,
      title: 'Savings Goal Poster',
      description: 'Create a visual poster or chart for a family savings goal. Track progress visually.',
      category: 'Saving',
      ageGroup: 'Ages 5-7',
      points: 15,
      difficulty: 'Easy'
    },
    {
      id: 13,
      title: 'Lemonade Stand Challenge',
      description: 'Set up a lemonade stand or similar small business. Track expenses, revenue, and profit.',
      category: 'Earning',
      ageGroup: 'Ages 8-10',
      points: 40,
      difficulty: 'Medium'
    },
    {
      id: 14,
      title: 'Family Budget Meeting',
      description: 'Hold a family budget meeting where you review income, expenses, and savings goals together.',
      category: 'Financial Discipline',
      ageGroup: 'Family',
      points: 50,
      difficulty: 'Hard'
    },
    {
      id: 15,
      title: 'Delayed Gratification Challenge',
      description: 'Choose something everyone wants and set a waiting period before purchasing it. Discuss how it feels to wait.',
      category: 'Spending',
      ageGroup: 'Family',
      points: 30,
      difficulty: 'Medium'
    },
    {
      id: 16,
      title: 'Money Book Club',
      description: 'Read a chapter from 401Kid together and discuss the lessons as a family.',
      category: 'Family Discussion',
      ageGroup: 'Family',
      points: 25,
      difficulty: 'Easy'
    },
    {
      id: 17,
      title: 'Coupon Scavenger Hunt',
      description: 'Find coupons for items your family regularly buys. Calculate the total savings.',
      category: 'Spending',
      ageGroup: 'Ages 8-10',
      points: 20,
      difficulty: 'Easy'
    },
    {
      id: 18,
      title: 'Interview a Successful Person',
      description: 'Interview someone you know who is financially successful. Ask about their habits and advice.',
      category: 'Financial Discipline',
      ageGroup: 'Teens',
      points: 35,
      difficulty: 'Medium'
    },
    {
      id: 19,
      title: 'Create a Family Business',
      description: 'Start a small family business that everyone can participate in. Assign roles based on skills and interests.',
      category: 'Earning',
      ageGroup: 'Family',
      points: 100,
      difficulty: 'Hard'
    },
    {
      id: 20,
      title: 'Gratitude Journal Week',
      description: 'For one week, have everyone write down three things they're grateful for each day. Discuss how gratitude relates to money.',
      category: 'Giving',
      ageGroup: 'Family',
      points: 30,
      difficulty: 'Easy'
    }
  ],
  
  // Initialize the challenge center
  init: function() {
    this.loadState();
    this.setupEventListeners();
    this.loadChallenges();
    this.updateDisplay();
  },
  
  // Set up event listeners for buttons
  setupEventListeners: function() {
    document.getElementById('setup-family-btn').addEventListener('click', () => this.setupFamily());
    document.getElementById('filter-all').addEventListener('click', () => this.filterChallenges('all'));
    document.getElementById('filter-age').addEventListener('click', () => this.filterChallenges('age'));
    document.getElementById('filter-category').addEventListener('click', () => this.filterChallenges('category'));
    document.getElementById('filter-difficulty').addEventListener('click', () => this.filterChallenges('difficulty'));
    document.getElementById('add-challenge-btn').addEventListener('click', () => this.showAddChallengeForm());
    document.getElementById('submit-challenge-btn').addEventListener('click', () => this.addCustomChallenge());
    document.getElementById('cancel-add-btn').addEventListener('click', () => this.hideAddChallengeForm());
    document.getElementById('reset-progress-btn').addEventListener('click', () => this.resetProgress());
  },
  
  // Load challenges into state
  loadChallenges: function() {
    // Start with predefined challenges
    this.state.challenges = [...this.predefinedChallenges];
    
    // Add any custom challenges from localStorage
    const customChallenges = JSON.parse(localStorage.getItem('customChallenges') || '[]');
    if (customChallenges.length > 0) {
      // Find the highest ID to ensure new challenges get unique IDs
      const maxId = Math.max(...this.state.challenges.map(c => c.id), 0);
      
      // Add custom challenges with adjusted IDs if needed
      customChallenges.forEach((challenge, index) => {
        challenge.id = maxId + index + 1;
        this.state.challenges.push(challenge);
      });
    }
  },
  
  // Update the display
  updateDisplay: function() {
    // Update family info
    if (this.state.familyName) {
      document.getElementById('family-setup').style.display = 'none';
      document.getElementById('family-info').style.display = 'block';
      document.getElementById('family-name-display').textContent = this.state.familyName;
      document.getElementById('family-points-display').textContent = this.state.familyPoints;
      
      // Calculate completion percentage
      const completionPercentage = Math.round((this.state.completedChallenges.length / this.state.challenges.length) * 100);
      document.getElementById('completion-percentage').textContent = `${completionPercentage}%`;
      document.getElementById('completion-bar').style.width = `${completionPercentage}%`;
      
      // Show challenges section
      document.getElementById('challenges-section').style.display = 'block';
    } else {
      document.getElementById('family-setup').style.display = 'block';
      document.getElementById('family-info').style.display = 'none';
      document.getElementById('challenges-section').style.display = 'none';
    }
    
    // Update challenges list
    this.updateChallengesList();
  },
  
  // Update the challenges list based on current filter
  updateChallengesList: function() {
    const challengesList = document.getElementById('challenges-list');
    challengesList.innerHTML = '';
    
    // Filter challenges
    let filteredChallenges = [...this.state.challenges];
    
    const filterType = document.getElementById('filter-type');
    const filterValue = document.getElementById('filter-value');
    
    if (this.state.currentFilter !== 'all' && filterValue.value !== 'all') {
      filteredChallenges = filteredChallenges.filter(challenge => {
        if (this.state.currentFilter === 'age') {
          return challenge.ageGroup === filterValue.value;
        } else if (this.state.currentFilter === 'category') {
          return challenge.category === filterValue.value;
        } else if (this.state.currentFilter === 'difficulty') {
          return challenge.difficulty === filterValue.value;
        }
        return true;
      });
    }
    
    // Sort challenges (completed at the bottom)
    filteredChallenges.sort((a, b) => {
      const aCompleted = this.state.completedChallenges.includes(a.id);
      const bCompleted = this.state.completedChallenges.includes(b.id);
      
      if (aCompleted && !bCompleted) return 1;
      if (!aCompleted && bCompleted) return -1;
      return 0;
    });
    
    // Create challenge cards
    filteredChallenges.forEach(challenge => {
      const isCompleted = this.state.completedChallenges.includes(challenge.id);
      
      const challengeCard = document.createElement('div');
      challengeCard.className = `challenge-card ${isCompleted ? 'completed' : ''}`;
      
      const challengeHeader = document.createElement('div');
      challengeHeader.className = 'challenge-header';
      
      const challengeTitle = document.createElement('h3');
      challengeTitle.textContent = challenge.title;
      
      const challengePoints = document.createElement('div');
      challengePoints.className = 'challenge-points';
      challengePoints.textContent = `${challenge.points} pts`;
      
      challengeHeader.appendChild(challengeTitle);
      challengeHeader.appendChild(challengePoints);
      
      const challengeDescription = document.createElement('p');
      challengeDescription.textContent = challenge.description;
      
      const challengeMeta = document.createElement('div');
      challengeMeta.className = 'challenge-meta';
      
      const ageGroup = document.createElement('span');
      ageGroup.className = 'meta-tag age';
      ageGroup.textContent = challenge.ageGroup;
      
      const category = document.createElement('span');
      category.className = 'meta-tag category';
      category.textContent = challenge.category;
      
      const difficulty = document.createElement('span');
      difficulty.className = 'meta-tag difficulty';
      difficulty.textContent = challenge.difficulty;
      
      challengeMeta.appendChild(ageGroup);
      challengeMeta.appendChild(category);
      challengeMeta.appendChild(difficulty);
      
      const challengeActions = document.createElement('div');
      challengeActions.className = 'challenge-actions';
      
      const completeButton = document.createElement('button');
      
      if (isCompleted) {
        completeButton.textContent = 'Mark Incomplete';
        completeButton.className = 'incomplete-btn';
        completeButton.addEventListener('click', () => this.markChallengeIncomplete(challenge.id));
      } else {
        completeButton.textContent = 'Mark Complete';
        completeButton.className = 'complete-btn';
        completeButton.addEventListener('click', () => this.markChallengeComplete(challenge.id));
      }
      
      challengeActions.appendChild(completeButton);
      
      challengeCard.appendChild(challengeHeader);
      challengeCard.appendChild(challengeDescription);
      challengeCard.appendChild(challengeMeta);
      challengeCard.appendChild(challengeActions);
      
      challengesList.appendChild(challengeCard);
    });
    
    // Show message if no challenges match filter
    if (filteredChallenges.length === 0) {
      const noResults = document.createElement('p');
      noResults.textContent = 'No challenges match your current filter. Try a different filter.';
      challengesList.appendChild(noResults);
    }
  },
  
  // Set up family
  setupFamily: function() {
    const familyName = document.getElementById('family-name-input').value.trim();
    
    if (!familyName) {
      alert('Please enter a family name.');
      return;
    }
    
    this.state.familyName = familyName;
    this.state.familyPoints = 0;
    this.state.completedChallenges = [];
    
    this.saveState();
    this.updateDisplay();
  },
  
  // Filter challenges
  filterChallenges: function(filterType) {
    this.state.currentFilter = filterType;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(`filter-${filterType}`).classList.add('active');
    
    // Update filter type display
    document.getElementById('filter-type').textContent = filterType === 'all' ? 'All Challenges' : 
      filterType === 'age' ? 'Age Group' : 
      filterType === 'category' ? 'Category' : 'Difficulty';
    
    // Update filter value dropdown
    const filterValue = document.getElementById('filter-value');
    filterValue.innerHTML = '';
    
    // Add "All" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All';
    filterValue.appendChild(allOption);
    
    // Add specific options based on filter type
    if (filterType === 'age') {
      this.ageGroups.forEach(age => {
        const option = document.createElement('option');
        option.value = age;
        option.textContent = age;
        filterValue.appendChild(option);
      });
    } else if (filterType === 'category') {
      this.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filterValue.appendChild(option);
      });
    } else if (filterType === 'difficulty') {
      ['Easy', 'Medium', 'Hard'].forEach(difficulty => {
        const option = document.createElement('option');
        option.value = difficulty;
        option.textContent = difficulty;
        filterValue.appendChild(option);
      });
    }
    
    // Add event listener to filter value dropdown
    filterValue.addEventListener('change', () => this.updateChallengesList());
    
    this.updateChallengesList();
  },
  
  // Mark a challenge as complete
  markChallengeComplete: function(challengeId) {
    if (!this.state.completedChallenges.includes(challengeId)) {
      this.state.completedChallenges.push(challengeId);
      
      // Add points
      const challenge = this.state.challenges.find(c => c.id === challengeId);
      if (challenge) {
        this.state.familyPoints += challenge.points;
      }
      
      this.saveState();
      this.updateDisplay();
      
      // Show congratulations message
      alert(`Congratulations! You've completed the challenge and earned ${challenge.points} points!`);
    }
  },
  
  // Mark a challenge as incomplete
  markChallengeIncomplete: function(challengeId) {
    const index = this.state.completedChallenges.indexOf(challengeId);
    if (index !== -1) {
      this.state.completedChallenges.splice(index, 1);
      
      // Remove points
      const challenge = this.state.challenges.find(c => c.id === challengeId);
      if (challenge) {
        this.state.familyPoints = Math.max(0, this.state.familyPoints - challenge.points);
      }
      
      this.saveState();
      this.updateDisplay();
    }
  },
  
  // Show the add challenge form
  showAddChallengeForm: function() {
    document.getElementById('add-challenge-form').style.display = 'block';
    
    // Populate dropdowns
    const categorySelect = document.getElementById('challenge-category');
    const ageGroupSelect = document.getElementById('challenge-age-group');
    const difficultySelect = document.getElementById('challenge-difficulty');
    
    // Clear existing options
    categorySelect.innerHTML = '';
    ageGroupSelect.innerHTML = '';
    difficultySelect.innerHTML = '';
    
    // Add categories
    this.categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
    
    // Add age groups
    this.ageGroups.forEach(age => {
      const option = document.createElement('option');
      option.value = age;
      option.textContent = age;
      ageGroupSelect.appendChild(option);
    });
    
    // Add difficulties
    ['Easy', 'Medium', 'Hard'].forEach(difficulty => {
      const option = document.createElement('option');
      option.value = difficulty;
      option.textContent = difficulty;
      difficultySelect.appendChild(option);
    });
  },
  
  // Hide the add challenge form
  hideAddChallengeForm: function() {
    document.getElementById('add-challenge-form').style.display = 'none';
    
    // Clear form fields
    document.getElementById('challenge-title').value = '';
    document.getElementById('challenge-description').value = '';
    document.getElementById('challenge-points').value = '';
  },
  
  // Add a custom challenge
  addCustomChallenge: function() {
    const title = document.getElementById('challenge-title').value.trim();
    const description = document.getElementById('challenge-description').value.trim();
    const category = document.getElementById('challenge-category').value;
    const ageGroup = document.getElementById('challenge-age-group').value;
    const difficulty = document.getElementById('challenge-difficulty').value;
    const points = parseInt(document.getElementById('challenge-points').value);
    
    // Validate inputs
    if (!title || !description || isNaN(points) || points <= 0) {
      alert('Please fill out all fields correctly. Points must be a positive number.');
      return;
    }
    
    // Create new challenge
    const newChallenge = {
      id: Math.max(...this.state.challenges.map(c => c.id), 0) + 1,
      title,
      description,
      category,
      ageGroup,
      difficulty,
      points,
      custom: true
    };
    
    // Add to challenges
    this.state.challenges.push(newChallenge);
    
    // Save custom challenges to localStorage
    const customChallenges = this.state.challenges.filter(c => c.custom);
    localStorage.setItem('customChallenges', JSON.stringify(customChallenges));
    
    // Update display
    this.hideAddChallengeForm();
    this.updateDisplay();
    
    // Show confirmation
    alert('Your custom challenge has been added!');
  },
  
  // Reset progress
  resetProgress: function() {
    if (confirm('Are you sure you want to reset all progress? This will clear all completed challenges and points.')) {
      this.state.completedChallenges = [];
      this.state.familyPoints = 0;
      this.saveState();
      this.updateDisplay();
    }
  },
  
  // Save state to localStorage
  saveState: function() {
    localStorage.setItem('familyName', this.state.familyName);
    localStorage.setItem('familyPoints', this.state.familyPoints.toString());
    localStorage.setItem('completedChallenges', JSON.stringify(this.state.completedChallenges));
    localStorage.setItem('currentFilter', this.state.currentFilter);
  },
  
  // Load state from localStorage
  loadState: function() {
    const familyName = localStorage.getItem('familyName');
    const familyPoints = localStorage.getItem('familyPoints');
    const completedChallenges = localStorage.getItem('completedChallenges');
    const currentFilter = localStorage.getItem('currentFilter');
    
    if (familyName) this.state.familyName = familyName;
    if (familyPoints) this.state.familyPoints = parseInt(familyPoints);
    if (completedChallenges) this.state.completedChallenges = JSON.parse(completedChallenges);
    if (currentFilter) this.state.currentFilter = currentFilter;
  }
};

// Initialize the challenge center when the page loads
window.addEventListener('DOMContentLoaded', () => {
  financialChallengeCenter.init();
});
