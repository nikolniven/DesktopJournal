import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import authService from '../../services/auth.service';
import { useToast } from '../../hooks/useToast';

function UserPage() {
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser, user } = useContext(AuthContext);
  const { onSuccess, onError } = useToast();

  console.log(user);
  const handlePreviousPassword = (e) => setPreviousPassword(e.target.value);
  const handleNewPassword = (e) => setNewPassword(e.target.value);
  const handleconfirmNewPassword = (e) => setConfirmNewPassword(e.target.value);

  const handleChangePswSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmNewPassword || !previousPassword) {
      onError('All input fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      onError('Passwords dont match');
      return;
    }

    authService
      .changepassword({
        previousPassword,
        newPassword,
      })
      .then((response) => {
        storeToken(response.data.authToken);
        onSuccess('Password has been changed successfully');
        authenticateUser();
        //   navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        onError(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center dark:bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* User Profile Card */}
        <div className="mb-8 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="rounded-full w-full h-full object-cover border-4 border-indigo-100"
              />
            ) : (
              <div className="rounded-full w-full h-full bg-indigo-100 flex items-center justify-center">
                <span className="text-2xl text-indigo-500">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {user?.name || 'User'}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
          <div className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full inline-block text-sm">
            Active Account
          </div>
        </div>

        <div className="border-t border-gray-200 mb-6"></div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Change your password
        </h1>

        <form onSubmit={handleChangePswSubmit} className="space-y-4">
          {/* Email should smth happen here if user is already logged in???*/}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={previousPassword}
              onChange={handlePreviousPassword}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password:
            </label>
            <input
              type="password"
              name="password"
              id="new-password"
              value={newPassword}
              onChange={handleNewPassword}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
            />
          </div>
          <div>
            <label
              htmlFor="repeat-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password:
            </label>
            <input
              type="password"
              name="password"
              id="repeat-password"
              value={confirmNewPassword}
              onChange={handleconfirmNewPassword}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
            />
          </div>

          {/* Error message */}
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Change Password
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {/* Already have an account?{' '} */}
          {/* <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
            Login
          </Link> */}
        </p>
      </div>
    </div>
  );
}

export default UserPage;
