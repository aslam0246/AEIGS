import { FaGraduationCap, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useState } from 'react';

export default function LearningHub() {
  const [savedCourses, setSavedCourses] = useState<number[]>([]);

  const courses = [
    {
      id: 1,
      title: 'Effective Time Management',
      provider: 'LinkedIn Learning',
      duration: '1h 30m',
      level: 'Intermediate',
    },
    {
      id: 2,
      title: 'Mindfulness at Work',
      provider: 'Microsoft Viva Learning',
      duration: '45m',
      level: 'Beginner',
    },
  ];

  const toggleSave = (id: number) => {
    setSavedCourses(prev => 
      prev.includes(id) 
        ? prev.filter(courseId => courseId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaGraduationCap className="mr-2 text-primary" />
        Learning Recommendations
      </h2>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{course.title}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <span className="bg-primary-light/20 text-primary px-2 py-1 rounded">
                    {course.provider}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{course.duration}</span>
                  <span className="mx-2">•</span>
                  <span>{course.level}</span>
                </div>
              </div>
              <button 
                onClick={() => toggleSave(course.id)}
                className="text-gray-400 hover:text-primary"
              >
                {savedCourses.includes(course.id) ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}