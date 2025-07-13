import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Brain,
  Clock,
  Newspaper
} from 'lucide-react';

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">
          Hello, Sarah! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your team's well-being and productivity today.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Well-being Status */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-5 w-5 text-purple-500" />
              <h3 className="ml-2 font-medium text-gray-800">Well-being Status</h3>
            </div>
            <span className="text-green-500 text-sm font-medium">↑ 12%</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Team Health</span>
              <span className="text-sm font-medium text-gray-800">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Team Members</h4>
            <div className="flex flex-wrap gap-2">
              {['John D.', 'Emma S.', 'Michael R.', 'Lisa K.', 'David W.'].map((name, index) => (
                <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Productivity Trends */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <h3 className="ml-2 font-medium text-gray-800">Productivity</h3>
            </div>
            <span className="text-green-500 text-sm font-medium">↑ 8%</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Task Completion</span>
              <span className="text-sm font-medium text-gray-800">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Completed Tasks</h4>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <span className="text-green-500">✓</span> UI Design Review
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-500">✓</span> API Integration
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-500">✓</span> Security Audit
              </div>
            </div>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="ml-2 font-medium text-gray-800">Active Tasks</h3>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">In Progress</span>
              <span className="text-sm font-medium text-blue-500">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed Today</span>
              <span className="text-sm font-medium text-green-500">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending Review</span>
              <span className="text-sm font-medium text-orange-500">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Insights */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-medium text-gray-800 mb-4">Team Insights</h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <p className="ml-3 text-sm text-gray-600">
              3 team members showing signs of increased stress levels
            </p>
          </div>
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <Users className="h-5 w-5 text-green-500" />
            <p className="ml-3 text-sm text-gray-600">
              Team collaboration score improved by 15% this week
            </p>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-500" />
            <p className="ml-3 text-sm text-gray-600">
              Average task completion time reduced by 20%
            </p>
          </div>
        </div>
      </div>

      {/* Company Updates and News */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Newspaper className="h-5 w-5 text-indigo-500" />
          <h3 className="ml-2 font-medium text-gray-800">Company Updates & News</h3>
        </div>
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="text-sm font-medium text-gray-800">New Project Launch: Digital Transformation Initiative</h4>
            <p className="text-sm text-gray-600 mt-1">Starting next week, our team will lead the company-wide digital transformation project.</p>
            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="text-sm font-medium text-gray-800">Team Achievement: Q1 Goals Exceeded</h4>
            <p className="text-sm text-gray-600 mt-1">Congratulations to the team for exceeding all Q1 targets by an average of 15%.</p>
            <p className="text-xs text-gray-500 mt-1">1 day ago</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="text-sm font-medium text-gray-800">Upcoming: Team Building Event</h4>
            <p className="text-sm text-gray-600 mt-1">Mark your calendars for the annual team building retreat next month.</p>
            <p className="text-xs text-gray-500 mt-1">2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;