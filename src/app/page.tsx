'use client';
import { useState } from 'react';
import PaymentBlockForm from '../app/components/PaymentBlockForm';
import TeacherBlockList from '../app/components/TeacherBlockList';
import { TeacherBlock, PaymentBlockData } from '../app/interface/teacherBlock';
 function Home() {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const teachers: TeacherBlock[] = [
    { id: '1', name: 'Bijendra Kumar Singh', subject: 'Computer', paymentStatus: 'pending', amount: 4000 },
    { id: '2', name: 'Dharmendar Kumar Singh', subject: 'Hindi', paymentStatus: 'paid', amount: 6000 },
    { id: '3', name: 'Hemant Kumar', subject: 'English', paymentStatus: 'failed', amount: 4500 },
  ];

  const handlePaymentSubmit = async (data: PaymentBlockData) => {
    console.log('Payment data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Teacher Management Interface</h1>
      <TeacherBlockList teachers={teachers} onSelectTeacher={setSelectedTeacher} />
      {selectedTeacher && (
        <div className="mt-6">
          <PaymentBlockForm teacherId={selectedTeacher} onSubmit={handlePaymentSubmit} />
        </div>
      )}
    </main>
  );
}

export default Home;