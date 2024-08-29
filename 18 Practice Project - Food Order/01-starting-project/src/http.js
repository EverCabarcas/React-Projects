export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/meals");
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Problem to get list of meals");
  }
};


export const createOrder = async (order, customerData) => {
  try {
    fetch("http://localhost:3000/orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          items: order,
          customer: customerData
        }
      })
    })
  } catch (error) {
    
  }
}
