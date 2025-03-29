// Financial Goal Calculator Interactive Component
// This JavaScript code creates an interactive calculator that helps children
// set and track financial goals based on concepts from Walter Clarke's 401Kid book

const goalCalculator = {
  // Initial state
  state: {
    goals: [],
    nextId: 1
  },
  
  // Initialize the calculator
  init: function() {
    this.loadGoals();
    this.updateGoalsList();
    this.setupEventListeners();
  },
  
  // Set up event listeners for buttons
  setupEventListeners: function() {
    document.getElementById('calculate-btn').addEventListener('click', () => this.calculateGoal());
    document.getElementById('add-goal-btn').addEventListener('click', () => this.addGoal());
    document.getElementById('clear-form-btn').addEventListener('click', () => this.clearForm());
  },
  
  // Calculate time to reach goal
  calculateGoal: function() {
    const goalName = document.getElementById('goal-name').value.trim();
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);
    const startingAmount = parseFloat(document.getElementById('starting-amount').value) || 0;
    const weeklyContribution = parseFloat(document.getElementById('weekly-contribution').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    
    // Validate inputs
    if (!goalName) {
      alert('Please enter a name for your goal.');
      return;
    }
    
    if (isNaN(goalAmount) || goalAmount <= 0) {
      alert('Please enter a valid goal amount greater than zero.');
      return;
    }
    
    if (isNaN(weeklyContribution) || weeklyContribution <= 0) {
      alert('Please enter a valid weekly contribution greater than zero.');
      return;
    }
    
    // Calculate weeks to reach goal
    let currentAmount = startingAmount;
    let weeks = 0;
    const weeklyInterestRate = interestRate / 100 / 52; // Convert annual rate to weekly
    
    while (currentAmount < goalAmount && weeks < 1000) { // Cap at 1000 weeks to prevent infinite loops
      currentAmount += weeklyContribution;
      currentAmount *= (1 + weeklyInterestRate);
      weeks++;
    }
    
    // Calculate years and remaining weeks
    const years = Math.floor(weeks / 52);
    const remainingWeeks = weeks % 52;
    
    // Format time string
    let timeString = '';
    if (years > 0) {
      timeString += `${years} year${years !== 1 ? 's' : ''}`;
    }
    if (remainingWeeks > 0) {
      timeString += `${years > 0 ? ' and ' : ''}${remainingWeeks} week${remainingWeeks !== 1 ? 's' : ''}`;
    }
    
    // Display results
    document.getElementById('result-time').textContent = timeString;
    document.getElementById('result-total-saved').textContent = `$${currentAmount.toFixed(2)}`;
    document.getElementById('result-contributions').textContent = `$${(weeklyContribution * weeks).toFixed(2)}`;
    document.getElementById('result-interest').textContent = `$${(currentAmount - startingAmount - (weeklyContribution * weeks)).toFixed(2)}`;
    
    // Show results section
    document.getElementById('results-section').style.display = 'block';
  },
  
  // Add goal to saved goals list
  addGoal: function() {
    const goalName = document.getElementById('goal-name').value.trim();
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);
    const startingAmount = parseFloat(document.getElementById('starting-amount').value) || 0;
    const weeklyContribution = parseFloat(document.getElementById('weekly-contribution').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    
    // Validate inputs
    if (!goalName || isNaN(goalAmount) || goalAmount <= 0 || isNaN(weeklyContribution) || weeklyContribution <= 0) {
      alert('Please fill out all required fields correctly before saving your goal.');
      return;
    }
    
    // Calculate progress percentage
    const progressPercent = Math.min(100, Math.round((startingAmount / goalAmount) * 100));
    
    // Create new goal object
    const newGoal = {
      id: this.state.nextId++,
      name: goalName,
      amount: goalAmount,
      current: startingAmount,
      weekly: weeklyContribution,
      interest: interestRate,
      progress: progressPercent,
      createdAt: new Date().toLocaleDateString()
    };
    
    // Add to goals array
    this.state.goals.push(newGoal);
    
    // Save to localStorage
    this.saveGoals();
    
    // Update display
    this.updateGoalsList();
    
    // Clear form
    this.clearForm();
    
    // Show success message
    alert(`Goal "${goalName}" has been added to your goals list!`);
  },
  
  // Clear the form inputs
  clearForm: function() {
    document.getElementById('goal-name').value = '';
    document.getElementById('goal-amount').value = '';
    document.getElementById('starting-amount').value = '';
    document.getElementById('weekly-contribution').value = '';
    document.getElementById('interest-rate').value = '';
    document.getElementById('results-section').style.display = 'none';
  },
  
  // Update the goals list display
  updateGoalsList: function() {
    const goalsList = document.getElementById('goals-list');
    goalsList.innerHTML = '';
    
    if (this.state.goals.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No goals saved yet. Add a goal to see it here!';
      goalsList.appendChild(emptyMessage);
      return;
    }
    
    this.state.goals.forEach(goal => {
      const goalCard = document.createElement('div');
      goalCard.className = 'goal-card';
      
      const goalHeader = document.createElement('div');
      goalHeader.className = 'goal-header';
      
      const goalTitle = document.createElement('h3');
      goalTitle.textContent = goal.name;
      
      const goalActions = document.createElement('div');
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => this.deleteGoal(goal.id));
      
      const updateBtn = document.createElement('button');
      updateBtn.className = 'update-btn';
      updateBtn.textContent = 'Update Progress';
      updateBtn.addEventListener('click', () => this.updateGoalProgress(goal.id));
      
      goalActions.appendChild(updateBtn);
      goalActions.appendChild(deleteBtn);
      
      goalHeader.appendChild(goalTitle);
      goalHeader.appendChild(goalActions);
      
      const goalDetails = document.createElement('div');
      goalDetails.className = 'goal-details';
      
      const goalAmount = document.createElement('p');
      goalAmount.innerHTML = `<strong>Target:</strong> $${goal.amount.toFixed(2)}`;
      
      const goalCurrent = document.createElement('p');
      goalCurrent.innerHTML = `<strong>Current:</strong> $${goal.current.toFixed(2)}`;
      
      const goalWeekly = document.createElement('p');
      goalWeekly.innerHTML = `<strong>Weekly Contribution:</strong> $${goal.weekly.toFixed(2)}`;
      
      const goalInterest = document.createElement('p');
      goalInterest.innerHTML = `<strong>Interest Rate:</strong> ${goal.interest}%`;
      
      const goalDate = document.createElement('p');
      goalDate.innerHTML = `<strong>Created:</strong> ${goal.createdAt}`;
      
      goalDetails.appendChild(goalAmount);
      goalDetails.appendChild(goalCurrent);
      goalDetails.appendChild(goalWeekly);
      goalDetails.appendChild(goalInterest);
      goalDetails.appendChild(goalDate);
      
      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-container';
      
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      progressBar.style.width = `${goal.progress}%`;
      
      const progressLabel = document.createElement('span');
      progressLabel.className = 'progress-label';
      progressLabel.textContent = `${goal.progress}%`;
      
      progressContainer.appendChild(progressBar);
      progressContainer.appendChild(progressLabel);
      
      goalCard.appendChild(goalHeader);
      goalCard.appendChild(goalDetails);
      goalCard.appendChild(progressContainer);
      
      goalsList.appendChild(goalCard);
    });
  },
  
  // Delete a goal
  deleteGoal: function(id) {
    if (confirm('Are you sure you want to delete this goal?')) {
      this.state.goals = this.state.goals.filter(goal => goal.id !== id);
      this.saveGoals();
      this.updateGoalsList();
    }
  },
  
  // Update goal progress
  updateGoalProgress: function(id) {
    const goal = this.state.goals.find(g => g.id === id);
    if (!goal) return;
    
    const newAmount = prompt(`Update current amount saved for "${goal.name}":`, goal.current);
    if (newAmount === null) return; // User cancelled
    
    const parsedAmount = parseFloat(newAmount);
    if (isNaN(parsedAmount) || parsedAmount < 0) {
      alert('Please enter a valid amount.');
      return;
    }
    
    goal.current = parsedAmount;
    goal.progress = Math.min(100, Math.round((parsedAmount / goal.amount) * 100));
    
    this.saveGoals();
    this.updateGoalsList();
  },
  
  // Save goals to localStorage
  saveGoals: function() {
    localStorage.setItem('financialGoals', JSON.stringify(this.state.goals));
    localStorage.setItem('nextGoalId', this.state.nextId.toString());
  },
  
  // Load goals from localStorage
  loadGoals: function() {
    const savedGoals = localStorage.getItem('financialGoals');
    const savedNextId = localStorage.getItem('nextGoalId');
    
    if (savedGoals) {
      this.state.goals = JSON.parse(savedGoals);
    }
    
    if (savedNextId) {
      this.state.nextId = parseInt(savedNextId, 10);
    }
  }
};

// Initialize the calculator when the page loads
window.addEventListener('DOMContentLoaded', () => {
  goalCalculator.init();
});
