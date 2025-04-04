import React from 'react';
import ReactDOM from 'react-dom';

function AdminLogin() {
  return (
    <div>
      <h2>Admin Login</h2>
      <form>
        <div>
          <label htmlFor="userid">User ID:</label>
          <input type="text" id="userid" name="userid" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

ReactDOM.render(<AdminLogin />, document.getElementById('admin-root'));
