
/**
 * Fetch data from the API.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {string} [method='GET'] - The HTTP method to use for the request.
 * @param {Object|null} [body=null] - The request body to send, if applicable.
 * @returns {Promise<Object>} The response data as a JavaScript object.
 * @throws {Error} If the response status is not ok.
 */
async function request(endpoint, method = 'GET', body = null) {
	const baseUrl = 'api/';
  const requestOptions = {
    method,
    headers: {},
  };

	const token = localStorage.getItem('login-token');

  if (token) {
    requestOptions.headers.Authorization = `Bearer ${token}`;
  }

  if (body && typeof body === 'object') {
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, requestOptions);

  return { status: response.status, ok: response.ok, body: await response.json() };
}

export default request;