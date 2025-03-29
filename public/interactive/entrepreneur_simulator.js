// Entrepreneurship Simulator Interactive Component
// This JavaScript code creates an interactive business simulator that teaches children
// about entrepreneurship concepts from Walter Clarke's 401Kid book

const entrepreneurSimulator = {
  // Initial state
  state: {
    businessName: '',
    businessType: '',
    startingCapital: 100,
    cash: 100,
    inventory: 0,
    customers: 0,
    reputation: 50, // 0-100 scale
    week: 1,
    productPrice: 0,
    productCost: 0,
    marketingBudget: 0,
    events: [],
    gameOver: false
  },
  
  // Business types with their properties
  businessTypes: {
    lemonadeStand: {
      name: 'Lemonade Stand',
      description: 'A classic first business selling refreshing lemonade',
      productCost: 0.50,
      recommendedPrice: 2.00,
      startupCost: 20,
      customerBase: 10
    },
    petSitting: {
      name: 'Pet Sitting Service',
      description: 'Take care of pets while their owners are away',
      productCost: 1.00,
      recommendedPrice: 10.00,
      startupCost: 30,
      customerBase: 5
    },
    craftSales: {
      name: 'Craft Sales',
      description: 'Create and sell handmade crafts and artwork',
      productCost: 3.00,
      recommendedPrice: 8.00,
      startupCost: 50,
      customerBase: 8
    },
    lawnMowing: {
      name: 'Lawn Mowing Service',
      description: 'Mow lawns in your neighborhood',
      productCost: 2.00,
      recommendedPrice: 15.00,
      startupCost: 75,
      customerBase: 4
    }
  },
  
  // Random events that can occur
  randomEvents: [
    {
      name: 'Sunny Day',
      description: 'Beautiful weather brings out more customers!',
      effect: (state) => {
        const extraCustomers = Math.floor(state.customers * 0.5);
        state.events.push(`Sunny day brought in ${extraCustomers} extra customers!`);
        return {
          customers: state.customers + extraCustomers
        };
      },
      probability: 0.2
    },
    {
      name: 'Rainy Day',
      description: 'Bad weather keeps customers away.',
      effect: (state) => {
        const lostCustomers = Math.floor(state.customers * 0.3);
        state.events.push(`Rainy day cost you ${lostCustomers} customers.`);
        return {
          customers: Math.max(0, state.customers - lostCustomers)
        };
      },
      probability: 0.15
    },
    {
      name: 'Social Media Mention',
      description: 'Someone mentioned your business online!',
      effect: (state) => {
        const reputationGain = 5;
        state.events.push(`Social media mention increased your reputation by ${reputationGain} points!`);
        return {
          reputation: Math.min(100, state.reputation + reputationGain)
        };
      },
      probability: 0.1
    },
    {
      name: 'Satisfied Customer',
      description: 'A customer was very happy with your product/service!',
      effect: (state) => {
        const reputationGain = 3;
        const extraCustomers = 2;
        state.events.push(`A satisfied customer told their friends about you! Reputation +${reputationGain}, Customers +${extraCustomers}`);
        return {
          reputation: Math.min(100, state.reputation + reputationGain),
          customers: state.customers + extraCustomers
        };
      },
      probability: 0.25
    },
    {
      name: 'Supply Shortage',
      description: 'Your supplier ran out of materials!',
      effect: (state) => {
        const costIncrease = Math.round(state.productCost * 0.5 * 100) / 100;
        state.events.push(`Supply shortage increased your costs by $${costIncrease.toFixed(2)} per unit this week.`);
        return {
          productCost: state.productCost + costIncrease
        };
      },
      probability: 0.1
    },
    {
      name: 'Bulk Discount',
      description: 'You found a way to get supplies cheaper!',
      effect: (state) => {
        const costDecrease = Math.round(state.productCost * 0.2 * 100) / 100;
        state.events.push(`Bulk discount decreased your costs by $${costDecrease.toFixed(2)} per unit this week.`);
        return {
          productCost: Math.max(0.1, state.productCost - costDecrease)
        };
      },
      probability: 0.15
    }
  ],
  
  // Initialize the simulator
  init: function() {
    this.setupEventListeners();
    this.showStartScreen();
  },
  
  // Set up event listeners for buttons
  setupEventListeners: function() {
    document.getElementById('start-business-btn').addEventListener('click', () => this.startBusiness());
    document.getElementById('next-week-btn').addEventListener('click', () => this.nextWeek());
    document.getElementById('buy-inventory-btn').addEventListener('click', () => this.buyInventory());
    document.getElementById('set-price-btn').addEventListener('click', () => this.setPrice());
    document.getElementById('marketing-btn').addEventListener('click', () => this.setMarketing());
    document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
  },
  
  // Show the start screen
  showStartScreen: function() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('business-type-select').innerHTML = '';
    
    // Add business type options
    for (const [key, business] of Object.entries(this.businessTypes)) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = business.name;
      document.getElementById('business-type-select').appendChild(option);
    }
    
    // Show business description when type changes
    document.getElementById('business-type-select').addEventListener('change', (e) => {
      const selectedBusiness = this.businessTypes[e.target.value];
      if (selectedBusiness) {
        document.getElementById('business-description').textContent = selectedBusiness.description;
        document.getElementById('startup-cost').textContent = `$${selectedBusiness.startupCost}`;
        document.getElementById('product-cost').textContent = `$${selectedBusiness.productCost.toFixed(2)}`;
        document.getElementById('recommended-price').textContent = `$${selectedBusiness.recommendedPrice.toFixed(2)}`;
      }
    });
    
    // Trigger change to show initial business
    document.getElementById('business-type-select').dispatchEvent(new Event('change'));
  },
  
  // Start a new business
  startBusiness: function() {
    const businessName = document.getElementById('business-name').value.trim();
    const businessType = document.getElementById('business-type-select').value;
    
    if (!businessName) {
      alert('Please enter a name for your business.');
      return;
    }
    
    const selectedBusiness = this.businessTypes[businessType];
    
    // Initialize game state
    this.state = {
      businessName: businessName,
      businessType: businessType,
      startingCapital: 100,
      cash: 100 - selectedBusiness.startupCost,
      inventory: 0,
      customers: selectedBusiness.customerBase,
      reputation: 50,
      week: 1,
      productPrice: selectedBusiness.recommendedPrice,
      productCost: selectedBusiness.productCost,
      marketingBudget: 0,
      events: [`You started your ${selectedBusiness.name} business with $100 and spent $${selectedBusiness.startupCost} on initial supplies.`],
      gameOver: false
    };
    
    // Switch to game screen
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    // Update display
    this.updateDisplay();
  },
  
  // Update the game display
  updateDisplay: function() {
    // Update business info
    document.getElementById('business-name-display').textContent = this.state.businessName;
    document.getElementById('business-type-display').textContent = this.businessTypes[this.state.businessType].name;
    document.getElementById('week-display').textContent = this.state.week;
    
    // Update financial stats
    document.getElementById('cash-display').textContent = `$${this.state.cash.toFixed(2)}`;
    document.getElementById('inventory-display').textContent = this.state.inventory;
    document.getElementById('customers-display').textContent = this.state.customers;
    document.getElementById('reputation-display').textContent = `${this.state.reputation}/100`;
    document.getElementById('product-cost-display').textContent = `$${this.state.productCost.toFixed(2)}`;
    document.getElementById('product-price-display').textContent = `$${this.state.productPrice.toFixed(2)}`;
    document.getElementById('marketing-display').textContent = `$${this.state.marketingBudget.toFixed(2)}`;
    
    // Calculate profit margin
    const profitMargin = ((this.state.productPrice - this.state.productCost) / this.state.productPrice * 100).toFixed(1);
    document.getElementById('profit-margin-display').textContent = `${profitMargin}%`;
    
    // Update event log
    const eventLog = document.getElementById('event-log');
    eventLog.innerHTML = '';
    this.state.events.slice(-10).forEach(event => {
      const eventItem = document.createElement('li');
      eventItem.textContent = event;
      eventLog.appendChild(eventItem);
    });
    
    // Update reputation bar
    document.getElementById('reputation-bar').style.width = `${this.state.reputation}%`;
    
    // Update input fields
    document.getElementById('inventory-input').value = '';
    document.getElementById('price-input').value = this.state.productPrice.toFixed(2);
    document.getElementById('marketing-input').value = this.state.marketingBudget.toFixed(2);
    
    // Show game over message if applicable
    if (this.state.gameOver) {
      document.getElementById('game-over-message').style.display = 'block';
      document.getElementById('next-week-btn').disabled = true;
    } else {
      document.getElementById('game-over-message').style.display = 'none';
      document.getElementById('next-week-btn').disabled = false;
    }
  },
  
  // Buy inventory
  buyInventory: function() {
    const amount = parseInt(document.getElementById('inventory-input').value);
    
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive number.');
      return;
    }
    
    const cost = amount * this.state.productCost;
    
    if (cost > this.state.cash) {
      alert(`You don't have enough cash. You need $${cost.toFixed(2)} but only have $${this.state.cash.toFixed(2)}.`);
      return;
    }
    
    this.state.cash -= cost;
    this.state.inventory += amount;
    this.state.events.push(`Purchased ${amount} units of inventory for $${cost.toFixed(2)}.`);
    
    this.updateDisplay();
  },
  
  // Set product price
  setPrice: function() {
    const price = parseFloat(document.getElementById('price-input').value);
    
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid positive price.');
      return;
    }
    
    const oldPrice = this.state.productPrice;
    this.state.productPrice = price;
    this.state.events.push(`Changed product price from $${oldPrice.toFixed(2)} to $${price.toFixed(2)}.`);
    
    this.updateDisplay();
  },
  
  // Set marketing budget
  setMarketing: function() {
    const budget = parseFloat(document.getElementById('marketing-input').value);
    
    if (isNaN(budget) || budget < 0) {
      alert('Please enter a valid marketing budget (0 or more).');
      return;
    }
    
    if (budget > this.state.cash) {
      alert(`You don't have enough cash. You need $${budget.toFixed(2)} but only have $${this.state.cash.toFixed(2)}.`);
      return;
    }
    
    const oldBudget = this.state.marketingBudget;
    this.state.marketingBudget = budget;
    this.state.cash -= (budget - oldBudget);
    this.state.events.push(`Set marketing budget to $${budget.toFixed(2)}.`);
    
    this.updateDisplay();
  },
  
  // Advance to next week
  nextWeek: function() {
    // Increase week counter
    this.state.week++;
    
    // Calculate sales based on customers, inventory, and price
    let potentialCustomers = this.state.customers;
    
    // Marketing effect (each dollar spent on marketing brings in 0.5 more customers, with diminishing returns)
    const marketingEffect = Math.floor(Math.sqrt(this.state.marketingBudget) * 0.5);
    potentialCustomers += marketingEffect;
    
    // Price effect (if price is too high compared to recommended, lose customers)
    const recommendedPrice = this.businessTypes[this.state.businessType].recommendedPrice;
    const priceRatio = this.state.productPrice / recommendedPrice;
    
    if (priceRatio > 1.5) {
      // Price is too high, lose customers
      const lostCustomers = Math.floor(potentialCustomers * ((priceRatio - 1.5) * 0.5));
      potentialCustomers = Math.max(0, potentialCustomers - lostCustomers);
      this.state.events.push(`High prices scared away ${lostCustomers} potential customers.`);
    } else if (priceRatio < 0.8) {
      // Price is very low, gain customers but might be losing money
      const extraCustomers = Math.floor(potentialCustomers * ((0.8 - priceRatio) * 0.7));
      potentialCustomers += extraCustomers;
      this.state.events.push(`Low prices attracted ${extraCustomers} extra customers.`);
    }
    
    // Reputation effect
    const reputationMultiplier = this.state.reputation / 50; // 1.0 at 50 reputation
    potentialCustomers = Math.floor(potentialCustomers * reputationMultiplier);
    
    // Actual sales limited by inventory
    const sales = Math.min(potentialCustomers, this.state.inventory);
    const revenue = sales * this.state.productPrice;
    
    // Update state
    this.state.inventory -= sales;
    this.state.cash += revenue;
    
    // Update reputation based on sales vs potential
    if (sales < potentialCustomers) {
      // Lost customers due to insufficient inventory
      const reputationLoss = Math.min(5, Math.floor((potentialCustomers - sales) / 2));
      this.state.reputation = Math.max(0, this.state.reputation - reputationLoss);
      this.state.events.push(`You couldn't serve ${potentialCustomers - sales} customers due to insufficient inventory. Reputation -${reputationLoss}.`);
    } else {
      // Served all customers, gain reputation
      const reputationGain = 1;
      this.state.reputation = Math.min(100, this.state.reputation + reputationGain);
    }
    
    // Weekly summary
    this.state.events.push(`Week ${this.state.week-1} summary: Sold ${sales} units for $${revenue.toFixed(2)}.`);
    
    // Random events
    this.processRandomEvents();
    
    // Update customer base (organic growth based on reputation)
    const baseGrowth = Math.max(-2, Math.min(3, Math.floor((this.state.reputation - 50) / 10)));
    this.state.customers = Math.max(0, this.state.customers + baseGrowth);
    
    // Check for game over condition
    if (this.state.cash < 1 && this.state.inventory === 0) {
      this.state.gameOver = true;
      this.state.events.push(`GAME OVER: You've run out of cash and inventory. Your business has failed.`);
    }
    
    // Reset marketing budget (needs to be set each week)
    this.state.marketingBudget = 0;
    
    // Update display
    this.updateDisplay();
  },
  
  // Process random events
  processRandomEvents: function() {
    // Determine how many events occur (0-2)
    const eventCount = Math.floor(Math.random() * 2);
    
    for (let i = 0; i < eventCount; i++) {
      // Select a random event based on probability
      const randomValue = Math.random();
      let probabilitySum = 0;
      
      for (const event of this.randomEvents) {
        probabilitySum += event.probability;
        
        if (randomValue <= probabilitySum) {
          // Apply this event
          const changes = event.effect(this.state);
          
          // Update state with changes
          for (const [key, value] of Object.entries(changes)) {
            this.state[key] = value;
          }
          
          break;
        }
      }
    }
  },
  
  // Restart the game
  restartGame: function() {
    this.showStartScreen();
  }
};

// Initialize the simulator when the page loads
window.addEventListener('DOMContentLoaded', () => {
  entrepreneurSimulator.init();
});
