// Money Simulator Interactive Component
// This JavaScript code creates an interactive money simulator that teaches children
// about the Five Faces of a Dollar concept from Walter Clarke's 401Kid book

const moneySimulator = {
  // Initial state
  state: {
    totalMoney: 100,
    save: 0,
    spend: 0,
    invest: 0,
    give: 0,
    earn: 0,
    history: [],
    weeksPassed: 0,
    interestRate: 0.05, // 5% interest for savings
    investmentReturn: 0.08, // 8% return on investments
  },
  
  // Initialize the simulator
  init: function() {
    this.updateDisplay();
    this.setupEventListeners();
  },
  
  // Update the display with current values
  updateDisplay: function() {
    document.getElementById('total-money').textContent = `$${this.state.totalMoney.toFixed(2)}`;
    document.getElementById('save-amount').textContent = `$${this.state.save.toFixed(2)}`;
    document.getElementById('spend-amount').textContent = `$${this.state.spend.toFixed(2)}`;
    document.getElementById('invest-amount').textContent = `$${this.state.invest.toFixed(2)}`;
    document.getElementById('give-amount').textContent = `$${this.state.give.toFixed(2)}`;
    document.getElementById('earn-amount').textContent = `$${this.state.earn.toFixed(2)}`;
    document.getElementById('weeks-passed').textContent = this.state.weeksPassed;
    
    // Update the history log
    const historyLog = document.getElementById('history-log');
    historyLog.innerHTML = '';
    this.state.history.slice(-5).forEach(entry => {
      const logItem = document.createElement('li');
      logItem.textContent = entry;
      historyLog.appendChild(logItem);
    });
    
    // Update jar visuals
    this.updateJars();
  },
  
  // Update the visual representation of money jars
  updateJars: function() {
    const total = this.state.save + this.state.spend + this.state.invest + this.state.give + this.state.earn;
    if (total > 0) {
      document.getElementById('save-jar').style.height = `${(this.state.save / total * 100)}%`;
      document.getElementById('spend-jar').style.height = `${(this.state.spend / total * 100)}%`;
      document.getElementById('invest-jar').style.height = `${(this.state.invest / total * 100)}%`;
      document.getElementById('give-jar').style.height = `${(this.state.give / total * 100)}%`;
      document.getElementById('earn-jar').style.height = `${(this.state.earn / total * 100)}%`;
    } else {
      document.getElementById('save-jar').style.height = '0%';
      document.getElementById('spend-jar').style.height = '0%';
      document.getElementById('invest-jar').style.height = '0%';
      document.getElementById('give-jar').style.height = '0%';
      document.getElementById('earn-jar').style.height = '0%';
    }
  },
  
  // Set up event listeners for buttons
  setupEventListeners: function() {
    document.getElementById('allocate-btn').addEventListener('click', () => this.allocateMoney());
    document.getElementById('advance-week-btn').addEventListener('click', () => this.advanceWeek());
    document.getElementById('earn-money-btn').addEventListener('click', () => this.earnMoney());
    document.getElementById('reset-btn').addEventListener('click', () => this.resetSimulator());
  },
  
  // Allocate money according to user input
  allocateMoney: function() {
    const savePercent = parseFloat(document.getElementById('save-percent').value) || 0;
    const spendPercent = parseFloat(document.getElementById('spend-percent').value) || 0;
    const investPercent = parseFloat(document.getElementById('invest-percent').value) || 0;
    const givePercent = parseFloat(document.getElementById('give-percent').value) || 0;
    const earnPercent = parseFloat(document.getElementById('earn-percent').value) || 0;
    
    const totalPercent = savePercent + spendPercent + investPercent + givePercent + earnPercent;
    
    if (totalPercent !== 100) {
      alert('Your percentages must add up to 100%!');
      return;
    }
    
    const availableMoney = this.state.totalMoney;
    
    this.state.save += (savePercent / 100) * availableMoney;
    this.state.spend += (spendPercent / 100) * availableMoney;
    this.state.invest += (investPercent / 100) * availableMoney;
    this.state.give += (givePercent / 100) * availableMoney;
    this.state.earn += (earnPercent / 100) * availableMoney;
    
    this.state.totalMoney = 0;
    
    this.state.history.push(`Week ${this.state.weeksPassed}: Allocated $${availableMoney.toFixed(2)} - Save: ${savePercent}%, Spend: ${spendPercent}%, Invest: ${investPercent}%, Give: ${givePercent}%, Earn: ${earnPercent}%`);
    
    this.updateDisplay();
  },
  
  // Advance time by one week
  advanceWeek: function() {
    this.state.weeksPassed++;
    
    // Apply interest to savings
    const savingsInterest = this.state.save * (this.state.interestRate / 52); // Weekly interest
    this.state.save += savingsInterest;
    
    // Apply returns to investments
    const investmentReturn = this.state.invest * (this.state.investmentReturn / 52); // Weekly return
    this.state.invest += investmentReturn;
    
    this.state.history.push(`Week ${this.state.weeksPassed}: Earned $${savingsInterest.toFixed(2)} in savings interest and $${investmentReturn.toFixed(2)} from investments`);
    
    this.updateDisplay();
  },
  
  // Earn additional money
  earnMoney: function() {
    const earnAmount = parseFloat(document.getElementById('earn-input').value) || 0;
    
    if (earnAmount <= 0) {
      alert('Please enter a positive amount to earn.');
      return;
    }
    
    this.state.totalMoney += earnAmount;
    this.state.history.push(`Week ${this.state.weeksPassed}: Earned $${earnAmount.toFixed(2)} from work or business`);
    
    this.updateDisplay();
  },
  
  // Reset the simulator
  resetSimulator: function() {
    if (confirm('Are you sure you want to reset the simulator? All progress will be lost.')) {
      this.state = {
        totalMoney: 100,
        save: 0,
        spend: 0,
        invest: 0,
        give: 0,
        earn: 0,
        history: [],
        weeksPassed: 0,
        interestRate: 0.05,
        investmentReturn: 0.08,
      };
      
      // Reset input fields
      document.getElementById('save-percent').value = '';
      document.getElementById('spend-percent').value = '';
      document.getElementById('invest-percent').value = '';
      document.getElementById('give-percent').value = '';
      document.getElementById('earn-percent').value = '';
      document.getElementById('earn-input').value = '';
      
      this.updateDisplay();
    }
  }
};

// Initialize the simulator when the page loads
window.addEventListener('DOMContentLoaded', () => {
  moneySimulator.init();
});
