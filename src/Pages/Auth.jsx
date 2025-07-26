import React from 'react'
import { Link } from 'react-router-dom';

export default function Auth() {
  const [formData, setFormData] = React.useState({
                email: '',
                password: ''
            });
            const [errors, setErrors] = React.useState({});

            const validateForm = () => {
                const newErrors = {};
                if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
                if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
                return newErrors;
            };

            const handleSubmit = (e) => {
                e.preventDefault();
                const validationErrors = validateForm();
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    return;
                }
                console.log('Login submitted:', formData);
                alert('Login successful!');
            };

            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
                if (errors[name]) {
                    setErrors(prev => ({ ...prev, [name]: '' }));
                }
            };

            return (
                <div className="container mx-auto px-4 py-8 max-w-md mb-20">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="********"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                            </div>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Sign In
                            </button>
                            <p className="text-center text-sm text-gray-600">
                                Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
  )
}
