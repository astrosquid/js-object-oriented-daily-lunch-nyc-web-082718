// global datastore
let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: [],
};
let neighborhoodId = store.neighborhoods.length, customerId = store.customers.length, mealId = store.meals.length, deliveryId = store.deliveries.length

class Neighborhood {
  constructor(name) {
    this.id = neighborhoodId++
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter( del => {
      return del.neighborhoodId === this.id
    })
  }

  customers() {
    return store.customers.filter( cus => {
      return cus.neighborhoodId === this.id
    })
  }

  meals() {
    return [...new Set(this.deliveries().map( del => del.meal() ))]
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = customerId++
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter( del => del.customerId === this.id )
  }

  meals() {
    return this.deliveries().map(del => del.meal())
  }

  totalSpent() {
    // const reducer = (acc, currVal) => acc + currVal.price
    // return this.meals().reduce(reducer, 0)
    return this.meals().reduce((sum, meal) => sum + meal.price, 0)
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId++
    this.mealId = mealId
    this.customerId = customerId
    this.neighborhoodId = neighborhoodId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find( meal => meal.id === this.mealId )
  }

  customer() {
    return store.customers.find( cust => cust.id === this.customerId )
  }

  neighborhood() {
    return store.neighborhoods.find( neighborhood => neighborhood.id === this.neighborhoodId )
  }
}

class Meal {
  constructor(title, price) {
    this.id = mealId++
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(del => del.meal() === this)
  }

  customers() {
    return this.deliveries().map(del => del.customer())
  }

  static byPrice() {
    return store.meals.slice().sort((meal1, meal2) => {
      return meal2.price - meal1.price
    })
  }
}
