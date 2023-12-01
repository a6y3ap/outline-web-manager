const jsf = document.getElementById('json-form');
const uf = document.getElementById('url-form');

if (jsf) {
	if (localStorage.getItem('jsonText')) {
		// If it exists, retrieve the value and directly run the code
		var jsonText = localStorage.getItem('jsonText');
		fetch_output(jsonText);
	} else {
	
		jsf.addEventListener('submit', function(event) {
			event.preventDefault();
			const jsonText = document.getElementById('json-text').value;
			localStorage.setItem('jsonText', jsonText);

			fetch_output(jsonText)
		});	
	}
}

function fetch_output(jsonText) {
	
		try {
			const jsonData = JSON.parse(jsonText);
			const apiUrl = jsonData.apiUrl + '/access-keys/';

			if (apiUrl) {
				// Fetch the JSON data from the extracted URL
				fetch(apiUrl)
					.then(response => response.json())
					.then(data => {
						const accessKeys = data.accessKeys;
						const container = document.getElementById('json-display');
						container.innerHTML = ''; // Clear previous data
								
						// sending a post request to /access-keys/ generates a new key
						const itemDiv = document.createElement('div');
						itemDiv.innerHTML = `<button type="button" onclick="createAccessKey('${apiUrl}')">Add New Key</button>`;
						itemDiv.classList.add('addKey');
						container.appendChild(itemDiv);

						// Loop through the accessKeys and display the items
						accessKeys.forEach(accessKey => {
							const itemDiv = document.createElement('div');
							itemDiv.innerHTML = `<p>ID: ${accessKey.id}</p>
												 <p>Password: ${accessKey.password}</p>
												 <p>Port: ${accessKey.port}</p>
												 <p>Method: ${accessKey.method}</p>
												 <p>AccessUrl: <span>${accessKey.accessUrl}</span> <button onclick="copyToClipboard('${accessKey.accessUrl}')">Copy</button></p>`;
							container.appendChild(itemDiv);
						});
					})
					.catch(error => {
						const container = document.getElementById('json-display');
						container.innerHTML = `<p>Error fetching JSON data. The issue may be related to SSL. Click <a href="${apiUrl}" target="_blank">here</a> to allow unsafe connection and click on submit again.</p>`;
						console.error('Error fetching JSON:', error);
					});
			} else {
				const container = document.getElementById('json-display');
				container.innerHTML = '<p>No apiUrl found in the JSON data</p>';
			}
		} catch (error) {
			const container = document.getElementById('json-display');
			container.innerHTML = '<p>Invalid JSON format</p>';
			console.error('Error parsing JSON:', error);
		}
}

if (uf) {
	if (localStorage.getItem('jsonUrl')) {
		// If it exists, retrieve the value and directly run the code
		var jsonUrl = localStorage.getItem('jsonUrl');
		fetch_data(jsonUrl);
	} else {
	
		uf.addEventListener('submit', function(event) {
			event.preventDefault();
			const jsonUrl = document.getElementById('json-url').value + '/access-keys/';
			localStorage.setItem('jsonUrl', jsonUrl);

			fetch_data(jsonUrl)
		});	
	}
}

function fetch_data(jsonUrl) {
	// Fetch the JSON data from the input URL
		fetch(jsonUrl)
			.then(response => response.json())
			.then(data => { 
				const accessKeys = data.accessKeys;
				const container = document.getElementById('json-display');
				container.innerHTML = ''; // Clear previous data
								
				// sending a post request to /access-keys/ generates a new key
				const itemDiv = document.createElement('div');
				itemDiv.innerHTML = `<button type="button" onclick="createAccessKey('${jsonUrl}')">Add New Key</button>`;
				itemDiv.classList.add('addKey');
				container.appendChild(itemDiv);

				// Loop through the accessKeys and display the items
				accessKeys.forEach(accessKey => {
					const itemDiv = document.createElement('div');
					itemDiv.innerHTML = `<p>ID: ${accessKey.id}</p>
										 <p>Password: ${accessKey.password}</p>
										 <p>Port: ${accessKey.port}</p>
										 <p>Method: ${accessKey.method}</p>
										 <p>AccessUrl: <span>${accessKey.accessUrl}</span> <button onclick="copyToClipboard('${accessKey.accessUrl}')">Copy</button></p>`;
					container.appendChild(itemDiv);
				});
			})
			.catch(error => {
				const container = document.getElementById('json-display');
				container.innerHTML = `<p>Error fetching JSON data. The issue may be related to SSL. Click <a href="${jsonUrl}">here</a> to allow unsafe connection and click on submit again..</p>`;
				console.error('Error fetching JSON:', error);
			});
}

// Function to copy the accessUrl to the clipboard
function copyToClipboard(text) {
	const el = document.createElement('textarea');
	el.value = text;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	alert('Copied the text: ' + text);
}

function handleResponse(response) {
  if (!response.ok) {
	throw new Error('Network response was not ok');
  }
  return response.json();
}

function createAccessKey(addK) {
	const container = document.getElementById('json-display');
	var firstChild = container.firstChild;
	var errorDiv = document.createElement('div');
	errorDiv.textContent = 'Error while creating a key';
	
	fetch(addK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, mode: 'cors' })
		.then(handleResponse)
		.then(data => window.location.reload())
		.catch(error => container.insertBefore(errorDiv, firstChild.nextSibling));
}

// Function to add new access key
function addKey() {
	
	// Access the form element
	var form = document.getElementById('addKey');

	// Submit the form
	form.submit();

	// Refresh the page after the form is submitted
	window.location.reload();
}

// Function to add new access key
function goHome() {
	// Go to Home Page
	window.location.href = 'index.html';
}