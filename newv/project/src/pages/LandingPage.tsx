import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronRight, Layers, Shield, Zap } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero section */}
      <div className="relative overflow-hidden pt-8 sm:pt-16 lg:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Manage your tasks <span className="text-blue-600">efficiently</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600">
                The simplest way to keep track of your projects and tasks. Stay organized, focused, and meet your deadlines with TaskTracker.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="ml-4 rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full overflow-hidden rounded-lg bg-slate-200 p-2">
                  <div className="p-8 bg-white rounded-md">
                    <div className="space-y-6">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex">
                          <div className="flex-shrink-0">
                            <div className={`h-8 w-8 rounded-full ${
                              item === 1 ? 'bg-blue-100' : item === 2 ? 'bg-amber-100' : 'bg-green-100'
                            } flex items-center justify-center`}>
                              <CheckCircle className={`h-4 w-4 ${
                                item === 1 ? 'text-blue-600' : item === 2 ? 'text-amber-600' : 'text-green-600'
                              }`} />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-slate-900">Task {item}</h3>
                            <p className="mt-1 text-xs text-slate-500">Sample task description goes here</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mt-16 lg:mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to stay on track
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Streamline your workflow and boost productivity with our intuitive task management system.
            </p>
          </div>
          <div className="mt-12 space-y-10 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
            {[
              {
                icon: <Zap className="h-6 w-6 text-blue-600" />,
                title: 'Simple & Fast',
                description: 'Get started quickly with our intuitive interface - no complex setup required.'
              },
              {
                icon: <Layers className="h-6 w-6 text-blue-600" />,
                title: 'Organize Projects',
                description: 'Create up to 4 projects and organize your tasks in a way that works for you.'
              },
              {
                icon: <Shield className="h-6 w-6 text-blue-600" />,
                title: 'Secure',
                description: 'Your data is always safe and secure with our robust security measures.'
              }
            ].map((feature, index) => (
              <div key={index} className="relative">
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-50">
                  {feature.icon}
                </div>
                <p className="ml-16 text-lg font-medium text-slate-900">{feature.title}</p>
                <p className="mt-2 ml-16 text-base text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="mt-24 bg-blue-50">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-600">Start using TaskTracker today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
              >
                Get started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-center text-sm text-slate-500">
              &copy; {new Date().getFullYear()} TaskTracker, Inc. All rights reserved.
            </p>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <Link to="/" className="flex items-center justify-center md:justify-start">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-900">TaskTracker</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;