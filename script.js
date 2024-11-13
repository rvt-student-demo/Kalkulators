const inputValue = document.getElementById("user-input");
const historyContainer = document.querySelector('.historyContainer');
const STORAGE_NAME = 'history_v4';

// Initialize localStorage if it's empty
if (localStorage.getItem(STORAGE_NAME) == null) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
}

// Function to refresh the history display
function refreshHistory() {
    const history = JSON.parse(localStorage.getItem(STORAGE_NAME)); // Get the history from localStorage
    historyContainer.innerHTML = ''; // Clear the current history display

    // Iterate over each history entry
    history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        
        // Add the expression and result to the history item
        historyItem.innerHTML = `
            <span>${item.expression} = </span><span>${item.result}</span>
            <button class="delete-history" data-index="${index}">Delete</button>
        `;
        
        // Append the history item to the history container
        historyContainer.appendChild(historyItem);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-history').forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index'); // Get the index of the history item to delete
            deleteHistoryItem(index); // Call the function to delete the item
        });
    });
}

// Function to delete a history item from localStorage
function deleteHistoryItem(index) {
    const history = JSON.parse(localStorage.getItem(STORAGE_NAME)); // Get current history from localStorage
    
    // Remove the history item at the given index
    history.splice(index, 1);
    
    // Save the updated history back to localStorage
    localStorage.setItem(STORAGE_NAME, JSON.stringify(history));
    
    // Refresh the history UI
    refreshHistory();
}

// Function to clear all history from localStorage
function clearAllHistory() {
    // Set the history in localStorage to an empty array
    localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
    
    // Refresh the history UI to reflect the cleared history
    refreshHistory();
}

// Add event listeners for number buttons
document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
        if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerHTML.trim();
    });
});

// Add event listeners for operation buttons
document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const operation = e.target.innerHTML;
        
        if (operation === "=") {
            try {
                const expression = inputValue.innerText;
                const result = new Function('return ' + expression)();
                inputValue.innerText = result;

                // Save the expression and result to localStorage
                const history = JSON.parse(localStorage.getItem(STORAGE_NAME));
                history.push({ expression, result });
                localStorage.setItem(STORAGE_NAME, JSON.stringify(history));

                // Refresh the history display
                refreshHistory();
            } catch (error) {
                inputValue.innerText = "NaN"; // Handle invalid expression
            }
        } else if (operation === "AC") {
            inputValue.innerText = "0";
        } else if (operation === "DEL") {
            inputValue.innerText = inputValue.innerText.slice(0, -1) || "0";
        } else {
            inputValue.innerText += operation;
        }
    });
});

// Add event listener for the Clear History button
document.getElementById('clear-history').addEventListener('click', function() {
    clearAllHistory();
});

// Initial call to display the history when the page loads
refreshHistory();
