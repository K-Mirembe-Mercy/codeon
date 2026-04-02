import React, { useState } from 'react';
import MasteryApp from './MasteryApp';
import { PYTHON_LESSONS } from './pythonData';
import { JS_LESSONS } from './javascriptData';
import { LESSONS as C_LESSONS } from './data';
// Import other course data...

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [
    { id: 'python', title: 'Python Software', subtitle: 'Modern Software Engineering', data: PYTHON_LESSONS, lang: 'Python' },
    { id: 'javascript', title: 'JavaScript Web', subtitle: 'Interactive Web Development', data: JS_LESSONS, lang: 'JavaScript' },
    { id: 'c', title: 'C Systems', subtitle: 'Low-Level Engineering', data: C_LESSONS, lang: 'C' },
    // Add HTML, CSS, AI, Internet here...
  ];

  if (selectedCourse) {
    const course = courses.find(c => c.id === selectedCourse)!;
    return (
      <MasteryApp 
        lessons={course.data} 
        courseTitle={course.title} 
        courseSubtitle={course.subtitle} 
        courseId={course.id} 
        language={course.lang} 
      />
    );
  }

  return (
    <div className="min-h-screen p-12 flex flex-col items-center justify-center gap-12">
      <h1 className="text-5xl font-black text-gold tracking-tighter">CODEON AFRICA MASTERY</h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        {courses.map(course => (
          <button 
            key={course.id}
            onClick={() => setSelectedCourse(course.id)}
            className="glass-3d p-8 hover:scale-105 transition-all text-left group"
          >
            <h2 className="text-2xl font-bold text-white group-hover:text-gold transition-colors">{course.title}</h2>
            <p className="text-slate-400 text-sm mt-2">{course.subtitle}</p>
            <div className="mt-6 flex items-center text-teal-light font-bold text-xs uppercase tracking-widest">
              Start Mastery →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
