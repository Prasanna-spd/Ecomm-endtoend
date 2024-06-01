export function fetchLoggedInUserOrders() {
    return new Promise(async (resolve) =>{
      const response = await fetch('https://ecomm-endtoend-backend-3xdi-4thevqhsq-prasannaspds-projects.vercel.app/orders/own/')
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetchLoggedInUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('https://ecomm-endtoend-backend-3xdi-4thevqhsq-prasannaspds-projects.vercel.app/users/own');
        if (!response.ok) { // Check if the response status is not OK (200-299)
          const errorText = await response.text();
          reject(new Error(errorText)); // Reject the promise with an error
          return;
        }
        const data = await response.json();
        console.log(data, "response from user backend");
        resolve({ data });
      } catch (error) {
        reject(error); // Reject the promise with the caught error
      }
    });
  }
  
  
  export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://ecomm-endtoend-backend-3xdi-4thevqhsq-prasannaspds-projects.vercel.app/users/'+update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }