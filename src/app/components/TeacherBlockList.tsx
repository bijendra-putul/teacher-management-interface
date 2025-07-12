'use client';
import { TeacherBlock } from '../interface/teacherBlock';

interface TeacherBlockListProps {
  teachers: TeacherBlock[];
  onSelectTeacher: (id: string) => void;
}

function TeacherBlockList({ teachers, onSelectTeacher }: TeacherBlockListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {teachers.map((teacher) => (
        <div
          key={teacher.id}
          className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectTeacher(teacher.id)}
          role="button"
          tabIndex={0}
          aria-label={`Select teacher ${teacher.name}`}
          onKeyDown={(e) => e.key === 'Enter' && onSelectTeacher(teacher.id)}
        >
          <h3 className="text-lg font-semibold">{teacher.name}</h3>
          <p className="text-sm text-gray-600">Subject: {teacher.subject}</p>
          <p className={`text-sm ${
              teacher.paymentStatus === 'paid'
                ? 'text-green-600'
                : teacher.paymentStatus === 'pending'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
          >
            Status: {teacher.paymentStatus}
          </p>
          <p className="text-sm">Amount: ₹{teacher.amount}</p>
        </div>
      ))}
    </div>
  )
}

export default TeacherBlockList;