"use client";
import React, { useState, useEffect } from "react";

const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState({
        name: '',
        content: ''
    });

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("https://portfolio-u292.onrender.com/testimonials");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setTestimonials(data.testimonials);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch('https://portfolio-u292.onrender.com/hi', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error checking login status:", error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleSubmitTestimonial = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://portfolio-u292.onrender.com/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newTestimonial.content,
                    name: newTestimonial.name
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setTestimonials(prev => [...prev, data]);
                setNewTestimonial({ name: '', content: '' });
            }
        } catch (error) {
            console.error("Error submitting testimonial:", error);
        }
    };

    const deleteTestimonial = async (testimonialId) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(
                `https://portfolio-u292.onrender.com/testimonials/${testimonialId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setTestimonials((prev) =>
                    prev.filter((testimonial) => testimonial.testimonialId !== testimonialId)
                );
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        }
    };

    // Show testimonials based on login status
    const filteredTestimonials = isLoggedIn
        ? testimonials 
        : testimonials.filter(t => t.isVerified);

    const verifyTestimonial = async (testimonialId) => {
        try {
            const token = sessionStorage.getItem('token');
            // Find the current testimonial data
            const currentTestimonial = testimonials.find(t => t.testimonialId === testimonialId);

            const updatedData = {
                ...currentTestimonial,
                isVerified: true
            };

            const response = await fetch(
                `https://portfolio-u292.onrender.com/testimonials/${testimonialId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (response.ok) {
                const updatedTestimonial = await response.json();
                setTestimonials((prev) =>
                    prev.map((testimonial) =>
                        testimonial.testimonialId === testimonialId
                            ? updatedTestimonial
                            : testimonial
                    )
                );
            }
        } catch (error) {
            console.error("Error verifying testimonial:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section id="testimonials" className="py-12 px-4 mb-6">
            <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mt-4 mb-8">
                Testimonials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-12">
                {filteredTestimonials.map((testimonial) => (
                    <div
                        key={testimonial.testimonialId}
                        className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 hover:scale-105 transition-transform duration-300 ease-in-out relative"
                    >
                        <p className="text-gray-900 dark:text-white font-semibold">
                            {testimonial.name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            {new Date(testimonial.date).toLocaleDateString()}
                        </p>

                        {isLoggedIn && (
                            <div className="absolute top-2 right-2 flex gap-2">
                                {!testimonial.isVerified && (
                                    <button
                                        onClick={() => verifyTestimonial(testimonial.testimonialId)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Approve
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteTestimonial(testimonial.testimonialId)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        )}

                        {isLoggedIn && !testimonial.isVerified && (
                            <div className="absolute bottom-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                                Pending Approval
                            </div>
                        )}

                        {isLoggedIn && testimonial.isVerified && (
                            <div className="absolute bottom-2 right-2 text-green-500">
                                ✔️ Verified
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmitTestimonial} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={newTestimonial.name}
                            onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                     dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 dark:text-gray-300 mb-2">
                            Testimonial
                        </label>
                        <textarea
                            id="content"
                            value={newTestimonial.content}
                            onChange={(e) => setNewTestimonial(prev => ({ ...prev, content: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                     dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Submit Testimonial
                    </button>
                </form>
            </div>
        </section>
    );
};

export default TestimonialSection;